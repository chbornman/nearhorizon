'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'
import { useImageLoading } from '@/contexts/ImageLoadingContext'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    size: sizeFromProps,
  } = props

  const { priority } = useImageLoading()

  const size = sizeFromProps || 'medium'

  let caption
  if (media && typeof media === 'object') caption = media.caption

  const aspectRatio =
    media && typeof media === 'object' && media.width && media.height
      ? media.width / media.height
      : 1
  const isVeryHorizontal = aspectRatio >= 1.2

  const getSizeClasses = () => {
    if (isVeryHorizontal) {
      switch (size) {
        case 'small':
          return 'mx-auto w-full sm:max-w-md'
        case 'medium':
          return 'mx-auto w-full sm:max-w-2xl'
        case 'large':
          return 'mx-auto w-full sm:max-w-4xl'
        case 'extended':
          return 'mx-auto w-full sm:max-w-4xl md:mx-0 md:w-[calc(100vw-8rem)] lg:w-[calc(100vw-12rem)] md:max-w-5xl lg:max-w-6xl md:relative md:left-1/2 md:-translate-x-1/2'
        default:
          return 'mx-auto w-full sm:max-w-2xl'
      }
    } else {
      switch (size) {
        case 'small':
          return 'mx-auto max-w-[240px] sm:max-w-xs'
        case 'medium':
          return 'mx-auto max-w-[280px] sm:max-w-sm md:max-w-md'
        case 'large':
          return 'mx-auto max-w-[320px] sm:max-w-md md:max-w-lg lg:max-w-xl'
        case 'extended':
          return 'mx-auto w-full max-w-[360px] sm:max-w-lg md:mx-0 md:max-w-xl lg:max-w-2xl xl:max-w-3xl md:relative md:left-1/2 md:-translate-x-1/2'
        default:
          return 'mx-auto max-w-[280px] sm:max-w-md'
      }
    }
  }

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(media || staticImage) && (
        <div className={cn(getSizeClasses())}>
          <Media
            imgClassName={cn('rounded-[0.8rem]', imgClassName)}
            resource={media}
            src={staticImage}
            size="80rem"
            priority={priority}
            fetchPriority={priority ? 'high' : undefined}
          />
        </div>
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
