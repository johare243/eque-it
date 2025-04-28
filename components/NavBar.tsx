// components/NavBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem
} from "@/components/ui/navigation-menu";
import { LogOut } from "lucide-react";

/* ---------- routes you want to show in the nav ---------- */
const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/tickets", label: "Tickets" },
  { href: "/dashboard/invoices", label: "Invoices" }
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-30 backdrop-blur border-b border-gray-200/60 dark:border-gray-800/60">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3">
        {/* Brand / logo */}
        <Link href="/" className="text-lg font-semibold text-brand">
          eque IT
        </Link>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList>
            {links.map((l) => (
              <NavigationMenuItem key={l.href}>
                <Link
                  href={l.href}
                  className={`px-3 py-2 rounded-md text-sm transition-colors
                    ${
                      pathname === l.href
                        ? "bg-brand text-white dark:bg-brand"
                        : "hover:bg-brand/10 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  {l.label}
                </Link>
              </NavigationMenuItem>
            ))}

            {/* Logout */}
            <NavigationMenuItem>
              <Link
                href="/api/auth/signout"
                className="ml-4 flex items-center gap-1 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-gray-800/40"
              >
                <LogOut size={16} />
                Logout
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
