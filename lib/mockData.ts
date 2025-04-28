// lib/mockData.ts
export type Role = "ADMIN" | "CUSTOMER";

export const currentRole: () => Role = () =>
  typeof window !== "undefined" && new URLSearchParams(window.location.search).get("admin")
    ? "ADMIN"
    : "CUSTOMER";

export const account = {
  id: 1,
  name: "Acme Logistics",
};

export const tickets = [
  { id: 1, title: "Weekly Maintenance", status: "OPEN", recurring: true },
  { id: 2, title: "One-off Repair", status: "IN_PROGRESS", recurring: false },
];

export const invoices = [
  { id: 101, pdfUrl: "#", amountCents: 125000, paid: false },
  { id: 102, pdfUrl: "#", amountCents: 89000, paid: true },
];

