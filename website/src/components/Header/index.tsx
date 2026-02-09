'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { List, X } from '@phosphor-icons/react'

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/posts', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      {/* Desktop header */}
      <div className="hidden md:flex max-w-7xl mx-auto items-center h-16">
        {/* Left: Theme toggle */}
        <div className="flex-1 flex items-center">
          <ThemeToggle />
        </div>

        {/* Center: Title */}
        <Link
          href="/"
          className="font-heading text-3xl text-primary hover:text-primary-hover transition-colors"
        >
          Near Horizon
        </Link>

        {/* Right: Nav */}
        <div className="flex-1 flex items-center justify-end">
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile header */}
      <div className="flex md:hidden items-center h-14 px-4">
        {/* Left: Theme toggle */}
        <div className="flex-1 flex items-center">
          <ThemeToggle />
        </div>

        {/* Center: Title */}
        <Link
          href="/"
          className="font-heading text-xl text-primary hover:text-primary-hover transition-colors"
        >
          Near Horizon
        </Link>

        {/* Right: Hamburger */}
        <div className="flex-1 flex items-center justify-end">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-foreground-secondary hover:text-foreground transition-colors p-1"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-foreground-secondary hover:text-foreground transition-colors py-2 text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

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
