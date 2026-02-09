import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  output: 'standalone',
  turbopack: {},
  async rewrites() {
    return [
      {
        source: '/deck',
        destination: '/deck/index.html',
      },
      {
        source: '/deck/:path((?!assets).*)',
        destination: '/deck/index.html',
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
