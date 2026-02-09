'use client'

import React, { useState } from 'react'
import { PaperPlaneRight } from '@phosphor-icons/react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong.')
      }

      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send message.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="p-8 bg-surface rounded-lg border border-border text-center">
        <h3 className="text-lg font-medium text-foreground mb-2">Message sent</h3>
        <p className="text-foreground-secondary mb-4">
          Thanks for reaching out. We&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm text-primary hover:text-primary-hover transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-surface rounded-lg border border-border">
      <h2 className="font-heading text-2xl text-foreground mb-6">Send a Message</h2>

      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 bg-elevated border border-border rounded-md text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 bg-elevated border border-border rounded-md text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2.5 bg-elevated border border-border rounded-md text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors resize-y"
            placeholder="What's on your mind?"
          />
        </div>
      </div>

      {status === 'error' && (
        <p className="text-sm text-error mb-4">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-medium rounded-md hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
        <PaperPlaneRight size={18} weight="bold" />
      </button>
    </form>
  )
}
