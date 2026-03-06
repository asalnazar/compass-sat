import { useProgress } from "@/contexts/ProgressContext";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Target } from "lucide-react";

export default function ProgressPage() {
  const { scores, totalCompleted, overallPercentage, weakAreas } = useProgress();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-serif font-bold">Your Progress</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
          <p className="text-2xl font-serif font-bold">{totalCompleted}</p>
          <p className="text-xs text-muted-foreground">Topics Done</p>
        </Card>
        <Card className="p-4 text-center">
          <CheckCircle className="h-6 w-6 mx-auto mb-2 text-success" />
          <p className="text-2xl font-serif font-bold">{overallPercentage}%</p>
          <p className="text-xs text-muted-foreground">Accuracy</p>
        </Card>
        <Card className="p-4 text-center">
          <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-warning" />
          <p className="text-2xl font-serif font-bold">{weakAreas.length}</p>
          <p className="text-xs text-muted-foreground">Weak Areas</p>
        </Card>
      </div>

      {scores.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          <p>No practice yet! Start a topic to see your progress here.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          <h2 className="font-serif font-bold">Topic Scores</h2>
          {scores.map((s, i) => {
            const pct = Math.round((s.correctAnswers / s.questionsAnswered) * 100);
            const isWeak = pct < 60;
            return (
              <motion.div key={s.unitId} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Card className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm capitalize">{s.unitId.replace(/-/g, " ")}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={isWeak ? "destructive" : "secondary"}>{s.correctAnswers}/{s.questionsAnswered}</Badge>
                      {isWeak && <span className="text-xs text-destructive">Review recommended</span>}
                    </div>
                  </div>
                  <Progress value={pct} className="h-2" />
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
