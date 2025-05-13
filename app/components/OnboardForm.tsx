'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { onboardClient, OnboardResponse } from '@/app/actions/onboard'
import Button from './ui/Button'
import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormError,
} from './ui/Form'

const initialState: OnboardResponse = {
  success: false,
  message: '',
  errors: {},
}

export default function OnboardForm() {
  const router = useRouter()

  const [state, formAction, isPending] = useActionState<
    OnboardResponse,
    FormData
  >(async (_, formData) => {
    const result = await onboardClient(formData)
    if (result.success && result.clientId) {
      router.push(`/billing?clientId=${result.clientId}`)
    }
    return result
  }, initialState)

  return (
    <Form action={formAction} className="max-w-md mx-auto space-y-6 p-6 bg-background dark:bg-dark-elevated rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center dark:text-white">Create Your Account</h2>

      {state.message && (
        <FormError className={`mb-4 ${state.success ? 'bg-green-100 text-green-800 border-green-300' : ''}`}>
          {state.message}
        </FormError>
      )}

      <FormGroup>
        <FormLabel htmlFor="clientName">Company Name</FormLabel>
        <FormInput
          id="clientName"
          name="clientName"
          placeholder="Your company or team"
          required
          disabled={isPending}
          className={state.errors?.clientName ? 'border-red-500' : ''}
        />
        {state.errors?.clientName && (
          <p className="text-sm text-red-500">{state.errors.clientName[0]}</p>
        )}
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="email">Your Email</FormLabel>
        <FormInput
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          disabled={isPending}
          className={state.errors?.email ? 'border-red-500' : ''}
        />
        {state.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email[0]}</p>
        )}
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="password">Password</FormLabel>
        <FormInput
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          minLength={6}
          disabled={isPending}
          className={state.errors?.password ? 'border-red-500' : ''}
        />
        {state.errors?.password && (
          <p className="text-sm text-red-500">{state.errors.password[0]}</p>
        )}
      </FormGroup>

      <div className="flex justify-end">
        <Button type="submit" isLoading={isPending} className="w-full">
          Get Started
        </Button>
      </div>
    </Form>
  )
}

