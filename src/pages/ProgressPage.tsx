import { useProgress } from "@/contexts/ProgressContext";
import Heatmap from "@/components/Heatmap";
import PaywallBanner from "@/components/PaywallBanner";
import { Flame, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ProgressPage() {
  const { scores, currentStreak, predictedScore, sessions, isPro } = useProgress();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Build score-over-time line: cumulative average accuracy → predicted score
  const sorted = [...sessions].sort((a, b) => a.date.localeCompare(b.date));
  let cumQ = 0, cumC = 0;
  const points = sorted.map((s) => {
    cumQ += s.questions; cumC += s.correct;
    const acc = cumQ ? cumC / cumQ : 0;
    return { date: s.date, score: Math.round(800 + acc * 600) };
  });
  if (points.length === 0) points.push({ date: "start", score: 800 }, { date: "now", score: predictedScore });
  if (points.length === 1) points.push({ date: "now", score: predictedScore });

  const W = 600, H = 160, P = 24;
  const minS = Math.min(...points.map((p) => p.score), 800);
  const maxS = Math.max(...points.map((p) => p.score), 1500);
  const xStep = (W - P * 2) / Math.max(1, points.length - 1);
  const yScale = (s: number) => H - P - ((s - minS) / Math.max(1, maxS - minS)) * (H - P * 2);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${P + i * xStep} ${yScale(p.score)}`).join(" ");

  const referralLink = typeof window !== "undefined" ? `${window.location.origin}/?ref=you` : "";
  const copy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({ title: "Link copied" });
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="font-serif text-3xl">Your progress</h1>

      <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-warning/15 flex items-center justify-center">
          <Flame className="h-6 w-6 text-warning" />
        </div>
        <div className="flex-1">
          <p className="font-serif text-2xl leading-none">{currentStreak} day{currentStreak === 1 ? "" : "s"}</p>
          <p className="text-xs text-muted-foreground mt-1">Current streak — practice today to keep it alive.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <h2 className="font-serif text-lg mb-4">Last 28 days</h2>
        {sessions.length < 3 ? (
          <div className="text-center py-8">
            <p className="font-serif text-xl">Day {Math.max(1, sessions.length)} — you started.</p>
            <p className="text-sm text-muted-foreground mt-2">Keep going. Every session compounds.</p>
          </div>
        ) : (
          <Heatmap />
        )}
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-serif text-lg">Score over time</h2>
          <span className="text-sm text-muted-foreground">{predictedScore} predicted</span>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          <defs>
            <linearGradient id="scoreGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${path} L ${P + (points.length - 1) * xStep} ${H - P} L ${P} ${H - P} Z`} fill="url(#scoreGrad)" />
          <path d={path} fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((p, i) => (
            <circle key={i} cx={P + i * xStep} cy={yScale(p.score)} r="3" fill="hsl(var(--primary))" />
          ))}
        </svg>
      </div>

      {!isPro ? (
        <>
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-serif text-lg">Topic breakdown</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Detailed accuracy per topic, weak-area drilldown, and section-level analytics are part of Pro.
            </p>
          </div>
          <PaywallBanner title="Unlock detailed progress · $29/mo" cta="Upgrade" />
        </>
      ) : (
        <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
          <h2 className="font-serif text-lg">Topic breakdown</h2>
          {scores.length === 0 ? (
            <p className="text-sm text-muted-foreground">Complete a topic to see your scores here.</p>
          ) : scores.map((s) => {
            const pct = Math.round((s.correctAnswers / Math.max(1, s.questionsAnswered)) * 100);
            return (
              <div key={s.unitId}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">{s.unitId.replace(/-/g, " ")}</span>
                  <span className="text-muted-foreground">{s.correctAnswers}/{s.questionsAnswered}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="bg-accent/40 border border-border rounded-2xl p-5">
        <h2 className="font-serif text-lg">Get 1 month free</h2>
        <p className="text-sm text-muted-foreground mt-1 mb-4">Share with a friend. When they start a free trial, you both get a month on us.</p>
        <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2">
          <input value={referralLink} readOnly className="flex-1 bg-transparent text-sm outline-none truncate" />
          <button onClick={copy} className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium px-3 py-1.5 rounded-lg">
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
