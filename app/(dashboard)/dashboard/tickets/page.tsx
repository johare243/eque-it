import { Suspense } from "react";
import TicketTable from "./TicketTable";
import SkeletonTable from "@/components/SkeletonTable";

export default function TicketPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-6">Tickets</h1>
      <Suspense fallback={<SkeletonTable cols={4} />}>
        {/* TicketTable is now an async Server Component */}
        <TicketTable />
      </Suspense>
    </main>
  );
}
