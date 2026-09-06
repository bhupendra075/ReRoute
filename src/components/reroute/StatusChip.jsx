export function StatusChip({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="glass-chip flex min-h-12 flex-1 flex-col justify-center gap-1 rounded-xl border border-border/60 px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="size-3.5" strokeWidth={1.7} />
        <span className="text-[9px] font-semibold uppercase tracking-[0.14em]">{label}</span>
      </div>
      <p className="text-[11px] font-medium leading-tight text-foreground">{value}</p>
    </div>
  );
}