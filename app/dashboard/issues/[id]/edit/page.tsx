import { redirect } from 'next/navigation'
import IssueForm from '@/app/components/IssueForm'
import { getCurrentUser, getIssue } from '@/lib/dal'

interface EditIssuePageProps {
  params: { id: string }
}

export default async function EditIssuePage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>
}) {
  // await params before destructuring
  const { id } = await params

  const user = await getCurrentUser()
  if (!user) return redirect('/signin')

  const issue = await getIssue(id)
  if (!issue || issue.clientId !== user.client.id) {
    return redirect('/dashboard')
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-dark-elevated dark:bg-dark-elevated rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Edit Issue</h1>
      <IssueForm issue={issue} isEditing userId={user.id} />
    </div>
  )
}
