import { GIFT_ASSET_MAP } from './gift-asset-map'

const DEFAULT_IMAGE = '/gifts-2/gift.png'

/**
 * Resolve image path for a gift.
 * Priority: slug → GIFT_ASSET_MAP → imagePath (if absolute) → default
 */
export function resolveGiftImagePath(slug: string, imagePath?: string): string {
    const mapped = GIFT_ASSET_MAP[slug]
    if (mapped) return mapped.imagePath
    if (imagePath && imagePath.startsWith('/')) return imagePath
    return DEFAULT_IMAGE
}
