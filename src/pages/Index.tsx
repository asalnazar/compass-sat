import { useProgress } from "@/contexts/ProgressContext";
import ScoreHero from "@/components/ScoreHero";
import AICoach from "@/components/AICoach";
import { Flame, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function Index() {
  const { currentStreak, weakAreas } = useProgress();

  const stats = [
    { icon: Flame, label: "Day streak", value: currentStreak, tint: "text-warning" },
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
        className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-4 text-center">
            <s.icon className={`h-5 w-5 mx-auto ${s.tint}`} />
            <p className="font-serif text-2xl mt-2 leading-none">{s.value}</p>
            <p className="text-[11px] text-muted-foreground mt-1.5 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <AICoach />
      </motion.div>

      <p className="text-[11px] text-muted-foreground text-center pt-2">
        🔒 Your practice history stays private — we never share or sell your data.
      </p>
    </div>
  );
}

