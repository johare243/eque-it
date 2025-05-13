'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import type { Issue } from '@prisma/client'
import { Priority, Status } from '@/lib/types'
import { ISSUE_STATUS, ISSUE_PRIORITY } from '@/lib/constants'
import Button from './ui/Button'
import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  FormError,
} from './ui/Form'
import { createIssue, updateIssue, ActionResponse } from '@/app/actions/issues'

interface IssueFormProps {
  issue?: Issue
  userId: string
  isEditing?: boolean
}

const initialState: ActionResponse = {
  success: false,
  message: '',
  errors: undefined,
}

export default function IssueForm({
  issue,
  userId,
  isEditing = false,
}: IssueFormProps) {
  const router = useRouter()

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (_, formData) => {
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      status: formData.get('status') as Status,
      priority: formData.get('priority') as Priority,
    }

    const result = isEditing
      ? await updateIssue(issue!.id, data)
      : await createIssue(data)

    if (result.success) {
      router.refresh()
      if (!isEditing) router.push('/dashboard')
    }

    return result
  }, initialState)

  const statusOptions = Object.values(ISSUE_STATUS)
  const priorityOptions = Object.values(ISSUE_PRIORITY)

  return (
    <Form action={formAction}>
      {state.message && (
        <FormError className={`mb-4 ${state.success ? 'bg-green-100 text-green-800 border-green-300' : ''}`}>
          {state.message}
        </FormError>
      )}

      <FormGroup>
        <FormLabel htmlFor="title">Title</FormLabel>
        <FormInput
          id="title"
          name="title"
          defaultValue={issue?.title}
          required
          minLength={3}
          maxLength={100}
          disabled={isPending}
          className={state.errors?.title ? 'border-red-500' : ''}
        />
        {state.errors?.title && <p className="text-sm text-red-500">{state.errors.title[0]}</p>}
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="description">Description</FormLabel>
        <FormTextarea
          id="description"
          name="description"
          rows={4}
          defaultValue={issue?.description || ''}
          disabled={isPending}
          className={state.errors?.description ? 'border-red-500' : ''}
        />
        {state.errors?.description && <p className="text-sm text-red-500">{state.errors.description[0]}</p>}
      </FormGroup>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormGroup>
          <FormLabel htmlFor="status">Status</FormLabel>
          <FormSelect
            id="status"
            name="status"
            defaultValue={issue?.status || statusOptions[0].value}
            options={statusOptions}
            disabled={isPending}
            required
            className={state.errors?.status ? 'border-red-500' : ''}
          />
          {state.errors?.status && <p className="text-sm text-red-500">{state.errors.status[0]}</p>}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="priority">Priority</FormLabel>
          <FormSelect
            id="priority"
            name="priority"
            defaultValue={issue?.priority || priorityOptions[1].value}
            options={priorityOptions}
            disabled={isPending}
            required
            className={state.errors?.priority ? 'border-red-500' : ''}
          />
          {state.errors?.priority && <p className="text-sm text-red-500">{state.errors.priority[0]}</p>}
        </FormGroup>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button type="button" variant="ghost" onClick={() => router.back()} disabled={isPending}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isPending}>
          {isEditing ? 'Update Issue' : 'Create Issue'}
        </Button>
      </div>
    </Form>
  )
}

