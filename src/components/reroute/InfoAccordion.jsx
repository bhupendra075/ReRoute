import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function InfoAccordion({
  items,
  defaultOpen = 0,
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title} className="overflow-hidden rounded-xl border border-border bg-card">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left"
            >
              <span>
                <span className="block text-sm font-semibold text-foreground">{item.title}</span>
                {item.hint ? (
                  <span className="block text-[11px] text-muted-foreground">{item.hint}</span>
                ) : null}
              </span>
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
                strokeWidth={1.8}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="border-t border-border px-4 py-4 text-sm text-muted-foreground">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}