import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { useBuyGiftMutation } from '@/entities/gift'
import type { GiftCatalogItem } from '@/entities/gift'

export function useBuyGift() {
    const [buyGift, { isLoading }] = useBuyGiftMutation()
    const [buyingGiftId, setBuyingGiftId] = useState<string | null>(null)

    const handleBuyGift = useCallback(
        async (gift: GiftCatalogItem) => {
            setBuyingGiftId(gift.id)
            try {
                const result = await buyGift({ giftId: gift.id }).unwrap()
                toast.success(`${gift.name} purchased! Balance: ${result.remainingBalance} credits`)
            } catch {
                toast.error('Failed to purchase gift.')
            } finally {
                setBuyingGiftId(null)
            }
        },
        [buyGift],
    )

    return {
        buyingGiftId,
        isBuying: isLoading,
        handleBuyGift,
    }
}
