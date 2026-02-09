import Link from 'next/link'
import React from 'react'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'

export default function NotFound() {
  return (
    <div className="section-padding page-padding flex flex-col items-center justify-center min-h-[50vh]">
      <h1 className="font-heading text-4xl text-foreground mb-4">404</h1>
      <p className="text-muted mb-8">This page could not be found.</p>
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-hover transition-colors"
      >
        <ArrowLeft size={14} weight="bold" />
        Back to home
      </Link>
    </div>
  )
}
