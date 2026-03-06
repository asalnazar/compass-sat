import { useProgress } from "@/contexts/ProgressContext";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Calculator, Zap, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const fade = (i: number) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.1 } });

export default function Index() {
  const { totalCompleted, overallPercentage, weakAreas } = useProgress();
  // total units: 9 math + ~6 english = 15
  const totalUnits = 15;
  const progressPct = Math.round((totalCompleted / totalUnits) * 100);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div {...fade(0)}>
        <h1 className="text-3xl font-serif font-bold">Welcome back! 👋</h1>
        <p className="text-muted-foreground mt-1">Let's keep your SAT prep on track.</p>
      </motion.div>

      <motion.div {...fade(1)}>
        <Card className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-2xl font-serif font-bold text-primary">{progressPct}%</span>
          </div>
          <Progress value={progressPct} className="h-3" />
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>{totalCompleted}/{totalUnits} topics completed</span>
            <span>•</span>
            <span>{overallPercentage}% accuracy</span>
          </div>
        </Card>
      </motion.div>

      <motion.div {...fade(2)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/math">
          <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer group">
            <Calculator className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-serif font-bold">SAT Math</h3>
            <p className="text-sm text-muted-foreground">9 units • Algebra to Trig</p>
          </Card>
        </Link>
        <Link to="/english">
          <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer group">
            <BookOpen className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-serif font-bold">SAT English</h3>
            <p className="text-sm text-muted-foreground">6 units • Grammar to Analysis</p>
          </Card>
        </Link>
      </motion.div>

      <motion.div {...fade(3)}>
        <Card className="p-5 bg-secondary/40 border-secondary">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-warning mt-0.5" />
            <div>
              <h3 className="font-serif font-bold text-sm">Daily Practice</h3>
              <p className="text-sm text-muted-foreground">Complete 10 questions today to stay on track.</p>
              <Button asChild size="sm" className="mt-3">
                <Link to="/math">Start Practice →</Link>
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {weakAreas.length > 0 && (
        <motion.div {...fade(4)}>
          <Card className="p-5 border-warning/30 bg-warning/5">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <h3 className="font-serif font-bold text-sm">Areas to Improve</h3>
                <p className="text-sm text-muted-foreground">
                  You scored below 60% on: {weakAreas.map(w => w.unitId.replace(/-/g, " ")).join(", ")}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
