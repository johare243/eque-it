import "@/app/globals.css";
import PublicNavBar from "@/components/PublicNavBar";

export default function SiteLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PublicNavBar />
        <div className="container mx-auto pt-16 pb-12 px-4">{children}</div>
      </body>
    </html>
  );
}
