import { Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function PaywallBanner({
  title = "Unlock all 15 topics",
  subtitle = "$29/mo · Cancel anytime",
  cta = "Start 7-day free trial",
}: { title?: string; subtitle?: string; cta?: string }) {
  return (
    <div className="rounded-2xl border-2 border-primary/60 bg-primary/5 p-5 flex items-center gap-4">
      <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
        <Lock className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-serif text-base text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <Link
        to="/premium"
        className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap"
      >
        {cta} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
