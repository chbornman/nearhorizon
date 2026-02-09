'use client'

import React from 'react'

type Props = {
  code: string
  language?: string
}

export const Code: React.FC<Props> = ({ code, language = '' }) => {
  if (!code) return null

  return (
    <pre className="bg-elevated p-4 border text-xs border-border rounded overflow-x-auto relative">
      <code data-language={language}>
        {code}
      </code>
    </pre>
  )
}
