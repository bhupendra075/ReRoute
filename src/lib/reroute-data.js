export const patient = {
  name: "Aarav Mehta",
  initials: "AM",
  city: "Mumbai, IN",
  bloodGroup: "B POSITIVE",
  bloodShort: "O+",
  riskTag: "Cardiac Risk",
  insurer: "Niva Bupa",
  insuranceStatus: "Cashless Active",
  policyNumber: "NB-3391-8827-441",
  tpa: "Medi Assist TPA",
  contacts: [
    { name: "Priya Mehta", relation: "Spouse", phone: "+91 98200 11234" },
    { name: "Dr. R. Iyer", relation: "Cardiologist", phone: "+91 98670 55190" },
    { name: "Kabir Mehta", relation: "Brother", phone: "+91 99301 77821" },
  ],
  allergies: ["Penicillin", "Sulfa drugs", "Shellfish"],
  conditions: [
    { id: "asthma", label: "Asthma", detail: "Inhaler — Salbutamol", active: true },
    { id: "diabetes", label: "Diabetes Type II", detail: "Metformin 500mg", active: true },
    { id: "heart", label: "Coronary Artery Disease", detail: "Stent — 2023", active: true },
    { id: "hypertension", label: "Hypertension", detail: "Telmisartan 40mg", active: false },
    { id: "epilepsy", label: "Epilepsy", detail: "No history", active: false },
  ],
  visits: [
    { date: "12 Aug", doctor: "Dr. R. Iyer", place: "Asian Heart Institute", note: "Stress test — stable" },
    { date: "27 Jul", doctor: "Dr. S. Kulkarni", place: "Lilavati Hospital", note: "Pulmonary review" },
    { date: "04 Jun", doctor: "Dr. A. Naik", place: "Bandra Clinic", note: "HbA1c 7.1 — dose held" },
  ],
};

export const hospital = {
  name: "Asian Heart Institute",
  area: "Bandra West",
  distance: "3.2 km",
  eta: "11 mins",
  readiness: "Cardiac ER Ready",
  billing: "Cashless TPA Matched",
  desk: "+91 22 6698 6666",
};

export const insurers = ["Star Health", "Niva Bupa", "HDFC Ergo", "ABDM ABHA ID"];

export const routingPreferences = [
  {
    id: "private",
    title: "Private Cashless Only",
    detail: "Route strictly to network hospitals with active cashless approval.",
  },
  {
    id: "public",
    title: "Public / Municipal Only",
    detail: "KEM, Sion and other municipal ERs — lowest out-of-pocket cost.",
  },
  {
    id: "proximity",
    title: "Proximity First",
    detail: "Closest emergency room regardless of tier or billing type.",
  },
];

export const telemetrySteps = [
  "Medical Passport Link Generated",
  "Emergency Contacts Alerted via SMS",
  "Hospital ER Desk Notified",
];