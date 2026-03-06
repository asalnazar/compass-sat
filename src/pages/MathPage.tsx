import { useState } from "react";
import { mathUnits } from "@/data/mathQuestions";
import { useProgress } from "@/contexts/ProgressContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import QuizView from "@/components/QuizView";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function MathPage() {
  const [activeUnit, setActiveUnit] = useState<string | null>(null);
  const { getScore } = useProgress();

  const unit = mathUnits.find((u) => u.id === activeUnit);
  if (unit) {
    return <QuizView unitId={unit.id} unitTitle={unit.title} questions={unit.questions} section="math" tip={unit.tip} onBack={() => setActiveUnit(null)} />;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold">SAT Math</h1>
        <p className="text-sm text-muted-foreground">9 units • 10 questions each</p>
      </div>
      <div className="grid gap-3">
        {mathUnits.map((u, i) => {
          const score = getScore(u.id);
          return (
            <motion.div key={u.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveUnit(u.id)}>
                <span className="text-2xl">{u.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm">{u.title}</h3>
                  <p className="text-xs text-muted-foreground">10 questions</p>
                </div>
                {score?.completed ? (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">{score.correctAnswers}/10</Badge>
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                ) : (
                  <Badge variant="outline" className="text-xs">Start</Badge>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
