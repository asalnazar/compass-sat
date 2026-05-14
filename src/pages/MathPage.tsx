import { useState } from "react";
import { mathUnits } from "@/data/mathQuestions";
import { useProgress } from "@/contexts/ProgressContext";
import QuizView from "@/components/QuizView";
import PaywallBanner from "@/components/PaywallBanner";
import { motion } from "framer-motion";
import { Lock, CheckCircle2 } from "lucide-react";

export default function MathPage() {
  const [activeUnit, setActiveUnit] = useState<string | null>(null);
  const { getScore, isUnlocked } = useProgress();

  const unit = mathUnits.find((u) => u.id === activeUnit);
  if (unit) {
    return <QuizView unitId={unit.id} unitTitle={unit.title} questions={unit.questions} section="math" tip={unit.tip} onBack={() => setActiveUnit(null)} />;
  }

  const lockedCount = mathUnits.filter((u) => !isUnlocked(u.id)).length;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="font-serif text-3xl">SAT Math</h1>
        <p className="text-sm text-muted-foreground mt-1">{mathUnits.length} units · 10 questions each</p>
      </div>

      <div className="space-y-2">
        {mathUnits.map((u, i) => {
          const score = getScore(u.id);
          const unlocked = isUnlocked(u.id);
          const pct = score && score.questionsAnswered ? Math.round((score.correctAnswers / score.questionsAnswered) * 100) : 0;
          return (
            <motion.div key={u.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <button
                disabled={!unlocked}
                onClick={() => unlocked && setActiveUnit(u.id)}
                className={`w-full text-left bg-card border border-border rounded-2xl p-4 flex items-center gap-4 transition-all ${
                  unlocked ? "hover:border-primary/40 hover:shadow-sm cursor-pointer" : "opacity-70 cursor-not-allowed"
                }`}
              >
                <span className="text-2xl">{u.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm">{u.title}</h3>
                  {unlocked && score?.completed ? (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{pct}%</span>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground mt-0.5">10 questions</p>
                  )}
                </div>
                {!unlocked ? (
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Lock className="h-3.5 w-3.5" /> Locked
                  </span>
                ) : score?.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : (
                  <span className="text-xs text-primary font-medium">Start →</span>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      {lockedCount > 0 && <PaywallBanner title={`Unlock all ${mathUnits.length + 6} topics · $29/mo`} />}
    </div>
  );
}
