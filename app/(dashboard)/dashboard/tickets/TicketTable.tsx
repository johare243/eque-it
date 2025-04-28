import { prisma } from "@/lib/prisma";
import { fmtDate } from "@/utils/format";

export default async function TicketTable() {
  const tickets = await prisma.ticket.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="rounded-xl border bg-white shadow dark:bg-gray-800 dark:border-gray-700">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3">Status</th>
            <th className="p-3">Recurring</th>
            <th className="p-3">Created</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t, i) => (
            <tr
              key={t.id}
              className={i % 2 ? "bg-gray-50 dark:bg-gray-900/30" : ""}
            >
              <td className="p-3">{t.title}</td>
              <td className="p-3">{t.status}</td>
              <td className="p-3">{t.recurring ? "Yes" : "No"}</td>
              <td className="p-3">{fmtDate(t.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
