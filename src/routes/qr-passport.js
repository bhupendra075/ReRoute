import { createFileRoute } from "@tanstack/react-router";
import { QRCodeSVG } from "qrcode.react";
import { AppShell } from "@/components/reroute/AppShell";
import { PassportPill } from "@/components/reroute/PassportPill";
import { patient } from "@/lib/reroute-data";

export const Route = createFileRoute("/qr-passport")({
  head: () => ({
    meta: [
      { title: "First Responder Passport — reroute" },
      {
        name: "description",
        content:
          "Offline QR medical passport with blood group, allergies and emergency contacts for first responders — no app required.",
      },
      { property: "og:title", content: "First Responder Passport — reroute" },
      {
        property: "og:description",
        content: "Scannable offline medical passport for bystanders and paramedics.",
      },
    ],
  }),
  component: QrPassport,
});

const payload = [
  `NAME:${patient.name}`,
  `BLOOD:${patient.bloodGroup}`,
  `ALLERGIES:${patient.allergies.join("/")}`,
  `CONDITIONS:${patient.conditions.filter((c) => c.active).map((c) => c.label).join("/")}`,
  `CONTACT:${patient.contacts[0].name} ${patient.contacts[0].phone}`,
  `INSURER:${patient.insurer} ${patient.policyNumber}`,
].join("\n");

function QrPassport() {
  return (
    <AppShell className="px-0 pt-0">
      <div className="bg-primary px-5 py-3">
        <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground">
          First Responder Emergency Passport
        </p>
      </div>

      <div className="space-y-6 px-5 pt-6">
        <section className="rounded-xl border border-border bg-card p-5">
          <div className="mx-auto w-fit rounded-xl bg-white p-4">
            <QRCodeSVG value={payload} size={208} level="M" bgColor="#ffffff" fgColor="#000000" />
          </div>
          <p className="mt-4 text-center text-sm font-semibold text-foreground">{patient.name}</p>
          <p className="text-center text-[11px] text-muted-foreground">
            Passport ID • RR-{patient.policyNumber.replace(/\D/g, "").slice(-4)} • Offline copy
          </p>
        </section>

        <section className="rounded-xl border border-border bg-elevated p-4">
          <div className="flex gap-2">
            {["EN", "HI", "MR"].map((lang) => (
              <span
                key={lang}
                className="rounded-md border border-border px-2 py-1 text-[10px] font-semibold tracking-[0.12em] text-muted-foreground"
              >
                {lang}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm font-semibold uppercase leading-relaxed tracking-wide text-foreground">
            Scan QR code for blood type, allergies & emergency contacts. No app required.
          </p>
          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
            रक्त समूह, एलर्जी और आपातकालीन संपर्क के लिए क्यूआर कोड स्कैन करें। ऐप की आवश्यकता नहीं।
            <br />
            रक्तगट, अ‍ॅलर्जी आणि आपत्कालीन संपर्कासाठी क्यूआर कोड स्कॅन करा. अ‍ॅपची गरज नाही.
          </p>
        </section>

        <section>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Instant summary — visible without scanning
          </p>
          <div className="flex flex-wrap gap-2">
            <PassportPill variant="critical">Allergic to Penicillin</PassportPill>
            <PassportPill variant="solid">Blood Group: {patient.bloodGroup}</PassportPill>
            <PassportPill variant="muted">Asthma Patient</PassportPill>
          </div>
        </section>
      </div>
    </AppShell>
  );
}