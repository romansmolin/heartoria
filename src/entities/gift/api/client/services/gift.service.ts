import { apiClient } from '@/shared/api/client/axios.config'
import type {
    GiftCatalogResponse,
    GiftInventoryResponse,
    GiftHistoryResponse,
    BuyGiftRequest,
    BuyGiftResponse,
    SendGiftRequest,
    SendGiftResponse,
} from '../../../model/types'

export async function getGiftCatalog(): Promise<GiftCatalogResponse> {
    const response = await apiClient.get<GiftCatalogResponse>('/api/gifts/catalog')
    return response.data
}

export async function getGiftInventory(): Promise<GiftInventoryResponse> {
    const response = await apiClient.get<GiftInventoryResponse>('/api/gifts/inventory')
    return response.data
}

export async function getGiftHistory(): Promise<GiftHistoryResponse> {
    const response = await apiClient.get<GiftHistoryResponse>('/api/gifts/history')
    return response.data
}

export async function buyGift(data: BuyGiftRequest): Promise<BuyGiftResponse> {
    const response = await apiClient.post<BuyGiftResponse>('/api/gifts/buy', data)
    return response.data
}

export async function sendGift(data: SendGiftRequest): Promise<SendGiftResponse> {
    const response = await apiClient.post<SendGiftResponse>('/api/gifts/send', data)
    return response.data
}
