import { prisma } from "@/lib/prisma";
import { fmtMoney, fmtDate } from "@/utils/format";

export default async function InvoiceTable() {
  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="rounded-xl border bg-white shadow dark:bg-gray-800 dark:border-gray-700">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="p-3">Amount</th>
            <th className="p-3">Paid</th>
            <th className="p-3">Created</th>
            <th className="p-3">PDF</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv, i) => (
            <tr
              key={inv.id}
              className={i % 2 ? "bg-gray-50 dark:bg-gray-900/30" : ""}
            >
              <td className="p-3">{fmtMoney(inv.amountCents)}</td>
              <td className="p-3">{inv.paid ? "Yes" : "No"}</td>
              <td className="p-3">{fmtDate(inv.createdAt)}</td>
              <td className="p-3">{inv.pdfUrl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
