// lib/dal.ts
import { cache } from 'react'
import { prisma } from '@/lib/prisma'
import { mockDelay } from './utils'
import { getSession } from './auth'

// Current user
export async function getCurrentUser() {
  const session = await getSession()
  if (!session) return null

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      role: true,
      client: {
        select: {
          id: true,
          subscriptionStatus: true,
          stripeCustomerId: true,
        },
      },
    },
  })
}

// Get user by email
export const getUserByEmail = cache(async (email: string) => {
  await mockDelay(700)
  return prisma.user.findUnique({
    where: { email },
  })
})

// Fetch a single issue with its creator
export const getIssue = cache(async (id: string) => {
  await mockDelay(700)
  return prisma.issue.findUnique({
    where: { id },
    include: {
      createdBy: { select: { id: true, email: true } },
    },
  })
})

// Fetch all issues with their creators
export const getIssues = cache(async () => {
  await mockDelay(700)
  return prisma.issue.findMany({
    include: {
      createdBy: { select: { id: true, email: true, clientId: true } },
    },
    orderBy: { createdAt: 'desc' },
  })
})

