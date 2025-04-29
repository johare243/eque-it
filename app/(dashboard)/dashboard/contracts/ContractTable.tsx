import { prisma } from "@/lib/prisma";
import { fmtMoney, fmtDate } from "@/utils/format";

export default async function ContractTable() {
  const contracts = await prisma.contract.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="rounded-xl border bg-white shadow dark:bg-gray-800 dark:border-gray-700">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Start Date</th>
            <th className="p-3">Rate</th>
            <th className="p-3">AutoRenew</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((cntr, i) => (
            <tr
              key={cntr.id}
              className={i % 2 ? "bg-gray-50 dark:bg-gray-900/30" : ""}
            >
              <td className="p-3">{cntr.name}</td>
              <td className="p-3">{fmtDate(cntr.startDate)}</td>
              <td className="p-3">{fmtMoney(cntr.hourlyRateCents)}</td>
              <td className="p-3">{cntr.autoRenew ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
