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
import { PillarTag } from '@/components/PillarTag'
import { ImageLoadingProvider } from '@/contexts/ImageLoadingContext'

const statusLabels: Record<string, string> = {
  concept: 'Concept',
  active: 'Active',
  complete: 'Complete',
}

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const project = result.docs[0]
  if (!project) return { title: 'Not Found' }

  return {
    title: project.title,
    description: project.meta?.description || project.subtitle || undefined,
  }
}

export default async function ProjectPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const project = result.docs[0]
  if (!project) notFound()

  return (
    <ImageLoadingProvider priority>
      <article className="section-padding page-padding">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={14} weight="bold" />
            All Projects
          </Link>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <PillarTag pillar={project.pillar} />
            <span className="text-xs font-medium text-muted px-2 py-1 bg-elevated rounded-full">
              {statusLabels[project.projectStatus] || project.projectStatus}
            </span>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-lg text-foreground-secondary mb-6">{project.subtitle}</p>
          )}

          {project.projectLink && (
            <a
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-accent hover:text-accent-hover transition-colors mb-8"
            >
              Visit Project &rarr;
            </a>
          )}

          {/* Featured image */}
          {project.featuredImage && typeof project.featuredImage === 'object' && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <Media
                resource={project.featuredImage}
                imgClassName="w-full rounded-lg"
                priority
                fetchPriority="high"
                size="(max-width: 768px) 100vw, 896px"
              />
            </div>
          )}

          {/* YouTube embed */}
          {project.youtubeEmbed && (
            <div className="mb-8 aspect-video rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${project.youtubeEmbed}`}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}

          {/* Rich text description */}
          {project.description && <RichText data={project.description} enableGutter={false} />}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-12">
              <h2 className="font-heading text-xl text-foreground mb-6">Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery.map((item, index) => {
                  if (!item.image || typeof item.image !== 'object') return null
                  return (
                    <div key={index} className="rounded-lg overflow-hidden">
                      <Media
                        resource={item.image}
                        imgClassName="w-full rounded-lg"
                        size="(max-width: 768px) 100vw, 448px"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </article>
    </ImageLoadingProvider>
  )
}
