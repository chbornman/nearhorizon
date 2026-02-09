export const dynamic = 'force-dynamic'

import React from 'react'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { ImageLoadingProvider } from '@/contexts/ImageLoadingContext'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const post = result.docs[0]
  if (!post) return { title: 'Not Found' }

  return {
    title: post.title,
    description: post.meta?.description || undefined,
  }
}

export default async function PostPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const post = result.docs[0]
  if (!post) notFound()

  return (
    <ImageLoadingProvider priority>
      <article className="section-padding page-padding">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/posts"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={14} weight="bold" />
            All Posts
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-4">{post.title}</h1>
          {post.publishedAt && (
            <time className="text-sm text-muted block mb-8">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}

          {/* Hero image */}
          {post.heroImage && typeof post.heroImage === 'object' && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <Media
                resource={post.heroImage}
                imgClassName="w-full rounded-lg"
                priority
                fetchPriority="high"
                size="(max-width: 768px) 100vw, 896px"
              />
            </div>
          )}

          {/* Rich text content */}
          {post.content && <RichText data={post.content} enableGutter={false} />}
        </div>
      </article>
    </ImageLoadingProvider>
  )
}
