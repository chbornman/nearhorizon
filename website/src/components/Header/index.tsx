import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto page-padding flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-heading text-xl text-primary hover:text-primary-hover transition-colors"
        >
          Near Horizon
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <Link
              href="/projects"
              className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/posts"
              className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
