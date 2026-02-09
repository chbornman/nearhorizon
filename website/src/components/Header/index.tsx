import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center h-16">
        {/* Left: Theme toggle */}
        <div className="flex-1 flex items-center">
          <ThemeToggle />
        </div>

        {/* Center: Title */}
        <Link
          href="/"
          className="font-heading text-2xl md:text-3xl text-primary hover:text-primary-hover transition-colors"
        >
          Near Horizon
        </Link>

        {/* Right: Nav */}
        <div className="flex-1 flex items-center justify-end">
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
        </div>
      </div>

      {/* Horizon gradient */}
      <div
        className="h-[2px]"
        style={{
          background: 'linear-gradient(to right, transparent, var(--accent), transparent)',
        }}
      />
    </header>
  )
}
