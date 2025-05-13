// components/ManagePortalButton.tsx
'use client'

import { useState } from 'react'
import Button from './ui/Button'

export default function ManagePortalButton() {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    const res = await fetch('/api/billing/portal', {
      method: 'POST',
      credentials: 'include',        // <— ensure the auth cookie is sent
    })

    if (!res.ok) {
      // Un‑grey the button and show an error
      setLoading(false)
      const { error } = await res.json().catch(() => ({}))
      alert(error || 'Failed to open billing portal')
      return
    }

    const { url } = await res.json()
    window.location.href = url
  }

  return (
    <div className="mt-6">
      <Button onClick={handleClick} disabled={loading}>
        {loading ? 'Loading…' : 'Manage Subscription'}
      </Button>
    </div>
  )
}

