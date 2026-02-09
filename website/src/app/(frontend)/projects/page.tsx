import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { ProjectCard } from '@/components/ProjectCard'

export const metadata = {
  title: 'Projects',
  description: 'Explore Near Horizon projects building resilient communities.',
}

export default async function ProjectsPage() {
  const payload = await getPayload({ config: configPromise })

  const projects = await payload.find({
    collection: 'projects',
    limit: 50,
    sort: '-publishedAt',
    where: { _status: { equals: 'published' } },
  })

  return (
    <div className="section-padding page-padding">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-4">Projects</h1>
        <p className="text-lg text-foreground-secondary mb-12 max-w-2xl">
          Solutions we are designing, prototyping, and scaling for community resilience.
        </p>

        {projects.docs.length === 0 ? (
          <p className="text-muted">No projects published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.docs.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
