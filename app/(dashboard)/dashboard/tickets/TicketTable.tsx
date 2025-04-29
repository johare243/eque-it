import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { fmtMoney, fmtDate } from "@/utils/format";

export default async function InvoiceTable() {
  const tickets = await prisma.ticket.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="rounded-xl border bg-white shadow dark:bg-gray-800 dark:border-gray-700">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Status</th>
            <th className="p-3">Priority</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((tkt, i) => (
            <tr
              key={tkt.id}
              className={i % 2 ? "bg-gray-50 dark:bg-gray-900/30" : ""}
            >
              <td className="p-3">{tkt.title}</td>
              <td className="p-3">{tkt.category}</td>
              <td className="p-3">{tkt.status}</td>
              <td className="p-3">{tkt.priority}</td>
              <td className="p-3">
                <Link href={`/dashboard/tickets/${tkt.id}`} className="text-lg font-semibold text-brand rounded">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
