import Link from 'next/link'
import React from 'react'
import type { Project } from '@/payload-types'
import { Media } from '@/components/Media'
import { PillarTag } from '@/components/PillarTag'

const statusLabels: Record<string, string> = {
  concept: 'Concept',
  active: 'Active',
  complete: 'Complete',
}

const statusColors: Record<string, string> = {
  concept: 'text-muted',
  active: 'text-primary',
  complete: 'text-success',
}

type Props = {
  project: Project
}

export const ProjectCard: React.FC<Props> = ({ project }) => {
  const { title, subtitle, slug, pillar, projectStatus, featuredImage } = project

  return (
    <Link
      href={`/projects/${slug}`}
      className="group block bg-surface rounded-lg border border-border hover:border-primary transition-colors overflow-hidden"
    >
      {featuredImage && typeof featuredImage === 'object' && (
        <div className="aspect-video relative overflow-hidden">
          <Media
            resource={featuredImage}
            imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            fill
            size="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <PillarTag pillar={pillar} />
          <span className="text-xs text-muted">&middot;</span>
          <span className={`text-xs font-medium ${statusColors[projectStatus] || 'text-muted'}`}>
            {statusLabels[projectStatus] || projectStatus}
          </span>
        </div>
        <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        {subtitle && <p className="text-sm text-foreground-secondary mt-2">{subtitle}</p>}
      </div>
    </Link>
  )
}
