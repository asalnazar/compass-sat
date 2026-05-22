import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { mathUnits } from "@/data/mathQuestions";
import { englishCategories } from "@/data/englishQuestions";

export interface TopicScore {
  unitId: string;
  section: "math" | "english";
  questionsAnswered: number;
  correctAnswers: number;
  completed: boolean;
}

export interface SessionDay {
  date: string; // YYYY-MM-DD
  questions: number;
  correct: number;
}

interface ProgressState {
  scores: TopicScore[];
  getScore: (unitId: string) => TopicScore | undefined;
  saveScore: (score: TopicScore) => void;
  totalCompleted: number;
  totalQuestions: number;
  overallPercentage: number;
  weakAreas: { unitId: string; title: string; section: "math" | "english"; pct: number }[];
  predictedScore: number;
  goalScore: number;
  currentStreak: number;
  sessions: SessionDay[];
  allUnitIds: { id: string; title: string; section: "math" | "english"; icon: string }[];
  unlockedUnitIds: string[];
  isUnlocked: (unitId: string) => boolean;
  isPro: boolean;
}

const ProgressContext = createContext<ProgressState | undefined>(undefined);

const FREE_UNIT_LIMIT = 4;

function buildAllUnits() {
  const list: { id: string; title: string; section: "math" | "english"; icon: string }[] = [];
  mathUnits.forEach((u) => list.push({ id: u.id, title: u.title, section: "math", icon: u.icon }));
  englishCategories.forEach((cat) =>
    cat.units.forEach((u) => list.push({ id: u.id, title: u.title, section: "english", icon: u.icon }))
  );
  return list;
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [scores, setScores] = useState<TopicScore[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [sessions, setSessions] = useState<SessionDay[]>([]);
  const { user, subscription } = useAuth();

  const allUnitIds = buildAllUnits();
  const isPro = subscription.subscribed;
  const unlockedUnitIds = isPro
    ? allUnitIds.map((u) => u.id)
    : allUnitIds.slice(0, FREE_UNIT_LIMIT).map((u) => u.id);
  const isUnlocked = (unitId: string) => unlockedUnitIds.includes(unitId);

  useEffect(() => {
    if (!user) {
      setScores([]);
      setSessions([]);
      setCurrentStreak(0);
      return;
    }
    const load = async () => {
      const [{ data: prog }, { data: sess }, { data: profile }] = await Promise.all([
        supabase.from("user_progress").select("*").eq("user_id", user.id),
        supabase.from("practice_sessions").select("session_date, questions_answered, correct_answers").eq("user_id", user.id).order("session_date", { ascending: false }).limit(120),
        supabase.from("profiles").select("current_streak").eq("user_id", user.id).maybeSingle(),
      ]);
      if (prog) {
        setScores(prog.map((d) => ({
          unitId: d.unit_id,
          section: d.section as "math" | "english",
          questionsAnswered: d.questions_answered,
          correctAnswers: d.correct_answers,
          completed: d.completed,
        })));
      }
      if (sess) {
        const map = new Map<string, SessionDay>();
        sess.forEach((s) => {
          const prev = map.get(s.session_date) || { date: s.session_date, questions: 0, correct: 0 };
          prev.questions += s.questions_answered;
          prev.correct += s.correct_answers;
          map.set(s.session_date, prev);
        });
        setSessions(Array.from(map.values()));
      }
      if (profile) setCurrentStreak(profile.current_streak || 0);
    };
    load();
  }, [user]);

  const getScore = (unitId: string) => scores.find((s) => s.unitId === unitId);

  const saveScore = useCallback(async (score: TopicScore) => {
    setScores((prev) => {
      const idx = prev.findIndex((s) => s.unitId === score.unitId);
      if (idx >= 0) { const next = [...prev]; next[idx] = score; return next; }
      return [...prev, score];
    });

    if (!user) return;

    await supabase.from("user_progress").upsert({
      user_id: user.id,
      unit_id: score.unitId,
      section: score.section,
      questions_answered: score.questionsAnswered,
      correct_answers: score.correctAnswers,
      completed: score.completed,
    }, { onConflict: "user_id,unit_id" });

    // Log session
    const today = new Date().toISOString().slice(0, 10);
    await supabase.from("practice_sessions").insert({
      user_id: user.id,
      session_date: today,
      questions_answered: score.questionsAnswered,
      correct_answers: score.correctAnswers,
    });

    // Update streak
    const { data: profile } = await supabase
      .from("profiles").select("current_streak, longest_streak, last_active_date")
      .eq("user_id", user.id).maybeSingle();

    const last = profile?.last_active_date;
    let streak = profile?.current_streak || 0;
    let longest = profile?.longest_streak || 0;

    if (last !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      streak = last === yesterday ? streak + 1 : 1;
      if (streak > longest) longest = streak;
      await supabase.from("profiles").update({
        current_streak: streak, longest_streak: longest, last_active_date: today,
      }).eq("user_id", user.id);
      setCurrentStreak(streak);
    }

    setSessions((prev) => {
      const existing = prev.find((s) => s.date === today);
      if (existing) {
        return prev.map((s) => s.date === today
          ? { ...s, questions: s.questions + score.questionsAnswered, correct: s.correct + score.correctAnswers }
          : s);
      }
      return [{ date: today, questions: score.questionsAnswered, correct: score.correctAnswers }, ...prev];
    });
  }, [user]);

  const totalCompleted = scores.filter((s) => s.completed).length;
  const totalQuestions = scores.reduce((sum, s) => sum + s.questionsAnswered, 0);
  const totalCorrect = scores.reduce((sum, s) => sum + s.correctAnswers, 0);
  const overallPercentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  // Predicted SAT: 800 + (avg accuracy × 600)
  const completedScores = scores.filter((s) => s.completed && s.questionsAnswered > 0);
  const avgAcc = completedScores.length > 0
    ? completedScores.reduce((a, s) => a + s.correctAnswers / s.questionsAnswered, 0) / completedScores.length
    : 0;
  const predictedScore = Math.round(800 + avgAcc * 600);
  const goalScore = 1500;

  const weakAreas = scores
    .filter((s) => s.completed && s.questionsAnswered > 0 && s.correctAnswers / s.questionsAnswered < 0.7)
    .map((s) => {
      const meta = allUnitIds.find((u) => u.id === s.unitId);
      return {
        unitId: s.unitId,
        title: meta?.title || s.unitId,
        section: s.section,
        pct: Math.round((s.correctAnswers / s.questionsAnswered) * 100),
      };
    });

  return (
    <ProgressContext.Provider value={{
      scores, getScore, saveScore, totalCompleted, totalQuestions, overallPercentage, weakAreas,
      predictedScore, goalScore, currentStreak, sessions,
      allUnitIds, unlockedUnitIds, isUnlocked, isPro,
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be within ProgressProvider");
  return ctx;
};
