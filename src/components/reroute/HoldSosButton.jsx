import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const HOLD_MS = 1500;

export function HoldSosButton() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const raf = useRef(null);
  const start = useRef(0);
  const fired = useRef(false);

  const stop = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = null;
    setHolding(false);
    if (!fired.current) setProgress(0);
  }, []);

  useEffect(() => stop, [stop]);

  const begin = () => {
    if (fired.current) return;
    setHolding(true);
    start.current = performance.now();
    const tick = () => {
      const pct = Math.min(1, (performance.now() - start.current) / HOLD_MS);
      setProgress(pct);
      if (pct >= 1) {
        fired.current = true;
        setHolding(false);
        navigate({ to: "/emergency-active" });
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };

  const circumference = 2 * Math.PI * 88;

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        aria-label="Hold to trigger emergency triage"
        onPointerDown={begin}
        onPointerUp={stop}
        onPointerLeave={stop}
        onPointerCancel={stop}
        className={cn(
          "relative flex size-56 select-none items-center justify-center rounded-full border border-border bg-card transition-transform duration-150 active:scale-[0.97]",
          holding && "scale-[0.97]",
        )}
      >
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="88" fill="none" stroke="var(--border)" strokeWidth="3" />
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="var(--foreground)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
          />
        </svg>
        <span
          className={cn(
            "absolute inset-6 rounded-full border border-border/70 bg-elevated transition-colors",
            holding && "bg-overlay",
          )}
        />
        <span className="relative flex flex-col items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-foreground">HOLD FOR SOS</span>
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Trigger triage
          </span>
        </span>
      </button>
      <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
        Press and hold for 1.5 seconds. Location, medical passport and insurance tier dispatch
        automatically.
      </p>
    </div>
  );
}