import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";

export default function AICoach() {
  const { weakAreas, totalCompleted, predictedScore, goalScore } = useProgress();

  let message: string;
  if (totalCompleted === 0) {
    message = `You haven't completed a topic yet, so I'm starting you on the foundations. Today, focus on Linear Equations — it's the single highest-leverage topic on the SAT Math section and shows up in 6–8 questions per test. Nail this and your predicted score jumps fast.`;
  } else if (weakAreas.length === 0) {
    message = `You're scoring above 70% on every topic you've finished — that's strong. Today, push into a new topic to widen your base. Each new unit you complete with 80%+ accuracy adds roughly 30–60 points to your predicted score.`;
  } else {
    const top = weakAreas.slice(0, 2);
    const list = top.map((w) => `${w.title} (${w.pct}%)`).join(" and ");
    message = `Your weakest area${top.length > 1 ? "s are" : " is"} ${list}. The fastest path to ${goalScore} from ${predictedScore} is fixing these — the gap between 60% and 80% accuracy here is worth about ${(goalScore - predictedScore) > 100 ? 80 : 50} points. Today: 10 targeted questions in ${top[0].title}, then review every wrong answer.`;
  }

  const targetUnit = weakAreas[0];
  const targetHref = !targetUnit ? "/math" : targetUnit.section === "math" ? "/math" : "/english";

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="font-serif text-lg leading-none">AI Coach</h3>
          <p className="text-xs text-muted-foreground mt-1">Personalized for you, updated daily</p>
        </div>
      </div>
      <p className="text-sm text-foreground/80 leading-relaxed">{message}</p>
      <Link
        to={targetHref}
        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm px-5 py-2.5 rounded-full transition-colors"
      >
        Start today's 10 questions <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
