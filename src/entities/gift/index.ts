export type {
    GiftCatalogItem,
    GiftCatalogResponse,
    GiftInventoryItem,
    GiftInventoryResponse,
    GiftHistoryItem,
    GiftHistoryResponse,
    ReceivedGiftItem,
    ReceivedGiftsResponse,
    BuyGiftRequest,
    BuyGiftResponse,
    SendGiftRequest,
    SendGiftResponse,
} from './model/types'

export {
    useGetGiftCatalogQuery,
    useGetGiftInventoryQuery,
    useGetReceivedGiftsQuery,
    useGetGiftHistoryQuery,
    useBuyGiftMutation,
    useSendGiftMutation,
} from './api/client/endpoints'

export { resolveGiftImagePath } from './lib/resolve-gift-image-path'
export { resolveGiftDisplayName } from './lib/resolve-gift-display-name'
export { GIFT_ASSET_MAP, PROJECT_GIFT_SLUGS, isProjectGiftSlug } from './lib/gift-asset-map'
