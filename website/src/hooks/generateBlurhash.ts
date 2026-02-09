import { encode } from 'blurhash'
import { decodeBlurHash } from 'fast-blurhash'
import type { CollectionBeforeChangeHook } from 'payload'
import sharp from 'sharp'

/**
 * Generates a blurhash string AND a pre-computed data URL at upload time.
 * The data URL is stored alongside the blurhash so the frontend never needs
 * to decode the blurhash at render time -- it just uses the stored data URL
 * as the blur placeholder directly.
 */
export const generateBlurhash: CollectionBeforeChangeHook = async ({ data, req }) => {
  if (data && typeof data === 'object' && 'mimeType' in data) {
    const mimeType = data.mimeType as string | undefined

    if (mimeType?.startsWith('image/')) {
      try {
        const file = req.file

        if (!file?.data) {
          return data
        }

        const image = sharp(file.data)
        const { data: pixels, info } = await image
          .raw()
          .ensureAlpha()
          .resize(32, 32, { fit: 'inside' })
          .toBuffer({ resolveWithObject: true })

        const blurhash = encode(new Uint8ClampedArray(pixels), info.width, info.height, 4, 4)

        // Pre-compute the data URL so it's ready for the frontend
        const blurhashDataUrl = blurhashToBmpDataUrl(blurhash, 32, 32)

        return {
          ...data,
          blurhash,
          blurhashDataUrl,
        }
      } catch (error) {
        req.payload.logger.error(`Failed to generate blurhash: ${error}`)
      }
    }
  }

  return data
}

/**
 * Converts a blurhash string to a BMP data URL.
 * BMP is used because it doesn't require compression libraries.
 */
function blurhashToBmpDataUrl(blurhash: string, width: number, height: number): string {
  try {
    const pixels = decodeBlurHash(blurhash, width, height)

    const headerSize = 54
    const rowPadding = (4 - ((width * 3) % 4)) % 4
    const pixelDataSize = (width * 3 + rowPadding) * height
    const fileSize = headerSize + pixelDataSize

    const buffer = new ArrayBuffer(fileSize)
    const view = new DataView(buffer)
    const bytes = new Uint8Array(buffer)

    // BMP Header
    view.setUint16(0, 0x4d42, true)
    view.setUint32(2, fileSize, true)
    view.setUint32(10, headerSize, true)

    // DIB Header (BITMAPINFOHEADER)
    view.setUint32(14, 40, true)
    view.setInt32(18, width, true)
    view.setInt32(22, -height, true)
    view.setUint16(26, 1, true)
    view.setUint16(28, 24, true)
    view.setUint32(30, 0, true)
    view.setUint32(34, pixelDataSize, true)

    // Pixel data (RGBA to BGR)
    let offset = headerSize
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4
        bytes[offset++] = pixels[i + 2] // B
        bytes[offset++] = pixels[i + 1] // G
        bytes[offset++] = pixels[i + 0] // R
      }
      for (let p = 0; p < rowPadding; p++) {
        bytes[offset++] = 0
      }
    }

    const base64 = Buffer.from(buffer).toString('base64')
    return `data:image/bmp;base64,${base64}`
  } catch {
    return ''
  }
}
