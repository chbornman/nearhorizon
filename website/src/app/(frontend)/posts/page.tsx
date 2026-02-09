export const dynamic = 'force-dynamic'

import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { PostCard } from '@/components/PostCard'

export const metadata = {
  title: 'Blog',
  description: 'Updates and insights from Near Horizon.',
}

export default async function PostsPage() {
  let posts = { docs: [] as any[] }

  try {
    const payload = await getPayload({ config: configPromise })
    posts = await payload.find({
      collection: 'posts',
      limit: 20,
      sort: '-publishedAt',
      where: { _status: { equals: 'published' } },
    })
  } catch {
    // Database tables may not exist yet on first deploy
  }

  return (
    <div className="section-padding page-padding">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-4">Blog</h1>
        <p className="text-lg text-foreground-secondary mb-12 max-w-2xl">
          Updates, research, and insights from the lab.
        </p>

        {posts.docs.length === 0 ? (
          <p className="text-muted">No posts published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.docs.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
