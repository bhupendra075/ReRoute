import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { AppShell } from "@/components/reroute/AppShell";
import { CountdownRing } from "@/components/reroute/CountdownRing";
import { SlideToCancel } from "@/components/reroute/SlideToCancel";
import { RouteMap } from "@/components/reroute/RouteMap";
import { TelemetryFeed } from "@/components/reroute/TelemetryFeed";
import { hospital, telemetrySteps } from "@/lib/reroute-data";

export const Route = createFileRoute("/emergency-active")({
  head: () => ({
    meta: [
      { title: "Triage Active — reroute" },
      {
        name: "description",
        content:
          "Live triage view: countdown false-alarm guard, routed hospital, and dispatch telemetry for your emergency.",
      },
      { property: "og:title", content: "Triage Active — reroute" },
      {
        property: "og:description",
        content: "Live route to the matched emergency room with dispatch status for contacts and ER desk.",
      },
    ],
  }),
  component: EmergencyActive,
});

function EmergencyActive() {
  const navigate = useNavigate();
  const [cancelled, setCancelled] = useState(false);

  return (
    <AppShell className="px-0 pt-0">
      <div className="bg-primary px-5 py-3">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground">
          {cancelled ? "Triage cancelled — standing down" : "Triage active — dispatching data"}
        </p>
      </div>

      <div className="space-y-6 px-5 pt-6">
        <section className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-5">
            <CountdownRing seconds={60} paused={cancelled} />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                False alarm guard
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                Dispatch completes when the countdown ends. Cancel now if you are safe.
              </p>
            </div>
          </div>
          <div className="mt-5">
            <SlideToCancel
              onComplete={() => {
                setCancelled(true);
                setTimeout(() => navigate({ to: "/" }), 900);
              }}
            />
          </div>
        </section>

        <section className="space-y-3">
          <RouteMap label={`En route to ${hospital.name}`} />
          <div className="rounded-xl border border-border bg-elevated p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-base font-bold leading-tight text-foreground">{hospital.name}</p>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                  <MapPin className="size-3" strokeWidth={1.8} /> {hospital.area}
                </p>
              </div>
              <a
                href={`tel:${hospital.desk.replace(/\s/g, "")}`}
                className="flex size-11 items-center justify-center rounded-lg border border-border bg-card"
                aria-label="Call ER desk"
              >
                <Phone className="size-4 text-foreground" strokeWidth={1.8} />
              </a>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-lg bg-overlay px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground">
                {hospital.distance} • {hospital.eta} (Live Traffic)
              </span>
              <span className="rounded-lg border border-foreground/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground">
                {hospital.readiness}
              </span>
              <span className="rounded-lg bg-platinum px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-background">
                {hospital.billing}
              </span>
            </div>
          </div>
        </section>

        <section>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Telemetry status
          </p>
          <TelemetryFeed steps={telemetrySteps} />
        </section>
      </div>
    </AppShell>
  );
}