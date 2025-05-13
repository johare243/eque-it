import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser, getIssue } from '@/lib/dal'
import { formatRelativeTime } from '@/lib/utils'
import Badge from '@/app/components/ui/Badge'
import Button from '@/app/components/ui/Button'
import { ISSUE_STATUS, ISSUE_PRIORITY } from '@/lib/constants'
import type { Priority, Status } from '@/lib/types'

interface IssuePageProps {
  params: { id: string }
}

export default async function IssuePage({ params }: IssuePageProps) {
  const user = await getCurrentUser()
  if (!user) {
    // require login
    return redirect('/signin')
  }

  const issue = await getIssue(params.id)
  if (!issue || issue.clientId !== user.client.id) {
    // not found or not your tenant
    return redirect('/dashboard')
  }

  const isOwner = issue.createdBy.id === user.id
  const isAdmin = user.role === 'ADMIN'

  const statusKey   = issue.status.toLowerCase() as Status
  const priorityKey = issue.priority.toLowerCase() as Priority

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6 bg-dark-elevated dark:bg-dark-elevated rounded-lg shadow">
      <header className="flex items-start justify-between">
        <h1 className="text-3xl font-bold dark:text-white">{issue.title}</h1>
        <div className="space-x-2">
          {(isAdmin || isOwner) && (
            <Link href={`/dashboard/issues/${issue.id}/edit`}>
              <Button variant="secondary" size="sm">
                Edit
              </Button>
            </Link>
          )}
        </div>
      </header>

      <div className="flex space-x-4">
        <Badge status={statusKey}>{ISSUE_STATUS[statusKey].label}</Badge>
        <Badge priority={priorityKey}>{ISSUE_PRIORITY[priorityKey].label}</Badge>
      </div>

      <div className="prose dark:prose-invert">
        <p>{issue.description || 'No description provided.'}</p>
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400">
        Created {formatRelativeTime(new Date(issue.createdAt))} by{' '}
        <span className="font-medium">{issue.createdBy.email}</span>
      </div>

      <div>
        <Link href="/dashboard">
          <Button variant="ghost">Back to Issues</Button>
        </Link>
      </div>
    </div>
  )
}

