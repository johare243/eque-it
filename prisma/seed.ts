import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 1. Create one account
  const acme = await prisma.account.upsert({
    where: { name: "Eque IT" },
    update: {}, // no fields to change if it already exists
    create: { name: "Eque IT" }
  });

  // // 2. Create a single ADMIN user in that account

  const user = await prisma.user.upsert({
    where: { email: "admin@equeit.com" },
    update: {}, // no fields to change if it already exists
    create: {
      email: "admin@equeit.com",
      name: "Admin",
      passwordHash: bcrypt.hashSync("timPp4m$$", 12),
      role: Role.ADMIN,
      accountId: acme.id
    }
  });

  // const user = await prisma.user.create({
  //   data: {
  //     email: "admin@equeit.com",
  //     name: "Admin",
  //     passwordHash: bcrypt.hashSync("timPp4m$$", 12),
  //     role: Role.ADMIN,
  //     accountId: acme.id
  //   }
  // });

  await prisma.ticket.createMany({
    data: [
      {
        title: "Weekly Maintenance",
        recurring: true,
        accountId: acme.id,
        createdById: user.id
      },
      {
        title: "One-off Repair",
        status: "IN_PROGRESS",
        accountId: acme.id,
        createdById: user.id
      }
    ]
  });

  await prisma.invoice.createMany({
    data: [
      {
        pdfUrl: "#",
        amountCents: 125000,
        status: "DRAFT",
        accountId: acme.id,
        createdById: user.id
      },
      {
        pdfUrl: "#",
        amountCents: 89000,
        status: "DRAFT",
        accountId: acme.id,
        createdById: user.id
      }
    ]
  });

  console.log("🌱  Seed complete: admin@acme.com / P@ssw0rd");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
