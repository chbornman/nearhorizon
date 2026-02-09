export const dynamic = 'force-dynamic'

import Link from 'next/link'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { ProjectCard } from '@/components/ProjectCard'
import { PostCard } from '@/components/PostCard'
import {
  Lightning,
  Plant,
  Globe,
  Tree,
  HandHeart,
} from '@phosphor-icons/react/dist/ssr'

const pillars = [
  { name: 'Energy Independence', icon: Lightning, pillar: 'energy' },
  { name: 'Food Security', icon: Plant, pillar: 'food' },
  { name: 'Carbon Neutrality', icon: Globe, pillar: 'carbon' },
  { name: 'Ecological Regeneration', icon: Tree, pillar: 'ecology' },
  { name: 'Thriving Communities', icon: HandHeart, pillar: 'community' },
]

export default async function HomePage() {
  let projects = { docs: [] as any[] }
  let posts = { docs: [] as any[] }

  try {
    const payload = await getPayload({ config: configPromise })
    const [p, b] = await Promise.all([
      payload.find({
        collection: 'projects',
        limit: 3,
        sort: '-publishedAt',
        where: { _status: { equals: 'published' } },
      }),
      payload.find({
        collection: 'posts',
        limit: 3,
        sort: '-publishedAt',
        where: { _status: { equals: 'published' } },
      }),
    ])
    projects = p
    posts = b
  } catch {
    // Database tables may not exist yet on first deploy
  }

  return (
    <div>
      {/* Hero */}
      <section className="section-padding page-padding relative overflow-hidden">
        {/* Monogram watermark */}
        <svg
          viewBox="0 0 130 100"
          className="monogram-watermark absolute -right-12 top-1/2 -translate-y-1/2 h-[28rem] md:h-[36rem] lg:h-[44rem] w-auto pointer-events-none select-none"
          style={{ fill: 'var(--primary)' }}
          aria-hidden="true"
        >
          <rect x="8" y="8" width="11" height="84" />
          <polygon points="8,8 19,8 66,84 66,92 55,92 8,16" />
          <rect x="55" y="8" width="11" height="84" />
          <rect x="55" y="42" width="56" height="11" />
          <rect x="100" y="8" width="11" height="84" />
        </svg>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 max-w-3xl">
            Building resilient communities through technology and design
          </h1>
          <p className="text-lg md:text-xl text-foreground-secondary max-w-2xl mb-8">
            We test and scale appropriate solutions for the challenges communities face today.
            Local, practical, achievable -- and reaching far into the distance.
          </p>
          <div className="flex gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 bg-primary text-on-primary font-medium rounded-md hover:bg-primary-hover transition-colors"
            >
              View Projects
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 border border-border text-foreground font-medium rounded-md hover:border-accent hover:text-accent transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="section-padding page-padding bg-surface">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-2xl text-foreground mb-8">Resilience Pillars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.name}
                  className="p-5 bg-background rounded-lg border border-border flex flex-col items-center text-center gap-3"
                >
                  <Icon size={28} weight="duotone" className="text-primary" />
                  <span className="text-sm font-medium text-foreground">{pillar.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {projects.docs.length > 0 && (
        <section className="section-padding page-padding">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl text-foreground">Recent Projects</h2>
              <Link
                href="/projects"
                className="text-sm text-accent hover:text-accent-hover transition-colors"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.docs.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Posts */}
      {posts.docs.length > 0 && (
        <section className="section-padding page-padding bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl text-foreground">Latest Posts</h2>
              <Link
                href="/posts"
                className="text-sm text-accent hover:text-accent-hover transition-colors"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.docs.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
