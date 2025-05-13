export const ISSUE_STATUS = {
  open: { value: 'open', label: 'Open' } as const,
  in_progress: { value: 'in_progress', label: 'In Progress' } as const,
  resolved: { value: 'resolved', label: 'Resolved' } as const,
  closed: { value: 'closed', label: 'Closed' } as const,
}

export const ISSUE_PRIORITY = {
  low: { value: 'low', label: 'Low' } as const,
  medium: { value: 'medium', label: 'Medium' } as const,
  high: { value: 'high', label: 'High' } as const,
}

export type Status = keyof typeof ISSUE_STATUS
export type Priority = keyof typeof ISSUE_PRIORITY

