import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { STRIPE_CONFIG } from "@/lib/stripe";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const weeklyFeatures = [
  { icon: FileText, title: "15 Extra Questions per Topic", desc: "Deeper practice on every Math & English unit" },
];

export default function PremiumPage() {
  const { user, subscription, checkSubscription } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceId: STRIPE_CONFIG.weeklyPremium.priceId },
      });
      if (error) throw error;
      if (data?.url) window.open(data.url, "_blank");
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setLoading(false);
  };

  const handleManage = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal");
      if (error) throw error;
      if (data?.url) window.open(data.url, "_blank");
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const isSubscribed = subscription.subscribed;

  return (
    <div className="max-w-lg mx-auto space-y-8">
      <div className="text-center space-y-2">
        <Crown className="h-10 w-10 mx-auto text-warning" />
        <h1 className="text-2xl font-serif font-bold">
          {isSubscribed ? "You're Premium! 🎉" : "Upgrade to Premium"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isSubscribed ? "You have full access to all premium features" : "Unlock everything you need to ace the SAT"}
        </p>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card className={`p-6 space-y-4 ${isSubscribed ? "border-success bg-success/5" : "border-primary/30 bg-primary/5"}`}>
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
          {isSubscribed ? (
            <div className="space-y-2">
              <Badge className="text-xs bg-success text-success-foreground">Active</Badge>
              {subscription.subscriptionEnd && (
                <p className="text-xs text-muted-foreground">
                  Renews {new Date(subscription.subscriptionEnd).toLocaleDateString()}
                </p>
              )}
              <Button variant="outline" size="lg" className="w-full" onClick={handleManage}>
                Manage Subscription
              </Button>
            </div>
          ) : (
            <Button size="lg" className="w-full" onClick={handleSubscribe} disabled={loading}>
              {loading ? "Loading..." : "Subscribe — $4.99/week"}
            </Button>
          )}
        </Card>
      </motion.div>

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
          <Badge variant="secondary" className="text-xs">Test 1 — Free Preview</Badge>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link to="/full-tests">Try Free Practice Test →</Link>
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}
