import { useProgress } from "@/contexts/ProgressContext";

export default function ScoreHero() {
  const { predictedScore, goalScore } = useProgress();
  const pct = Math.min(100, Math.round(((predictedScore - 400) / (goalScore - 400)) * 100));
  const radius = 56;
  const circ = 2 * Math.PI * radius;
  const dash = (pct / 100) * circ;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 flex items-center gap-6">
      <div className="flex-1 min-w-0">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Your predicted SAT</p>
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
  );
}
