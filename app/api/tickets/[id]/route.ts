import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";

interface Params {
  id: string;
}

export async function PUT(
  req: Request,
  { params }: { params: Params }
) {
  // Only admins can update tickets
  await requireRole("ADMIN");

  const data = await req.json();
  const updated = await prisma.ticket.update({
    where: { id: Number(params.id) },
    data: {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: Params }
) {
  // Only admins can delete tickets
  await requireRole("ADMIN");

  await prisma.ticket.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ ok: true });
}

