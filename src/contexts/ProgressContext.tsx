import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface TopicScore {
  unitId: string;
  section: "math" | "english";
  questionsAnswered: number;
  correctAnswers: number;
  completed: boolean;
}

interface ProgressState {
  scores: TopicScore[];
  getScore: (unitId: string) => TopicScore | undefined;
  saveScore: (score: TopicScore) => void;
  totalCompleted: number;
  totalQuestions: number;
  overallPercentage: number;
  weakAreas: TopicScore[];
}

const ProgressContext = createContext<ProgressState | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [scores, setScores] = useState<TopicScore[]>([]);
  const { user } = useAuth();

  // Load from DB when user logs in
  useEffect(() => {
    if (!user) {
      setScores([]);
      return;
    }
    const load = async () => {
      const { data } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id);
      if (data) {
        setScores(data.map((d) => ({
          unitId: d.unit_id,
          section: d.section as "math" | "english",
          questionsAnswered: d.questions_answered,
          correctAnswers: d.correct_answers,
          completed: d.completed,
        })));
      }
    };
    load();
  }, [user]);

  const getScore = (unitId: string) => scores.find((s) => s.unitId === unitId);

  const saveScore = useCallback(async (score: TopicScore) => {
    setScores((prev) => {
      const idx = prev.findIndex((s) => s.unitId === score.unitId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = score;
        return next;
      }
      return [...prev, score];
    });

    if (user) {
      await supabase.from("user_progress").upsert({
        user_id: user.id,
        unit_id: score.unitId,
        section: score.section,
        questions_answered: score.questionsAnswered,
        correct_answers: score.correctAnswers,
        completed: score.completed,
      }, { onConflict: "user_id,unit_id" });
    }
  }, [user]);

  const totalCompleted = scores.filter((s) => s.completed).length;
  const totalQuestions = scores.reduce((sum, s) => sum + s.questionsAnswered, 0);
  const totalCorrect = scores.reduce((sum, s) => sum + s.correctAnswers, 0);
  const overallPercentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const weakAreas = scores.filter((s) => s.completed && s.correctAnswers / s.questionsAnswered < 0.6);

  return (
    <ProgressContext.Provider value={{ scores, getScore, saveScore, totalCompleted, totalQuestions, overallPercentage, weakAreas }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be within ProgressProvider");
  return ctx;
};
