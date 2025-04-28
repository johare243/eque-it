import { prisma } from "@/lib/prisma";

export default async function Home() {
  // const row = await prisma.user.findFirst();
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">HomePage</h1>
    </main>
  );
}
