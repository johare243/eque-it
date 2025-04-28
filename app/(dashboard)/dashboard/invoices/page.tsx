import { Suspense } from "react";
import InvoiceTable from "./InvoiceTable";
import SkeletonTable from "@/components/SkeletonTable";

export default function TicketsPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-6">Invoices</h1>
      <Suspense fallback={<SkeletonTable cols={4} />}>
        {/* InvoiceTable is now an async Server Component */}
        <InvoiceTable />
      </Suspense>
    </main>
  );
}
