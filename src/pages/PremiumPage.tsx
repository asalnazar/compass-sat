import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, FileText, Brain, GraduationCap, Sparkles, Crown, Clock, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const weeklyFeatures = [
  { icon: FileText, title: "15 Extra Questions per Topic", desc: "Deeper practice on every Math & English unit" },
  { icon: Brain, title: "AI Essay Feedback", desc: "Get instant feedback on your writing" },
  { icon: GraduationCap, title: "Scholarship Finder", desc: "Discover scholarships matching your profile" },
];

const testFeatures = [
  { icon: Clock, title: "Timed SAT Simulation", desc: "4 modules, 88 questions, ~134 minutes" },
  { icon: BookOpen, title: "Reading & Writing + Math", desc: "Easy + Hard R&W, Medium + Hard Math" },
  { icon: Sparkles, title: "Detailed Explanations", desc: "Step-by-step solutions for every question" },
];

export default function PremiumPage() {
  return (
    <div className="max-w-lg mx-auto space-y-8">
      <div className="text-center space-y-2">
        <Crown className="h-10 w-10 mx-auto text-warning" />
        <h1 className="text-2xl font-serif font-bold">Upgrade to Premium</h1>
        <p className="text-sm text-muted-foreground">Unlock everything you need to ace the SAT</p>
      </div>

      {/* Weekly Plan */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-6 space-y-4 border-primary/30 bg-primary/5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif font-bold text-lg">Weekly Plan</h2>
              <p className="text-xs text-muted-foreground">Extra questions + premium features</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-serif font-bold text-primary">$4.99</p>
              <p className="text-xs text-muted-foreground">/week</p>
            </div>
          </div>
          <div className="space-y-3">
            {weeklyFeatures.map((f) => (
              <div key={f.title} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <f.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{f.title}</h3>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Button size="lg" className="w-full" disabled>
            Coming Soon — $4.99/week
          </Button>
        </Card>
      </motion.div>

      {/* Full Practice Tests */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif font-bold text-lg">Full Practice Tests</h2>
              <p className="text-xs text-muted-foreground">5 complete SAT simulations</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-serif font-bold">$15.99</p>
              <p className="text-xs text-muted-foreground">/test</p>
            </div>
          </div>
          <div className="space-y-3">
            {testFeatures.map((f) => (
              <div key={f.title} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <f.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{f.title}</h3>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">Test 1 — Free Preview</Badge>
          </div>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link to="/full-tests">Try Free Practice Test →</Link>
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}
