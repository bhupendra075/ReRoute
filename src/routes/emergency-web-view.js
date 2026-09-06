import { createFileRoute } from "@tanstack/react-router";
import { MapPin, PhoneCall, Building2 } from "lucide-react";
import { InfoAccordion } from "@/components/reroute/InfoAccordion";
import { RouteMap } from "@/components/reroute/RouteMap";
import { hospital, patient } from "@/lib/reroute-data";

export const Route = createFileRoute("/emergency-web-view")({
  head: () => ({
    meta: [
      { title: "Emergency Alert — reroute" },
      {
        name: "description",
        content:
          "Shared emergency alert page: live transit status, medical snapshot and insurance details for contacts and paramedics.",
      },
      { property: "og:title", content: "Emergency Alert — reroute" },
      {
        property: "og:description",
        content: "Live location, medical snapshot and insurance verification for emergency contacts.",
      },
    ],
  }),
  component: EmergencyWebView,
});

function EmergencyWebView() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-primary px-5 py-4">
        <div className="mx-auto w-full max-w-xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/70">
            reroute emergency alert
          </p>
          <p className="mt-1 text-base font-bold text-primary-foreground">
            {patient.name} triggered emergency triage
          </p>
          <p className="text-[11px] font-medium text-primary-foreground/70">
            Alert sent 21:46 IST • 05 Sep • Auto-updating
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-xl space-y-6 px-5 py-6">
        <section className="space-y-3">
          <RouteMap label="In transit to Lilavati Hospital" />
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <MapPin className="size-4 shrink-0 text-foreground" strokeWidth={1.8} />
            <div>
              <p className="text-sm font-semibold text-foreground">In Transit to Lilavati Hospital</p>
              <p className="text-[11px] text-muted-foreground">
                Last GPS ping • Bandra West, Mumbai • {hospital.eta} remaining
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <a
            href={`tel:${patient.contacts[0].phone.replace(/\s/g, "")}`}
            className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground"
          >
            <PhoneCall className="size-4" strokeWidth={2} /> Call Patient
          </a>
          <a
            href={`tel:${hospital.desk.replace(/\s/g, "")}`}
            className="flex min-h-14 items-center justify-center gap-2 rounded-xl border border-border bg-card text-sm font-bold uppercase tracking-[0.12em] text-foreground"
          >
            <Building2 className="size-4" strokeWidth={2} /> Call ER Desk
          </a>
        </section>

        <InfoAccordion
          items={[
            {
              title: "Medical Snapshot",
              hint: "Blood group, chronic risks, last visit",
              content: (
                <dl className="space-y-3">
                  <Row label="Blood group" value={patient.bloodGroup} />
                  <Row label="Allergies" value={patient.allergies.join(", ")} />
                  <Row
                    label="Chronic risks"
                    value={patient.conditions
                      .filter((c) => c.active)
                      .map((c) => c.label)
                      .join(", ")}
                  />
                  <Row
                    label="Last doctor visit"
                    value={`${patient.visits[0].date} — ${patient.visits[0].doctor}, ${patient.visits[0].place}`}
                  />
                </dl>
              ),
            },
            {
              title: "Insurance TPA Card & Policy",
              hint: "For instant ER desk verification",
              content: (
                <dl className="space-y-3">
                  <Row label="Insurer" value={patient.insurer} />
                  <Row label="Policy number" value={patient.policyNumber} />
                  <Row label="TPA" value={patient.tpa} />
                  <Row label="Status" value="Cashless pre-authorisation requested" />
                </dl>
              ),
            },
          ]}
        />

        <p className="pb-4 text-center text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Shared securely via reroute • No app required
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-border pb-3 last:border-0 last:pb-0 sm:flex-row sm:justify-between sm:gap-4">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </dt>
      <dd className="text-sm font-medium text-foreground sm:text-right">{value}</dd>
    </div>
  );
}