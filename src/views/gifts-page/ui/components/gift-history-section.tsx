'use client'

import { Gift, Coins } from 'lucide-react'
import { Skeleton } from '@/shared/ui/skeleton'
import { useGetGiftHistoryQuery } from '@/entities/gift'

export function GiftHistorySection() {
    const { data, isLoading, isError } = useGetGiftHistoryQuery()

    const history = data?.items ?? []

    if (isLoading) {
        return (
            <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full rounded-xl" />
                ))}
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-16">
                <p className="text-sm text-muted-foreground">Failed to load gift history.</p>
            </div>
        )
    }

    if (history.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-16">
                <Gift className="mb-3 h-10 w-10 text-slate-300" />
                <p className="font-medium text-slate-600">No gift history yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                    Your sent gifts will appear here.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {history.map((item) => (
                <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-xl border bg-white p-4 transition-colors hover:bg-slate-50"
                >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50">
                        {item.giftImagePath ? (
                            <img
                                src={item.giftImagePath}
                                alt={item.giftName}
                                className="h-6 w-6 object-contain"
                            />
                        ) : (
                            <Gift className="h-5 w-5 text-rose-500" />
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-900">
                            {item.giftName}
                        </p>
                        <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                            <Coins className="h-3 w-3 text-amber-500" />
                            <span>{item.priceCoins} credits</span>
                        </div>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                        {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                </div>
            ))}
        </div>
    )
}
