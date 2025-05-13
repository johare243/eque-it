// lib/dal.ts
import { cache } from 'react'
import { prisma } from '@/lib/prisma'
import { getSession } from './auth'
import { mockDelay } from './utils'

// Current user
export const getCurrentUser = cache(async () => {
  const session = await getSession()
  if (!session) return null

  // Skip during static builds
  if (
    typeof window === 'undefined' &&
    process.env.NEXT_PHASE === 'phase-production-build'
  ) {
    return null
  }

  await mockDelay(700)
  return prisma.user.findUnique({
    where: { id: session.userId },
  })
})

// Get user by email
export const getUserByEmail = cache(async (email: string) => {
  await mockDelay(700)
  return prisma.user.findUnique({
    where: { email },
  })
})

// Fetch a single issue
export const getIssue = cache(async (id: number) => {
  await mockDelay(700)
  return prisma.issue.findUnique({
    where: { id },
    include: { user: true },
  })
})

// Fetch all issues
export const getIssues = cache(async () => {
  await mockDelay(700)
  return prisma.issue.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  })
})

