import type { Issue } from '@prisma/client'

export type Status   = 'backlog' | 'todo' | 'in_progress' | 'done'
export type Priority = 'low'     | 'medium' | 'high'

// Rename `user` → `createdBy` to match your schema
export type IssueWithUser = Issue & {
  createdBy: {
    id:    string
    email: string
  }
}

