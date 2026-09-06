import { useEffect, useState } from "react";

export function CountdownRing({ seconds = 60, paused = false }) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    if (paused || left <= 0) return;
    const id = setTimeout(() => setLeft((v) => v - 1), 1000);
    return () => clearTimeout(id);
  }, [left, paused]);

  const c = 2 * Math.PI * 52;
  const pct = left / seconds;

  return (
    <div className="relative size-32 shrink-0">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border)" strokeWidth="4" />
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="var(--platinum)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold tabular-nums text-foreground">{Math.max(0, left)}</span>
        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          seconds
        </span>
      </div>
    </div>
  );
}