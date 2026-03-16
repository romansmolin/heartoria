'use client'

import { Gift } from 'lucide-react'
import { Skeleton } from '@/shared/ui/skeleton'
import { useGetReceivedGiftsQuery } from '@/entities/gift'
import { resolveGiftImagePath } from '@/entities/gift'

export function ReceivedGiftsSection() {
    const { data, isLoading, isError } = useGetReceivedGiftsQuery()

    const gifts = data?.items ?? []

    if (isLoading) {
        return (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-48 rounded-xl" />
                ))}
            </div>
        )
    }

    if (isError) {
        return <p className="text-sm text-destructive">Failed to load received gifts.</p>
    }

    if (gifts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-16">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Gift className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium">No gifts received yet</p>
                <p className="mt-1 text-xs text-muted-foreground">
                    Gifts from your matches will appear here.
                </p>
            </div>
        )
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {gifts.map((gift) => (
                <div
                    key={gift.id}
                    className="group overflow-hidden rounded-xl border bg-card transition-colors hover:bg-muted/30"
                >
                    <div className="relative aspect-square bg-muted/20 p-6">
                        <img
                            src={gift.giftImagePath}
                            alt={gift.giftName}
                            className="h-full w-full object-contain transition-transform group-hover:scale-105"
                            onError={(e) => {
                                ;(e.target as HTMLImageElement).style.opacity = '0.3'
                            }}
                        />
                    </div>
                    <div className="border-t p-3">
                        <h3 className="text-sm font-medium">{gift.giftName}</h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                            {new Date(gift.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
