'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/dal'
import { mockDelay } from '@/lib/utils'
import { revalidatePath } from 'next/cache'
import { IssueStatus, IssuePriority } from '@prisma/client'

const IssueSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string().optional().nullable(),
  status: z.enum(['open', 'in_progress', 'resolved', 'closed'], {
    errorMap: () => ({ message: 'Please select a valid status' }),
  }),
  priority: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: 'Please select a valid priority' }),
  }),
})

export type IssueData = z.infer<typeof IssueSchema>

export type ActionResponse = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
  error?: string
}

export async function createIssue(data: IssueData): Promise<ActionResponse> {
  await mockDelay(700)
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return { success: false, message: 'Unauthorized', error: 'Unauthorized' }
  }

  const result = IssueSchema.safeParse(data)
  if (!result.success) {
    return {
      success: false,
      message: 'Validation failed',
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await prisma.issue.create({
      data: {
        title:       result.data.title,
        description: result.data.description,
        status:      result.data.status.toUpperCase() as IssueStatus,
        priority:    result.data.priority.toUpperCase() as IssuePriority,
        userId:      currentUser.id,
        clientId:    currentUser.client.id,
      },
    })

    revalidatePath('/issues')
    return { success: true, message: 'Issue created successfully' }
  } catch (err) {
    console.error('Error creating issue:', err)
    return {
      success: false,
      message: 'Failed to create issue',
      error: `${(err as Error).message}`,
    }
  }
}

export async function updateIssue(
  id: string,
  data: Partial<IssueData>
): Promise<ActionResponse> {
  await mockDelay(700)
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return { success: false, message: 'Unauthorized', error: 'Unauthorized' }
  }

  const result = IssueSchema.partial().safeParse(data)
  if (!result.success) {
    return {
      success: false,
      message: 'Validation failed',
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await prisma.issue.updateMany({
      // only update if it belongs to this client
      where: { id, clientId: currentUser.client.id },
      data: {
        title:       result.data.title,
        description: result.data.description,
        status:      result.data.status.toUpperCase() as IssueStatus,
        priority:    result.data.priority.toUpperCase() as IssuePriority,
      },
    })
    revalidatePath('/issues')
    return { success: true, message: 'Issue updated successfully' }
  } catch (err) {
    console.error('Error updating issue:', err)
    return {
      success: false,
      message: 'Failed to update issue',
      error: `${(err as Error).message}`,
    }
  }
}

export async function deleteIssue(id: string): Promise<ActionResponse> {
  await mockDelay(700)
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return { success: false, message: 'Unauthorized', error: 'Unauthorized' }
  }

  try {
    await prisma.issue.deleteMany({
      where: { id, clientId: currentUser.client.id },
    })
    revalidatePath('/issues')
    return { success: true, message: 'Issue deleted successfully' }
  } catch (err) {
    console.error('Error deleting issue:', err)
    return {
      success: false,
      message: 'Failed to delete issue',
      error: `${(err as Error).message}`,
    }
  }
}

