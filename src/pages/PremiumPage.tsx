import { Button } from "@/components/ui/button";
import { Check, Sparkles, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { STRIPE_CONFIG } from "@/lib/stripe";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const proFeatures = [
  "AI explanations on every question",
  "Personalized daily plan",
  "Live predicted SAT score",
  "All 5 full practice tests",
  "Weekly parent email reports",
  "Score guarantee — improve or your money back",
];

const freeFeatures = [
  "First 2 topics unlocked",
  "Basic question explanations",
  "Predicted score (capped)",
];

export default function PremiumPage() {
  const { user, subscription } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const isPro = subscription.subscribed;

  const handleSubscribe = async () => {
    if (!user) { navigate("/auth"); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceId: STRIPE_CONFIG.weeklyPremium.priceId },
      });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setLoading(false);
  };

  const handleManage = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal");
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Award className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-serif text-2xl md:text-3xl leading-tight">
              Students who score 1,400 vs 1,200 qualify for{" "}
              <span className="text-primary">$18,000 more</span> in scholarships per year.
            </h1>
            <p className="text-sm text-muted-foreground mt-3">
              Over 4 years, that's $72,000 — and it comes down to the topics your student is missing right now.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Free</p>
            <p className="font-serif text-3xl mt-1">$0</p>
          </div>
          <ul className="space-y-2">
            {freeFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-foreground/70">
                <Check className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" /> {f}
              </li>
            ))}
          </ul>
          <Button variant="outline" className="w-full" disabled>Current plan</Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-card border-2 border-primary rounded-2xl p-6 space-y-4 relative shadow-sm">
          <span className="absolute -top-3 left-6 bg-primary text-primary-foreground text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full">
            Most popular
          </span>
          <div className="flex items-baseline gap-2">
            <p className="font-serif text-3xl">$29</p>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
          <p className="text-sm font-medium flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-primary" /> NextStep Pro
          </p>
          <ul className="space-y-2">
            {proFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /> {f}
              </li>
            ))}
          </ul>
          {isPro ? (
            <Button onClick={handleManage} variant="outline" className="w-full">Manage subscription</Button>
          ) : (
            <Button onClick={handleSubscribe} disabled={loading} className="w-full">
              {loading ? "Loading…" : "Start 7-day free trial"}
            </Button>
          )}
          <p className="text-xs text-muted-foreground text-center">No charge today. Cancel anytime.</p>
        </motion.div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 flex items-start gap-4">
        <div>
          <h3 className="font-serif text-base">For schools & tutors</h3>
          <p className="text-sm text-muted-foreground mt-1">Unlimited student seats, classroom analytics, and bulk reporting — $299/month.</p>
        </div>
        <Button variant="outline" size="sm" className="ml-auto whitespace-nowrap">Contact sales</Button>
      </div>
    </div>
  );
}
