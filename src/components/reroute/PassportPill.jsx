import { cn } from "@/lib/utils";

const variants = {
  critical: "border-2 border-foreground bg-background text-foreground font-bold",
  solid: "border border-transparent bg-overlay text-foreground font-semibold",
  muted: "border border-border bg-transparent text-muted-foreground font-medium",
};

export function PassportPill({
  children,
  variant = "muted",
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-11 items-center rounded-xl px-4 text-[11px] uppercase tracking-[0.14em]",
        variants[variant],
      )}
    >
      {children}
    </span>
  );
}