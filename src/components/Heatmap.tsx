import { useProgress } from "@/contexts/ProgressContext";

const COLS = 7;
const DAYS = 28;

export default function Heatmap() {
  const { sessions } = useProgress();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cells: { date: string; count: number }[] = [];
  for (let i = DAYS - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    const sess = sessions.find((s) => s.date === iso);
    cells.push({ date: iso, count: sess?.questions || 0 });
  }

  const intensity = (n: number) => {
    if (n === 0) return "bg-muted";
    if (n < 5) return "bg-primary/20";
    if (n < 10) return "bg-primary/40";
    if (n < 20) return "bg-primary/70";
    return "bg-primary";
  };

  return (
    <div>
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
      >
        {cells.map((c) => (
          <div
            key={c.date}
            title={`${c.date} · ${c.count} questions`}
            className={`aspect-square rounded-md ${intensity(c.count)}`}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
        <span>Less</span>
        <span className="h-3 w-3 rounded-sm bg-muted" />
        <span className="h-3 w-3 rounded-sm bg-primary/20" />
        <span className="h-3 w-3 rounded-sm bg-primary/40" />
        <span className="h-3 w-3 rounded-sm bg-primary/70" />
        <span className="h-3 w-3 rounded-sm bg-primary" />
        <span>More</span>
      </div>
    </div>
  );
}
