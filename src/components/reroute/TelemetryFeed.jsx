import { useEffect, useState } from "react";
import { Check, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

export function TelemetryFeed({ steps }) {
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (done >= steps.length) return;
    const id = setTimeout(() => setDone((v) => v + 1), 1400);
    return () => clearTimeout(id);
  }, [done, steps.length]);

  return (
    <ul className="divide-y divide-border rounded-xl border border-border bg-card">
      {steps.map((step, i) => {
        const complete = i < done;
        return (
          <li key={step} className="flex min-h-12 items-center gap-3 px-4 py-3.5">
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-md border",
                complete ? "border-transparent bg-primary text-primary-foreground" : "border-border text-muted-foreground",
              )}
            >
              {complete ? (
                <Check className="size-3.5" strokeWidth={3} />
              ) : (
                <Loader className="size-3.5 animate-spin" strokeWidth={2} />
              )}
            </span>
            <span
              className={cn(
                "text-sm",
                complete ? "font-medium text-foreground" : "text-muted-foreground",
              )}
            >
              {step}
            </span>
          </li>
        );
      })}
    </ul>
  );
}