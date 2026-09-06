import { Link } from "@tanstack/react-router";
import { House, IdCard, Route as RouteIcon, Settings2 } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: House },
  { to: "/qr-passport", label: "Medical ID", icon: IdCard },
  { to: "/emergency-active", label: "Triage Map", icon: RouteIcon },
  { to: "/profile-setup", label: "Settings", icon: Settings2 },
];

export function BottomDock() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-md items-stretch justify-between px-4 pb-5 pt-2">
        {items.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="group flex min-h-12 flex-1 flex-col items-center justify-center gap-1 rounded-xl text-muted-foreground transition-colors"
            activeProps={{ className: "text-foreground" }}
          >
            <Icon className="size-5" strokeWidth={1.6} />
            <span className="text-[10px] font-medium uppercase tracking-[0.12em]">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}