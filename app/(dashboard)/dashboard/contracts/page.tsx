import { Suspense } from "react";
import ContractTable from "./ContractTable";
import SkeletonTable from "@/components/SkeletonTable";

export default function ContractPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-6">Contracts</h1>
      <Suspense fallback={<SkeletonTable cols={4} />}>
       <ContractTable />
      </Suspense>
    </main>
  );
}
