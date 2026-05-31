import { Award, Check, Shield } from "lucide-react";
import { motion } from "framer-motion";

const includedFeatures = [
  "All 15 topics in Math and English",
  "AI explanations on every question",
  "Live predicted SAT score",
  "All 5 full practice tests",
  "Personalized practice based on your weak areas",
  "Progress tracking, streaks, and history",
];

export default function PremiumPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Award className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-serif text-2xl md:text-3xl leading-tight">
              NextStep is now <span className="text-primary">100% free</span>.
            </h1>
            <p className="text-sm text-muted-foreground mt-3">
              Every topic, every practice test, every AI explanation — unlocked
              for every student. No subscription, no trial, no credit card.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <p className="text-sm font-medium">What you get</p>
        <ul className="space-y-2">
          {includedFeatures.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /> {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 flex items-start gap-3">
        <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div>
          <h3 className="font-serif text-base">Your data stays yours</h3>
          <p className="text-sm text-muted-foreground mt-1">
            We only store your email, practice answers, and progress — used solely
            to power your dashboard. We never sell or share your personal info,
            and you can delete your account at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
