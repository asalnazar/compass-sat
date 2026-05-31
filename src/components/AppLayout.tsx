import { ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/contexts/ProgressContext";
import { TrendingUp, LogOut, LogIn } from "lucide-react";

const tabs = [
  { to: "/", label: "Home", end: true },
  { to: "/math", label: "Math" },
  { to: "/english", label: "English" },
  { to: "/full-tests", label: "Tests" },
  { to: "/progress", label: "Progress" },
];


function ScoreBadge() {
  const { user } = useAuth();
  const { predictedScore, scores } = useProgress();
  if (!user) return null;
  const completed = scores.filter((s) => s.completed).length;
  const trend = completed > 0 ? Math.min(60 + completed * 5, 180) : 0;
  return (
    <div className="flex items-center gap-2 rounded-full bg-card border border-border pl-3 pr-2 py-1.5 shadow-sm">
      <div className="flex flex-col leading-none">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Predicted SAT</span>
        <span className="font-serif text-base text-foreground">{predictedScore}</span>
      </div>
      <span className="flex items-center gap-0.5 rounded-full bg-success/10 text-success px-2 py-0.5 text-xs font-semibold">
        <TrendingUp className="h-3 w-3" />+{trend}
      </span>
    </div>
  );
}

export default function AppLayout({ children }: { children: ReactNode }) {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const hideChrome = location.pathname === "/auth" || location.pathname === "/reset-password";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {!hideChrome && (
        <header className="sticky top-0 z-30 bg-background/85 backdrop-blur border-b border-border">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
            <Link to="/" className="font-serif text-2xl tracking-tight">
              Next<span className="text-primary">Step</span>
            </Link>
            <div className="flex items-center gap-3">
              <ScoreBadge />
              {user ? (
                <button onClick={signOut} className="p-2 rounded-full hover:bg-muted text-muted-foreground" aria-label="Sign out">
                  <LogOut className="h-4 w-4" />
                </button>
              ) : (
                <Link to="/auth" className="p-2 rounded-full hover:bg-muted text-muted-foreground" aria-label="Sign in">
                  <LogIn className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
          {user && (
            <nav className="border-t border-border bg-card/40">
              <div className="max-w-5xl mx-auto px-2 flex items-center gap-1 overflow-x-auto">
                {tabs.map((t) => (
                  <NavLink
                    key={t.to}
                    to={t.to}
                    end={t.end}
                    className={({ isActive }) =>
                      `relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {t.label}
                        {isActive && (
                          <span className="absolute left-2 right-2 -bottom-px h-0.5 bg-primary rounded-full" />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </nav>
          )}
        </header>
      )}
      <main className="flex-1 w-full">
        <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">{children}</div>
      </main>
    </div>
  );
}
