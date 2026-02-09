import Link from 'next/link'
import React from 'react'
import {
  Lightning,
  Plant,
  Globe,
  Tree,
  HandHeart,
} from '@phosphor-icons/react/dist/ssr'

const pillars = [
  { name: 'Energy Independence', icon: Lightning },
  { name: 'Food Security', icon: Plant },
  { name: 'Carbon Neutrality', icon: Globe },
  { name: 'Ecological Regeneration', icon: Tree },
  { name: 'Thriving Communities', icon: HandHeart },
]

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto page-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-lg text-foreground mb-3">Near Horizon</h3>
            <p className="text-sm text-foreground-secondary">
              Technology and design for resilient communities.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Resilience Pillars</h3>
            <ul className="space-y-2 text-sm text-foreground-secondary">
              {pillars.map((pillar) => {
                const Icon = pillar.icon
                return (
                  <li key={pillar.name} className="flex items-center gap-2">
                    <Icon size={16} weight="duotone" className="text-primary" />
                    {pillar.name}
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/projects"
                  className="text-foreground-secondary hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/posts"
                  className="text-foreground-secondary hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-foreground-secondary hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-foreground-secondary hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border text-sm text-muted">
          Near Horizon &middot; Lancaster, PA
        </div>
      </div>
    </footer>
  )
}
