import { getClientSideURL } from '@/utilities/getURL'

/**
 * Processes media resource URL to ensure proper formatting
 */
export const getMediaUrl = (url: string | null | undefined): string => {
  if (!url) return ''

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  // In development, use relative URLs to avoid hydration mismatches
  if (process.env.NODE_ENV === 'development') {
    return url
  }

  const baseUrl = getClientSideURL()
  return `${baseUrl}${url}`
}
