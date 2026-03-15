'use client'

import { Skeleton } from '@/shared/ui/skeleton'
import { useGetGiftCatalogQuery } from '@/entities/gift'
import { useBuyGift } from '@/features/gifts/buy-gift'
import { GiftShopCard, getTier } from './gift-shop-card'

interface GiftShopSectionProps {
    activeCategory: string | null
}

export function GiftShopSection({ activeCategory }: GiftShopSectionProps) {
    const { data, isLoading, isError } = useGetGiftCatalogQuery()
    const { buyingGiftId, handleBuyGift } = useBuyGift()

    const allGifts = data?.items ?? []
    const gifts = activeCategory
        ? allGifts.filter((g) => getTier(g.priceCoins) === activeCategory)
        : allGifts

    if (isLoading) {
        return (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="space-y-3">
                        <Skeleton className="aspect-square rounded-2xl" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                ))}
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-16">
                <p className="text-sm text-muted-foreground">Failed to load gift catalog.</p>
            </div>
        )
    }

    if (gifts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-16">
                <p className="text-sm text-muted-foreground">No gifts in this category.</p>
            </div>
        )
    }

    return (
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {gifts.map((gift) => (
                <GiftShopCard
                    key={gift.id}
                    gift={gift}
                    isBuying={buyingGiftId === gift.id}
                    onBuy={handleBuyGift}
                />
            ))}
        </div>
    )
}
