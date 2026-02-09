import type { Metadata } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import React from 'react'

import { ThemeProvider } from '@/providers/Theme'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '700'],
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: '400',
})

export const metadata: Metadata = {
  title: {
    default: 'Near Horizon',
    template: '%s | Near Horizon',
  },
  description:
    'A physical design and prototyping facility using technology and design to build resilient communities.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerifDisplay.variable}`} suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem('nh-theme-mode');var t=m==='dark'?'dark':m==='light'?'light':window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <ThemeProvider defaultMode="system">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
