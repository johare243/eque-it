// app/dashboard/billing/page.tsx
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/dal'
import ManagePortalButton from '@/app/components/ManagePortalButton'

export default async function BillingPage() {
  const user = await getCurrentUser()

  console.log(user);
  // If no user **or** no client, or not ADMIN, redirect
  if (!user || !user.client || user.role !== 'ADMIN') {
    return redirect('/dashboard')
  }

  const status = user.client.subscriptionStatus.toLowerCase()

  return (
    <div className="max-w-lg mx-auto p-8 bg-dark-high dark:bg-dark-high rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Billing
      </h1>
      <p className="mb-6">
        Subscription status:{' '}
        <strong className="capitalize">{status}</strong>
      </p>
      <ManagePortalButton />
    </div>
  )
}

