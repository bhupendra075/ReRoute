import { cn } from "@/lib/utils";
import { BottomDock } from "./BottomDock";

export function AppShell({
  children,
  dock = true,
  className,
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-md">
        <main className={cn("px-5 pt-5", dock ? "pb-32" : "pb-10", className)}>{children}</main>
      </div>
      {dock ? <BottomDock /> : null}
    </div>
  );
}