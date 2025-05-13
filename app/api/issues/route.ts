import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const issues = await prisma.issue.findMany({
    include: { createdBy: { select: { id: true, email: true } } },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(issues)
}

export async function POST(req: Request) {
  const { title, description, status, priority, userId } = await req.json()

  if (!title || !userId) {
    return NextResponse.json({ error: 'Title and userId required' }, { status: 400 })
  }

  const newIssue = await prisma.issue.create({
    data: { title, description, status, priority, userId },
  })

  return NextResponse.json(newIssue, { status: 201 })
}

