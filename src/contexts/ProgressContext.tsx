import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

const STORAGE_KEY = "nextstep-progress";

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [scores, setScores] = useState<TopicScore[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  }, [scores]);

  const getScore = (unitId: string) => scores.find((s) => s.unitId === unitId);

  const saveScore = (score: TopicScore) => {
    setScores((prev) => {
      const idx = prev.findIndex((s) => s.unitId === score.unitId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = score;
        return next;
      }
      return [...prev, score];
    });
  };

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
