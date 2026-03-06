import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, FileText, Brain, GraduationCap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: FileText, title: "500+ Practice Questions", desc: "Expanded question bank for every topic" },
  { icon: Sparkles, title: "Full-Length Practice Tests", desc: "Timed SAT simulations with scoring" },
  { icon: Brain, title: "AI Essay Feedback", desc: "Get instant feedback on your writing" },
  { icon: GraduationCap, title: "Scholarship Finder", desc: "Discover scholarships matching your profile" },
];

export default function PremiumPage() {
  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-serif font-bold">Upgrade to Premium</h1>
        <p className="text-sm text-muted-foreground">Unlock everything you need to ace the SAT</p>
      </div>
      <div className="grid gap-4">
        {features.map((f, i) => (
          <motion.div key={f.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="p-5 flex items-center gap-4 opacity-75">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                <f.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm">{f.title}</h3>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
              <Lock className="h-4 w-4 text-muted-foreground" />
            </Card>
          </motion.div>
        ))}
      </div>
      <Button size="lg" className="w-full" disabled>
        Coming Soon — Upgrade to Premium
      </Button>
    </div>
  );
}
