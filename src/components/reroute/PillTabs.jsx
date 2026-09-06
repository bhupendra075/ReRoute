import { cn } from "@/lib/utils";

export function PillTabs({ tabs, value, onChange }) {
  return (
    <div className="flex gap-1 rounded-xl border border-border bg-card p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            "min-h-11 flex-1 rounded-lg text-xs font-semibold uppercase tracking-[0.12em] transition-colors",
            value === tab.id
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-elevated",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}