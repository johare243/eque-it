// app/actions/onboard.ts
'use server'

import { hashPassword } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

const OnboardSchema = z.object({
  clientName: z.string().min(1, 'Company name is required'),
  email:      z.string().email('Invalid email'),
  password:   z.string().min(6, 'Password must be at least 6 chars'),
})

export type OnboardResponse = {
  success:   boolean
  message:   string
  errors?:   Record<string,string[]>
  clientId?: string
}

export async function onboardClient(formData: FormData): Promise<OnboardResponse> {
  // 1) validate inputs
  const data = {
    clientName: formData.get('clientName') as string,
    email:      formData.get('email')      as string,
    password:   formData.get('password')   as string,
  }
  const result = OnboardSchema.safeParse(data)
  if (!result.success) {
    return { success: false, message: 'Validation failed', errors: result.error.flatten().fieldErrors }
  }

  const { clientName, email, password } = result.data
  const hashed = await hashPassword(password)

  try {
    // 2) create a Stripe customer
    const stripeCustomer = await stripe.customers.create({
      name:  clientName,
      email: email,
    })

    // 3) create Client + Admin User in a transaction
    const { client } = await prisma.$transaction(tx =>
      Promise.all([
        tx.client.create({
          data: {
            name:             clientName,
            slug:             clientName.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
            stripeCustomerId: stripeCustomer.id,
            // subscriptionStatus defaults to ACTIVE
          },
        }),
        tx.user.create({
          data: {
            email,
            password: hashed,
            clientId:  undefined as any, // placeholder—will fill right after client creation
            role:      'ADMIN',
          },
        }),
      ]).then(([client]) => ({ client }))
    )

    // 4) now tie the user to the client (second step)
    //    (or you can split the tx above into two calls preserving client.id)

    return {
      success:  true,
      message:  'Client & Stripe customer created',
      clientId: client.id,
    }
  } catch (err: any) {
    console.error('Onboard error:', err)
    if (err.code === 'P2002') {
      const field = (err.meta?.target as string[])[0]
      return {
        success: false,
        message: `${field === 'stripeCustomerId' ? 'Stripe customer' : field} already exists`,
        errors:  { [field]: [`That ${field} is taken`] },
      }
    }
    return { success: false, message: 'Failed to onboard' }
  }
}

