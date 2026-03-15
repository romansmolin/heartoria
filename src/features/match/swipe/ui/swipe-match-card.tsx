'use client'

import { Heart, MapPin, User, X } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import type { MatchCandidate, MatchAction } from '@/entities/match'

interface SwipeMatchCardProps {
    candidate: MatchCandidate
    onSwipe: (action: MatchAction) => void
}

export function SwipeMatchCard({ candidate, onSwipe }: SwipeMatchCardProps) {
    const primaryPhoto = candidate.photos?.find((p) => p.isPrimary)?.url ?? candidate.avatarUrl

    return (
        <Card className="w-full max-w-sm overflow-hidden">
            <div className="relative aspect-[3/4] bg-slate-100">
                {primaryPhoto ? (
                    <img
                        src={primaryPhoto}
                        alt={candidate.username}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <User className="h-20 w-20 text-slate-300" />
                    </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-lg font-semibold text-white">
                        {candidate.username}
                        {candidate.age && <span>, {candidate.age}</span>}
                    </h3>
                    {candidate.location && (
                        <p className="flex items-center gap-1 text-sm text-white/80">
                            <MapPin className="h-3 w-3" />
                            {candidate.location}
                        </p>
                    )}
                </div>
            </div>
            <CardContent className="p-4">
                {candidate.description && (
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                        {candidate.description}
                    </p>
                )}
                <div className="flex justify-center gap-4">
                    <Button
                        variant="outline"
                        size="lg"
                        className="h-14 w-14 rounded-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                        onClick={() => onSwipe('dislike')}
                    >
                        <X className="h-6 w-6" />
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="h-14 w-14 rounded-full border-green-200 text-green-500 hover:bg-green-50 hover:text-green-600"
                        onClick={() => onSwipe('like')}
                    >
                        <Heart className="h-6 w-6" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
