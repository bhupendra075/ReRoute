import { createFileRoute, Link } from "@tanstack/react-router";
import { Droplet, ShieldCheck, Users, QrCode, NotebookPen, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/reroute/AppShell";
import { StatusChip } from "@/components/reroute/StatusChip";
import { HoldSosButton } from "@/components/reroute/HoldSosButton";
import { patient } from "@/lib/reroute-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "reroute — Emergency Medical & Financial Triage" },
      {
        name: "description",
        content:
          "Hold for SOS: reroute dispatches your medical passport, insurance tier and live location to the right emergency room.",
      },
      { property: "og:title", content: "reroute — Emergency Medical & Financial Triage" },
      {
        property: "og:description",
        content:
          "One-tap emergency triage that routes you to the right ER with your medical and insurance data already sent ahead.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppShell>
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold lowercase tracking-tight text-foreground">reroute</h1>
          <div className="mt-1 flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-platinum opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-platinum" />
            </span>
            <p className="text-[11px] font-medium tracking-wide text-muted-foreground">
              {patient.city} • GPS Active
            </p>
          </div>
        </div>
        <Link
          to="/profile-setup"
          className="flex size-11 items-center justify-center rounded-xl border border-border bg-card text-xs font-semibold text-muted-foreground"
        >
          {patient.initials}
        </Link>
      </header>

      <section className="mt-10 flex justify-center">
        <HoldSosButton />
      </section>

      <section className="mt-10 flex gap-2">
        <StatusChip icon={Droplet} label="Blood" value={`${patient.bloodShort} | ${patient.riskTag}`} />
        <StatusChip
          icon={ShieldCheck}
          label="Cover"
          value={`${patient.insurer} • ${patient.insuranceStatus}`}
        />
        <StatusChip icon={Users} label="Contacts" value={`${patient.contacts.length} Contacts Ready`} />
      </section>

      <section className="mt-6 space-y-3">
        <SecondaryCard
          to="/qr-passport"
          icon={QrCode}
          title="Offline QR Medical Passport"
          detail="Works with no signal — tap to display for responders"
        />
        <SecondaryCard
          to="/profile-setup"
          icon={NotebookPen}
          title="Update 3-Month Health Log"
          detail="Last entry 12 Aug • Asian Heart Institute"
        />
      </section>
    </AppShell>
  );
}

function SecondaryCard({
  to,
  icon: Icon,
  title,
  detail,
}) {
  return (
    <Link
      to={to}
      className="flex min-h-16 items-center gap-4 rounded-xl border border-border bg-card px-4 py-4 transition-colors hover:bg-elevated"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-elevated">
        <Icon className="size-5 text-foreground" strokeWidth={1.6} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-foreground">{title}</span>
        <span className="block truncate text-[11px] text-muted-foreground">{detail}</span>
      </span>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.8} />
    </Link>
  );
}