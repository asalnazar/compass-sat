import { useProgress } from "@/contexts/ProgressContext";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ScoreHero() {
  const { predictedScore, goalScore, scores, overallPercentage } = useProgress();
  const pct = Math.min(100, Math.round(((predictedScore - 400) / (goalScore - 400)) * 100));
  const radius = 56;
  const circ = 2 * Math.PI * radius;
  const dash = (pct / 100) * circ;
  const completed = scores.filter((s) => s.completed).length;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4">
      <div className="flex items-center gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              Your predicted SAT
            </p>
            <Tooltip>
              <TooltipTrigger asChild>
                <button aria-label="How is this calculated?" className="text-muted-foreground hover:text-foreground">
                  <Info className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="font-medium mb-1">How we predict your score</p>
                <p className="text-xs">
                  Predicted SAT = 800 + (your average accuracy across completed
                  topics × 600). Right now: {completed} topics completed,
                  {" "}{overallPercentage}% accuracy.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="font-serif text-5xl md:text-6xl text-foreground leading-none mt-2">
            {predictedScore}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Goal: <span className="font-semibold text-foreground">{goalScore}</span>
            <span className="mx-2">·</span>
            <span className="text-primary font-semibold">{Math.max(0, goalScore - predictedScore)} pts to go</span>
          </p>
        </div>
        <div className="relative w-[140px] h-[140px] shrink-0">
          <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
            <circle cx="70" cy="70" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
            <circle
              cx="70" cy="70" r={radius} fill="none"
              stroke="hsl(var(--primary))" strokeWidth="10" strokeLinecap="round"
              strokeDasharray={`${dash} ${circ}`}
              style={{ transition: "stroke-dasharray 0.6s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-serif text-2xl">{pct}%</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">to goal</span>
          </div>
        </div>
      </div>
      <p className="text-[11px] text-muted-foreground border-t border-border pt-3">
        Score formula: <span className="font-mono">800 + (avg accuracy × 600)</span>.
        Updates after every practice session.
      </p>
    </div>
  );
}
