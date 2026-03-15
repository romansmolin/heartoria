/** Maps gift_catalog slugs to local image paths and display names */
export const GIFT_ASSET_MAP: Record<string, { imagePath: string; displayName: string }> = {
    roses: { imagePath: '/gifts-1/Rose.png', displayName: 'Rose' },
    tulips: { imagePath: '/gifts-1/Chocolate.png', displayName: 'Chocolate' },
    gerbera: { imagePath: '/gifts-1/Teddy Bear.png', displayName: 'Teddy Bear' },
    lilacs: { imagePath: '/gifts-2/coffee.png', displayName: 'Coffee' },
    freesia: { imagePath: '/gifts-2/flower.png', displayName: 'Flower' },
    dahlias: { imagePath: '/gifts-2/trophy.png', displayName: 'Trophy' },
    hydrangea: { imagePath: '/gifts-2/fire.png', displayName: 'Fire' },
    orhid: { imagePath: '/gifts-3/Bottle.png', displayName: 'Bottle' },
    pions: { imagePath: '/gifts-3/Star.png', displayName: 'Star' },
    ranunculus: { imagePath: '/gifts-3/Tresure.png', displayName: 'Treasure' },
}

/** Only these slugs are available in this project */
export const PROJECT_GIFT_SLUGS = Object.keys(GIFT_ASSET_MAP)

export function isProjectGiftSlug(slug: string): boolean {
    return slug in GIFT_ASSET_MAP
}

/** Reverse lookup: imagePath → displayName */
export const GIFT_DISPLAY_NAME_BY_IMAGE_PATH: Record<string, string> = Object.fromEntries(
    Object.values(GIFT_ASSET_MAP).map((v) => [v.imagePath, v.displayName]),
)
