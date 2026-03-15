'use client'

import { Coins, Loader2, ShoppingCart } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import type { GiftCatalogItem } from '@/entities/gift'

interface GiftShopCardProps {
    gift: GiftCatalogItem
    isBuying: boolean
    onBuy: (gift: GiftCatalogItem) => void
}

const TIER_STYLES: Record<string, { bg: string; badge: string; badgeVariant: 'default' | 'secondary' | 'outline' }> = {
    Basic: {
        bg: 'from-rose-50 to-orange-50',
        badge: 'bg-rose-100 text-rose-700',
        badgeVariant: 'secondary',
    },
    Standard: {
        bg: 'from-violet-50 to-blue-50',
        badge: 'bg-violet-100 text-violet-700',
        badgeVariant: 'secondary',
    },
    Premium: {
        bg: 'from-amber-50 to-yellow-50',
        badge: 'bg-amber-100 text-amber-700',
        badgeVariant: 'secondary',
    },
}

export function getTier(priceCoins: number): string {
    if (priceCoins >= 100) return 'Premium'
    if (priceCoins >= 50) return 'Standard'
    return 'Basic'
}

export function GiftShopCard({ gift, isBuying, onBuy }: GiftShopCardProps) {
    const tierName = getTier(gift.priceCoins)
    const tier = TIER_STYLES[tierName]

    return (
        <div className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            {/* Tier badge */}
            <div className="absolute left-3 top-3 z-10">
                <Badge variant={tier.badgeVariant} className={tier.badge}>
                    {tierName}
                </Badge>
            </div>

            {/* Image area with gradient bg */}
            <div className={`relative flex aspect-square items-center justify-center bg-gradient-to-br ${tier.bg} p-6`}>
                <img
                    src={gift.imagePath}
                    alt={gift.name}
                    className="h-full w-full object-contain drop-shadow-md transition-transform group-hover:scale-110"
                    onError={(e) => {
                        ;(e.target as HTMLImageElement).style.opacity = '0.3'
                    }}
                />
            </div>

            {/* Info */}
            <div className="space-y-3 p-4">
                <div>
                    <h3 className="font-medium text-slate-900">{gift.name}</h3>
                    <div className="mt-1 flex items-center gap-1">
                        <Coins className="h-3.5 w-3.5 text-amber-500" />
                        <span className="text-sm font-semibold text-slate-700">{gift.priceCoins}</span>
                        <span className="text-xs text-muted-foreground">credits</span>
                    </div>
                </div>

                <Button
                    size="sm"
                    className="w-full"
                    disabled={isBuying}
                    onClick={() => onBuy(gift)}
                >
                    {isBuying ? (
                        <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                    ) : (
                        <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                    )}
                    {isBuying ? 'Buying...' : 'Buy Gift'}
                </Button>
            </div>
        </div>
    )
}
