import SideNav from "@/components/SideNav";

export const metadata = { title: "eque IT" };

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    /* ① h-screen  = exact viewport height
         ② overflow-hidden keeps the page from scrolling “outside” */
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <SideNav /> {/* sits at far-left */}
      {/* ③ add overflow-y-auto so 👍 internal scroll without growing <html> */}
      <main className="ml-56 flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
