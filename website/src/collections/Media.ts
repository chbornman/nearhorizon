import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { generateBlurhash } from '../hooks/generateBlurhash'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    beforeChange: [generateBlurhash],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    {
      name: 'blurhash',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Auto-generated blur hash for image placeholder',
      },
    },
    {
      name: 'blurhashDataUrl',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Pre-computed data URL from blurhash for instant blur placeholders',
      },
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    formatOptions: {
      format: 'webp',
      options: {
        quality: 85,
      },
    },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
      {
        name: 'square',
        width: 500,
        height: 500,
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
      {
        name: 'small',
        width: 600,
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
      {
        name: 'medium',
        width: 900,
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
      {
        name: 'large',
        width: 1400,
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
      {
        name: 'xlarge',
        width: 1920,
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
    ],
  },
}
