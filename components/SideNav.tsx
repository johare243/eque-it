"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";

const items = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/tickets", label: "Tickets" },
  { href: "/dashboard/invoices", label: "Invoices" },
  { href: "/dashboard/contracts", label: "Contracts" }
];

export default function SideNav() {
  const path = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 z-20 w-56 border-r bg-white/80 backdrop-blur
                       dark:bg-gray-950/60 dark:border-gray-800"
    >
      <div className="flex h-full flex-col py-6">
        <h2 className="px-6 pb-4 text-lg font-semibold text-brand">eque IT</h2>

        <nav className="flex-1 space-y-1">
          {items.map((i) => {
            const active = path === i.href;
            return (
              <Link
                key={i.href}
                href={i.href}
                className={`flex items-center gap-2 px-6 py-2 rounded-r-full transition-colors
                         ${active
                    ? "dark:bg-gray-600 dark:text-white bg-blue-200 text-blue"
                    : "text-gray-700 hover:bg-blue-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  }
                      `}
              >
                {/* Accent bar */}
                <span
                  className={`h-6 w-1 rounded-full
                    ${active
                      ? "bg-brand"
                      : "bg-transparent group-hover:bg-blue-300 dark:group-hover:bg-gray-700"
                    }
                  `}
                />
                {i.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto px-6 py-4 flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded bg-gray-200 dark:bg-gray-700"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <div>Dark/Light Mode</div>
        </div>

        <Link
          href="/api/auth/signout"
          className="mt-auto flex items-center gap-2 px-6 py-2 text-red-600
                     hover:bg-red-50 dark:hover:bg-gray-800/40"
        >
          <LogOut size={16} /> Logout
        </Link>
      </div>
    </aside>
  );
}
