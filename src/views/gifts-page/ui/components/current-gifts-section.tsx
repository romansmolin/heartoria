'use client'

import { Skeleton } from '@/shared/ui/skeleton'
import { useGetGiftInventoryQuery } from '@/entities/gift'
import { CurrentGiftCard } from './current-gift-card'

export function CurrentGiftsSection() {
    const { data, isLoading, isError } = useGetGiftInventoryQuery()

    const gifts = [...(data?.items ?? [])].sort((a, b) => b.quantity - a.quantity)

    if (isLoading) {
        return (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="aspect-square rounded-xl" />
                ))}
            </div>
        )
    }

    if (isError) {
        return <p className="text-sm text-red-500">Failed to load inventory.</p>
    }

    if (gifts.length === 0) {
        return <p className="text-sm text-muted-foreground">You don&apos;t own any gifts yet.</p>
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {gifts.map((gift) => (
                <CurrentGiftCard key={gift.giftId} gift={gift} />
            ))}
        </div>
    )
}
