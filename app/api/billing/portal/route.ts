import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Stripe from 'stripe'
import { getCurrentUser } from '@/lib/dal'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const stripeCustomerId = user.client.stripeCustomerId
  if (!stripeCustomerId) {
    return NextResponse.json({ error: 'Missing Stripe customer ID' }, { status: 400 })
  }

  const client = await stripe.customers.retrieve(stripeCustomerId)
  if (!client || typeof client !== 'object' || !('id' in client)) {
    return NextResponse.json({ error: 'Invalid Stripe customer' }, { status: 400 })
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: client.id,
    return_url: `${req.nextUrl.origin}/dashboard/billing`,
  })

  return NextResponse.json({ url: session.url })
}

