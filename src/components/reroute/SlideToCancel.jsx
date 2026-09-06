import { useRef, useState } from "react";
import { ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SlideToCancel({ onComplete }) {
  const track = useRef(null);
  const [x, setX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [done, setDone] = useState(false);

  const maxX = () => (track.current ? track.current.clientWidth - 56 : 0);

  const move = (clientX) => {
    if (!track.current || done) return;
    const rect = track.current.getBoundingClientRect();
    setX(Math.max(0, Math.min(maxX(), clientX - rect.left - 28)));
  };

  const release = () => {
    setDragging(false);
    if (x >= maxX() - 8) {
      setDone(true);
      setX(maxX());
      onComplete();
    } else {
      setX(0);
    }
  };

  const pct = maxX() ? x / maxX() : 0;

  return (
    <div
      ref={track}
      className="relative h-14 w-full overflow-hidden rounded-xl border border-border bg-elevated"
      onPointerMove={(e) => dragging && move(e.clientX)}
      onPointerUp={release}
      onPointerLeave={() => dragging && release()}
    >
      <div
        className="absolute inset-y-0 left-0 bg-overlay"
        style={{ width: `${pct * 100}%`, transition: dragging ? "none" : "width 200ms ease" }}
      />
      <span
        className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
        style={{ opacity: 1 - pct }}
      >
        {done ? "Cancelled" : "Slide to cancel (I'm okay)"}
      </span>
      <button
        type="button"
        aria-label="Slide to cancel triage"
        onPointerDown={() => setDragging(true)}
        className={cn(
          "absolute top-1 flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground",
          !dragging && "transition-transform duration-200",
        )}
        style={{ transform: `translateX(${x + 4}px)` }}
      >
        <ChevronsRight className="size-5" strokeWidth={2} />
      </button>
    </div>
  );
}