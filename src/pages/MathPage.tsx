import { useState } from "react";
import { mathUnits } from "@/data/mathQuestions";
import { useProgress } from "@/contexts/ProgressContext";
import QuizView from "@/components/QuizView";
import ConfirmStart from "@/components/ConfirmStart";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function MathPage() {
  const [activeUnit, setActiveUnit] = useState<string | null>(null);
  const { getScore } = useProgress();

  const unit = mathUnits.find((u) => u.id === activeUnit);
  if (unit) {
    return <QuizView unitId={unit.id} unitTitle={unit.title} questions={unit.questions} section="math" tip={unit.tip} onBack={() => setActiveUnit(null)} />;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="font-serif text-3xl">SAT Math</h1>
        <p className="text-sm text-muted-foreground mt-1">{mathUnits.length} units · 10 questions each · all free</p>
      </div>

      <div className="space-y-2">
        {mathUnits.map((u, i) => {
          const score = getScore(u.id);
          const pct = score && score.questionsAnswered ? Math.round((score.correctAnswers / score.questionsAnswered) * 100) : 0;
          const inProgress = !!score && !score.completed && score.questionsAnswered > 0;
          return (
            <motion.div key={u.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <ConfirmStart
                title={`Start ${u.title}?`}
                description={inProgress
                  ? "You have a session in progress for this topic — we'll pick up right where you left off."
                  : "10 questions. You can pause anytime — your progress is saved automatically."}
                confirmLabel={inProgress ? "Resume" : "Start practice"}
                onConfirm={() => setActiveUnit(u.id)}
                trigger={
                  <button
                    className="w-full text-left bg-card border border-border rounded-2xl p-4 flex items-center gap-4 transition-all hover:border-primary/40 hover:shadow-sm cursor-pointer"
                  >
                    <span className="text-2xl">{u.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm">{u.title}</h3>
                      {score?.completed ? (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{pct}%</span>
                        </div>
                      ) : inProgress ? (
                        <p className="text-xs text-primary mt-0.5">In progress — resume</p>
                      ) : (
                        <p className="text-xs text-muted-foreground mt-0.5">10 questions</p>
                      )}
                    </div>
                    {score?.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : (
                      <span className="text-xs text-primary font-medium">{inProgress ? "Resume →" : "Start →"}</span>
                    )}
                  </button>
                }
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

