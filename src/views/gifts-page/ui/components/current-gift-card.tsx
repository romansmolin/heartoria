'use client'

import { Card, CardContent } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import type { GiftInventoryItem } from '@/entities/gift'

interface CurrentGiftCardProps {
    gift: GiftInventoryItem
}

export function CurrentGiftCard({ gift }: CurrentGiftCardProps) {
    return (
        <Card className="overflow-hidden">
            <div className="relative aspect-square bg-slate-50 p-4">
                <img
                    src={gift.giftImagePath}
                    alt={gift.giftName}
                    className="h-full w-full object-contain"
                    onError={(e) => {
                        ;(e.target as HTMLImageElement).style.display = 'none'
                    }}
                />
                <Badge className="absolute right-2 top-2" variant="secondary">
                    x{gift.quantity}
                </Badge>
            </div>
            <CardContent className="p-3">
                <h3 className="text-sm font-medium">{gift.giftName}</h3>
                <p className="text-xs text-muted-foreground">
                    Updated {new Date(gift.updatedAt).toLocaleDateString()}
                </p>
            </CardContent>
        </Card>
    )
}
