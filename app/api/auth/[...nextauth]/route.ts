import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"; // v4 adapter
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize({ email, password }) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (user && bcrypt.compareSync(password, user.passwordHash)) {
          return { id: user.id, email: user.email, role: user.role };
        }
        return null;
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    session({ session, token }) {
      if (session.user && token.role) session.user.role = token.role as string;
      return session;
    },
    redirect({ url, baseUrl }) {
      // keep explicit or external callbackUrls unchanged
      if (url.startsWith(baseUrl) || url.startsWith("/")) return url;

      // default fallback
      return `${baseUrl}/dashboard`;
    }
  }
} satisfies Parameters<typeof NextAuth>[0];

/* -------  THIS is the v4-App-Router export pattern  ------- */
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
/* ---------------------------------------------------------- */
