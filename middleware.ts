// middleware.ts  – MUST be at project-root level
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // ↓ custom handler (optional) – we build a sign-in redirect with the path
  function middleware(req) {
    if (!req.nextauth.token) {
      const signIn = new URL("/api/auth/signin", req.url);
      // preserve original path so we come back here
      signIn.searchParams.set("callbackUrl", req.nextUrl.pathname);
      return NextResponse.redirect(signIn);
    }
    // already authenticated → continue
    return NextResponse.next();
  },
  {
    // ↓ tell withAuth that a token is required
    callbacks: {
      authorized({ token }) {
        return !!token; // truthy token = allow, else run handler above
      }
    }
  }
);

/* ─── Protect *both* /dashboard and everything under it ─── */
export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"]
};
