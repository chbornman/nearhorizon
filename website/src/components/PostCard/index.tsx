import Link from 'next/link'
import React from 'react'
import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'

type Props = {
  post: Post
}

export const PostCard: React.FC<Props> = ({ post }) => {
  const { title, slug, meta, heroImage, publishedAt } = post

  return (
    <Link
      href={`/posts/${slug}`}
      className="group block bg-surface rounded-lg border border-border hover:border-primary transition-colors overflow-hidden"
    >
      {heroImage && typeof heroImage === 'object' && (
        <div className="aspect-video relative overflow-hidden">
          <Media
            resource={heroImage}
            imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            fill
            size="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        {meta?.description && (
          <p className="text-sm text-foreground-secondary mt-2 line-clamp-2">{meta.description}</p>
        )}
        {publishedAt && (
          <time className="text-xs text-muted mt-3 block">
            {new Date(publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        )}
      </div>
    </Link>
  )
}
