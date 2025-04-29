// lib/auth.ts
import { getServerSession } from "next-auth/next";
import { authOptions }       from "@/app/api/auth/[...nextauth]/route";
import { NextResponse }      from "next/server";

/**
 * Call inside a Server Component or Route handler to enforce a role.
 * Throws a redirect or 403 if the user isn’t signed in or doesn’t have the right role.
 */
export async function requireRole(
  role: "ADMIN" | "CLIENT",
  opts?: { redirectTo?: string }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    // not signed in
    const dest = opts?.redirectTo ?? `/api/auth/signin?callbackUrl=${encodeURIComponent(
      opts?.redirectTo ?? "/dashboard"
    )}`;
    throw NextResponse.redirect(dest);
  }
  if (session.user.role !== role && role !== "CLIENT") {
    // you could allow CLIENT to access both, or tighten ADMIN-only
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return session;
}

