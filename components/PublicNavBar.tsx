import Link from "next/link";

export default function PublicNavBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 h-16 flex items-center backdrop-blur border-b">
      <nav className="mx-auto max-w-screen-xl flex w-full justify-between px-4">
        <Link href="/" className="font-semibold text-brand">
          eque IT
        </Link>
        <div className="space-x-4 text-sm">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link
            href="/api/auth/signin?callbackUrl=/dashboard"
            className="text-brand underline"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
