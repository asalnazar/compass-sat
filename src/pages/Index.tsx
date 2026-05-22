import { useProgress } from "@/contexts/ProgressContext";
import ScoreHero from "@/components/ScoreHero";
import AICoach from "@/components/AICoach";
import { Flame, Target, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function Index() {
  const { currentStreak, overallPercentage, weakAreas } = useProgress();

  const stats = [
    { icon: Flame, label: "Day streak", value: currentStreak, tint: "text-warning" },
    { icon: Target, label: "Accuracy", value: `${overallPercentage}%`, tint: "text-success" },
    { icon: AlertTriangle, label: "Weak areas", value: weakAreas.length, tint: "text-primary" },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-3xl md:text-4xl">Welcome back.</h1>
        <p className="text-sm text-muted-foreground mt-1">Here's your path to a higher score.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <ScoreHero />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-4 text-center">
            <s.icon className={`h-5 w-5 mx-auto ${s.tint}`} />
            <p className="font-serif text-2xl mt-2 leading-none">{s.value}</p>
            <p className="text-[11px] text-muted-foreground mt-1.5 uppercase tracking-wider">{s.label}</p>
            {s.label === "Accuracy" && (
              <p className="text-[10px] text-muted-foreground/80 mt-1.5 italic normal-case tracking-normal">
                Just getting started — scores improve fast.
              </p>
            )}
          </div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <AICoach />
      </motion.div>
    </div>
  );
}
