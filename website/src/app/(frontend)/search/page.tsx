import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'

export const metadata = {
  title: 'Search',
  description: 'Search Near Horizon projects and posts.',
}

type Args = {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: Args) {
  const { q } = await searchParams
  const payload = await getPayload({ config: configPromise })

  let results: Array<{ id: string | number; title: string; slug?: string; relationTo?: string }> =
    []

  if (q) {
    const searchResults = await payload.find({
      collection: 'search',
      where: {
        title: {
          like: q,
        },
      },
      limit: 20,
    })

    results = searchResults.docs.map((doc) => ({
      id: doc.id,
      title: doc.title || '',
      slug: 'slug' in doc ? (doc.slug as string) : undefined,
      relationTo: doc.doc?.relationTo,
    }))
  }

  return (
    <div className="section-padding page-padding">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-8">Search</h1>

        <form action="/search" method="GET" className="mb-12">
          <input
            name="q"
            type="text"
            defaultValue={q || ''}
            placeholder="Search projects and posts..."
            className="w-full px-4 py-3 bg-surface border border-border rounded-md text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
          />
        </form>

        {q && (
          <p className="text-sm text-muted mb-8">
            {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{q}&rdquo;
          </p>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            {results.map((result) => {
              const href =
                result.relationTo === 'posts'
                  ? `/posts/${result.slug}`
                  : `/projects/${result.slug}`

              return (
                <Link
                  key={result.id}
                  href={href}
                  className="group block p-4 bg-surface rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-accent capitalize">
                      {result.relationTo === 'posts' ? 'Post' : 'Project'}
                    </span>
                    <span className="text-xs text-muted">&middot;</span>
                    <span className="text-foreground group-hover:text-primary transition-colors">
                      {result.title}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {q && results.length === 0 && (
          <p className="text-muted">No results found. Try a different search term.</p>
        )}
      </div>
    </div>
  )
}
