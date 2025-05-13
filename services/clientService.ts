import prisma from '../lib/prisma';

export async function getClientBySlug(slug: string) {
  return prisma.client.findUnique({ where: { slug }, include: { projects: true } });
}

export async function createClient(data: { name: string; slug: string }) {
  return prisma.client.create({ data });
}
