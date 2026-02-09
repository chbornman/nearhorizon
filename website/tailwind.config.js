import typography from '@tailwindcss/typography'
import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        elevated: 'var(--elevated)',
        hover: 'var(--hover)',

        foreground: 'var(--foreground)',
        'foreground-secondary': 'var(--foreground-secondary)',
        muted: 'var(--muted)',
        'on-primary': 'var(--on-primary)',
        'on-accent': 'var(--on-accent)',

        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        'primary-light': 'var(--primary-light)',
        'primary-muted': 'var(--primary-muted)',

        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-light': 'var(--accent-light)',
        'accent-muted': 'var(--accent-muted)',

        border: 'var(--border)',
        'border-secondary': 'var(--border-secondary)',
        'border-active': 'var(--border-active)',

        success: 'var(--success)',
        error: 'var(--error)',
        warning: 'var(--warning)',
        info: 'var(--info)',

        'pillar-energy-bg': 'var(--pillar-energy-bg)',
        'pillar-energy-text': 'var(--pillar-energy-text)',
        'pillar-food-bg': 'var(--pillar-food-bg)',
        'pillar-food-text': 'var(--pillar-food-text)',
        'pillar-carbon-bg': 'var(--pillar-carbon-bg)',
        'pillar-carbon-text': 'var(--pillar-carbon-text)',
        'pillar-ecology-bg': 'var(--pillar-ecology-bg)',
        'pillar-ecology-text': 'var(--pillar-ecology-text)',
        'pillar-community-bg': 'var(--pillar-community-bg)',
        'pillar-community-text': 'var(--pillar-community-text)',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        sans: ['var(--font-sans)'],
      },
    },
  },
  plugins: [typography, animate],
}
