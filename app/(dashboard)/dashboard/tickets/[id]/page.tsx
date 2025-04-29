import TicketForm from "@/components/TicketForm";
import { prisma } from "@/lib/prisma";

export default async function EditTicketPage({ params }) {
  const ticket = await prisma.ticket.findUnique({ where: { id: +params.id } });
  return (
    <main className="p-6">
      <h1 className="text-xl mb-4">Edit Ticket</h1>
      {ticket && (
        <TicketForm initial={{
          title: ticket.title,
          description: ticket.description ?? "",
          category: ticket.category,
          priority: ticket.priority,
          dueDate: ticket.dueDate?.toISOString().slice(0, 10) ?? "",
        }}/>
      )}
    </main>
  );
}

