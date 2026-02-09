import React from 'react'
import { MapPin, Envelope, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { ContactForm } from '@/components/ContactForm'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Near Horizon in Lancaster, PA.',
}

export default function ContactPage() {
  return (
    <div className="section-padding page-padding">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-6">Contact</h1>
        <p className="text-lg text-foreground-secondary mb-12 max-w-2xl">
          Interested in collaborating, contributing, or learning more about our work? We&apos;d love
          to hear from you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Location */}
          <div className="p-6 bg-surface rounded-lg border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                <MapPin size={22} weight="duotone" className="text-primary" />
              </div>
              <h2 className="text-lg font-medium text-foreground">Location</h2>
            </div>
            <p className="text-foreground-secondary">Lancaster, PA</p>
            <p className="text-sm text-muted mt-1">
              A hub of innovation in the heart of Pennsylvania Dutch Country.
            </p>
          </div>

          {/* Email */}
          <div className="p-6 bg-surface rounded-lg border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center">
                <Envelope size={22} weight="duotone" className="text-accent" />
              </div>
              <h2 className="text-lg font-medium text-foreground">Email</h2>
            </div>
            <a
              href="mailto:info@nearhorizon.org"
              className="text-primary hover:text-primary-hover transition-colors"
            >
              info@nearhorizon.org
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mb-12">
          <ContactForm />
        </div>

        {/* Get Involved */}
        <div className="p-8 bg-surface rounded-lg border border-border">
          <h2 className="font-heading text-2xl text-foreground mb-4">Get Involved</h2>
          <p className="text-foreground-secondary mb-6 max-w-xl">
            Near Horizon is built by people who want to make a tangible difference. Whether
            you&apos;re an engineer, designer, farmer, community organizer, or just someone who
            cares -- there&apos;s a place for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-medium rounded-md hover:bg-primary-hover transition-colors"
            >
              Explore Projects
              <ArrowRight size={18} weight="bold" />
            </Link>
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-md hover:border-accent hover:text-accent transition-colors"
            >
              Read the Blog
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
