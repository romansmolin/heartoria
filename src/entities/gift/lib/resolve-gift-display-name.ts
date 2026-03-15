import { GIFT_ASSET_MAP } from './gift-asset-map'

/**
 * Resolve display name for a gift.
 * Priority: slug → GIFT_ASSET_MAP → fallbackName → "Gift"
 */
export function resolveGiftDisplayName(slug: string, fallbackName?: string): string {
    const mapped = GIFT_ASSET_MAP[slug]
    if (mapped) return mapped.displayName
    return fallbackName ?? 'Gift'
}
