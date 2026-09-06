export function RouteMap({ label }) {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-xl border border-border bg-card">
      <div className="grid-map absolute inset-0" />
      <svg className="absolute inset-0 size-full" viewBox="0 0 320 288" preserveAspectRatio="none">
        <path
          d="M-10 210 L120 200 L150 120 L300 100"
          stroke="#2d333d"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M60 300 L90 150 L200 130 L230 -10"
          stroke="#2d333d"
          strokeWidth="12"
          fill="none"
        />
        <path
          d="M40 250 C 90 240, 110 170, 160 150 S 230 120, 275 70"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="6 7"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M40 250 C 90 240, 110 170, 160 150 S 230 120, 275 70"
          stroke="#ffffff"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="40" cy="250" r="10" fill="#111315" stroke="#ffffff" strokeWidth="3" />
        <circle cx="40" cy="250" r="3" fill="#ffffff" />
        <rect x="265" y="60" width="20" height="20" rx="5" fill="#ffffff" />
        <path d="M275 65 v10 M270 70 h10" stroke="#111315" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <div className="absolute left-3 top-3 rounded-lg border border-border/70 bg-background/80 px-2.5 py-1.5 backdrop-blur-md">
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Live route
        </p>
        <p className="text-xs font-medium text-foreground">{label}</p>
      </div>
    </div>
  );
}