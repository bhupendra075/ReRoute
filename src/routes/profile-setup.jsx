import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Upload, ChevronDown, Check } from "lucide-react";
import { AppShell } from "@/components/reroute/AppShell";
import { PillTabs } from "@/components/reroute/PillTabs";
import { cn } from "@/lib/utils";
import { insurers, patient, routingPreferences } from "@/lib/reroute-data";

export const Route = createFileRoute("/profile-setup")({
  head: () => ({
    meta: [
      { title: "Medical & Financial Passport — reroute" },
      {
        name: "description",
        content:
          "Set up your clinical history, allergies, active conditions, insurance provider and hospital routing preference.",
      },
      { property: "og:title", content: "Medical & Financial Passport — reroute" },
      {
        property: "og:description",
        content: "Clinical history plus insurance tier and TPA setup for faster emergency room admission.",
      },
    ],
  }),
  component: ProfileSetup,
});

const tabs = [
  { id: "clinical", label: "Clinical History" },
  { id: "financial", label: "Insurance & Tier" },
];

function ProfileSetup() {
  const [tab, setTab] = useState("clinical");
  const [conditions, setConditions] = useState(patient.conditions);
  const [insurer, setInsurer] = useState(patient.insurer);
  const [insurerOpen, setInsurerOpen] = useState(false);
  const [preference, setPreference] = useState("private");

  return (
    <AppShell>
      <header>
        <h1 className="text-xl font-bold tracking-tight text-foreground">Medical & Financial Passport</h1>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Data dispatched to the ER the moment triage is triggered.
        </p>
      </header>

      <div className="mt-5">
        <PillTabs tabs={tabs} value={tab} onChange={setTab} />
      </div>

      {tab === "clinical" ? (
        <div className="mt-5 space-y-4">
          <Card title="Severe Allergies">
            <div className="flex flex-wrap gap-2">
              {patient.allergies.map((a) => (
                <span
                  key={a}
                  className="rounded-lg border border-border bg-elevated px-3 py-2 text-xs font-medium text-foreground"
                >
                  {a}
                </span>
              ))}
            </div>
          </Card>

          <Card title="Active Conditions">
            <ul className="divide-y divide-border">
              {conditions.map((c) => (
                <li key={c.id} className="flex min-h-14 items-center justify-between gap-3 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{c.label}</p>
                    <p className="text-[11px] text-muted-foreground">{c.detail}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={c.active}
                    aria-label={c.label}
                    onClick={() =>
                      setConditions((prev) =>
                        prev.map((p) => (p.id === c.id ? { ...p, active: !p.active } : p)),
                      )
                    }
                    className={cn(
                      "relative h-7 w-12 shrink-0 rounded-full border transition-colors",
                      c.active ? "border-transparent bg-platinum" : "border-border bg-elevated",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 size-5 rounded-full transition-transform duration-200",
                        c.active ? "translate-x-[22px] bg-background" : "translate-x-0.5 bg-muted-foreground",
                      )}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Recent Doctor Visits" hint="Last 3 months">
            <ul className="divide-y divide-border">
              {patient.visits.map((v) => (
                <li key={v.date} className="flex gap-4 py-3">
                  <span className="w-14 shrink-0 text-xs font-semibold text-foreground">{v.date}</span>
                  <span>
                    <span className="block text-sm text-foreground">{v.doctor}</span>
                    <span className="block text-[11px] text-muted-foreground">
                      {v.place} — {v.note}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          <Card title="Insurance Provider">
            <button
              type="button"
              onClick={() => setInsurerOpen((v) => !v)}
              className="flex min-h-12 w-full items-center justify-between rounded-lg border border-border bg-elevated px-4 text-sm text-foreground"
            >
              {insurer}
              <ChevronDown
                className={cn("size-4 text-muted-foreground transition-transform", insurerOpen && "rotate-180")}
                strokeWidth={1.8}
              />
            </button>
            {insurerOpen ? (
              <ul className="mt-2 overflow-hidden rounded-lg border border-border">
                {insurers.map((name) => (
                  <li key={name}>
                    <button
                      type="button"
                      onClick={() => {
                        setInsurer(name);
                        setInsurerOpen(false);
                      }}
                      className="flex min-h-12 w-full items-center justify-between px-4 text-sm text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground"
                    >
                      {name}
                      {insurer === name ? <Check className="size-4 text-foreground" strokeWidth={2.2} /> : null}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="mt-3 text-[11px] text-muted-foreground">
              Policy {patient.policyNumber} • {patient.tpa}
            </p>
          </Card>

          <Card title="TPA Policy Card">
            <button
              type="button"
              className="flex min-h-32 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-elevated/50 px-4 py-6 text-center"
            >
              <Upload className="size-5 text-muted-foreground" strokeWidth={1.6} />
              <span className="text-sm font-medium text-foreground">Upload policy card or PDF</span>
              <span className="text-[11px] text-muted-foreground">JPG, PNG or PDF up to 8 MB</span>
            </button>
          </Card>

          <Card title="Financial Preference">
            <div className="space-y-3">
              {routingPreferences.map((p) => {
                const selected = preference === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPreference(p.id)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl border px-4 py-4 text-left transition-colors",
                      selected ? "border-foreground bg-elevated" : "border-border bg-transparent",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border",
                        selected ? "border-foreground" : "border-border",
                      )}
                    >
                      {selected ? <span className="size-2.5 rounded-full bg-foreground" /> : null}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-foreground">{p.title}</span>
                      <span className="block text-[11px] leading-relaxed text-muted-foreground">
                        {p.detail}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>
      )}
    </AppShell>
  );
}

function Card({
  title,
  hint,
  children,
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {title}
        </h2>
        {hint ? <span className="text-[10px] text-muted-foreground">{hint}</span> : null}
      </div>
      {children}
    </section>
  );
}