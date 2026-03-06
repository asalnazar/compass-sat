import { useState } from "react";
import { englishCategories } from "@/data/englishQuestions";
import { useProgress } from "@/contexts/ProgressContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import QuizView from "@/components/QuizView";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function EnglishPage() {
  const [activeUnit, setActiveUnit] = useState<string | null>(null);
  const { getScore } = useProgress();

  // find active unit across all categories
  for (const cat of englishCategories) {
    const unit = cat.units.find((u) => u.id === activeUnit);
    if (unit) {
      return <QuizView unitId={unit.id} unitTitle={unit.title} questions={unit.questions} section="english" tip={unit.tip} onBack={() => setActiveUnit(null)} />;
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold">SAT English</h1>
        <p className="text-sm text-muted-foreground">4 categories • Multiple units</p>
      </div>
      {englishCategories.map((cat) => (
        <div key={cat.id} className="space-y-3">
          <h2 className="font-serif font-bold text-base">{cat.title}</h2>
          <div className="grid gap-3">
            {cat.units.map((u, i) => {
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
      ))}
    </div>
  );
}
