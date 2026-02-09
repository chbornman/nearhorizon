import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  output: 'standalone',
  turbopack: {},
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
