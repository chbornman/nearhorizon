'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import NextImage from 'next/image'
import React from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    pictureClassName,
    imgClassName,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
    fetchPriority,
    onLoad,
  } = props

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''
  let blurhashDataUrl: string | undefined
  let srcSet: string | undefined

  if (!src && resource && typeof resource === 'object') {
    const { alt: altFromResource, height: fullHeight, url, width: fullWidth } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource || ''

    // Use pre-computed data URL from upload hook (no runtime decode needed)
    blurhashDataUrl =
      'blurhashDataUrl' in resource ? (resource.blurhashDataUrl as string | undefined) : undefined

    // Build srcset from Payload's generated image sizes
    if ('sizes' in resource && resource.sizes) {
      const payloadSizes = resource.sizes as Record<
        string,
        { url?: string | null; width?: number | null; height?: number | null }
      >

      const srcsetEntries = Object.entries(payloadSizes)
        .filter(([, size]) => size.url && size.width)
        .map(([, size]) => `${getMediaUrl(size.url!)} ${size.width}w`)
        .sort((a, b) => {
          const widthA = parseInt(a.split(' ')[1])
          const widthB = parseInt(b.split(' ')[1])
          return widthA - widthB
        })

      srcSet = srcsetEntries.length > 0 ? srcsetEntries.join(', ') : undefined

      // Use 'large' size as the src fallback
      src = payloadSizes.large?.url
        ? getMediaUrl(payloadSizes.large.url)
        : payloadSizes.medium?.url
          ? getMediaUrl(payloadSizes.medium.url)
          : getMediaUrl(url)
    } else {
      src = getMediaUrl(url)
    }
  }

  const loading = loadingFromProps || (!priority ? 'lazy' : undefined)

  const sizes = sizeFromProps
    ? sizeFromProps
    : '(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px'

  // Use native img when we have manual srcset (Payload-optimized images)
  if (srcSet) {
    const imgStyle = fill
      ? {
          position: 'absolute' as const,
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover' as const,
        }
      : undefined

    const pictureStyle = blurhashDataUrl
      ? {
          backgroundImage: `url(${blurhashDataUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      : undefined

    return (
      <picture
        className={cn(pictureClassName, imgClassName, 'overflow-hidden')}
        style={pictureStyle}
      >
        <img
          alt={alt || ''}
          className={cn(imgClassName)}
          src={src as string}
          srcSet={srcSet}
          sizes={sizes}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          loading={loading}
          style={imgStyle}
          fetchPriority={fetchPriority}
          onLoad={onLoad}
        />
      </picture>
    )
  }

  // Fall back to Next.js Image for static imports or when no srcset
  return (
    <picture className={cn(pictureClassName, imgClassName, 'overflow-hidden')}>
      <NextImage
        alt={alt || ''}
        className={cn(imgClassName)}
        fill={fill}
        height={!fill ? height : undefined}
        priority={priority}
        loading={loading}
        placeholder={blurhashDataUrl ? 'blur' : undefined}
        blurDataURL={blurhashDataUrl}
        sizes={sizes}
        src={src}
        width={!fill ? width : undefined}
        onLoad={onLoad}
      />
    </picture>
  )
}
