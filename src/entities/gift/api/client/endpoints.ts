import { api } from '@/shared/api/client/api'
import { normalizeError } from '@/shared/api/client/error-normalizer'
import { getGiftCatalog, getGiftInventory, getGiftHistory, buyGift, sendGift } from './services/gift.service'
import type {
    GiftCatalogResponse,
    GiftInventoryResponse,
    GiftHistoryResponse,
    BuyGiftRequest,
    BuyGiftResponse,
    SendGiftRequest,
    SendGiftResponse,
} from '../../model/types'

export const giftApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getGiftCatalog: builder.query<GiftCatalogResponse, void>({
            queryFn: async () => {
                try {
                    const data = await getGiftCatalog()
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return {
                        error: {
                            status: 'CUSTOM_ERROR' as const,
                            data: normalized,
                            error: normalized.message,
                        },
                    }
                }
            },
            providesTags: ['Gift'],
        }),
        getGiftInventory: builder.query<GiftInventoryResponse, void>({
            queryFn: async () => {
                try {
                    const data = await getGiftInventory()
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return {
                        error: {
                            status: 'CUSTOM_ERROR' as const,
                            data: normalized,
                            error: normalized.message,
                        },
                    }
                }
            },
            providesTags: ['Gift'],
        }),
        getGiftHistory: builder.query<GiftHistoryResponse, void>({
            queryFn: async () => {
                try {
                    const data = await getGiftHistory()
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return {
                        error: {
                            status: 'CUSTOM_ERROR' as const,
                            data: normalized,
                            error: normalized.message,
                        },
                    }
                }
            },
            providesTags: ['Gift'],
        }),
        buyGift: builder.mutation<BuyGiftResponse, BuyGiftRequest>({
            queryFn: async (request) => {
                try {
                    const data = await buyGift(request)
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return {
                        error: {
                            status: 'CUSTOM_ERROR' as const,
                            data: normalized,
                            error: normalized.message,
                        },
                    }
                }
            },
            invalidatesTags: ['Gift', 'Wallet'],
        }),
        sendGift: builder.mutation<SendGiftResponse, SendGiftRequest>({
            queryFn: async (request) => {
                try {
                    const data = await sendGift(request)
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return {
                        error: {
                            status: 'CUSTOM_ERROR' as const,
                            data: normalized,
                            error: normalized.message,
                        },
                    }
                }
            },
            invalidatesTags: ['Gift'],
        }),
    }),
})

export const {
    useGetGiftCatalogQuery,
    useGetGiftInventoryQuery,
    useGetGiftHistoryQuery,
    useBuyGiftMutation,
    useSendGiftMutation,
} = giftApi
