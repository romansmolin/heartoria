'use client'

import { Heart, MapPin, User, X } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import type { MatchCandidate, MatchAction } from '@/entities/match'

interface SwipeMatchCardProps {
    candidate: MatchCandidate
    onSwipe: (action: MatchAction) => void
}

export function SwipeMatchCard({ candidate, onSwipe }: SwipeMatchCardProps) {
    const primaryPhoto = candidate.photos?.find((p) => p.isPrimary)?.url ?? candidate.avatarUrl

    return (
        <div className="group relative w-full max-w-sm">
            {/* Card */}
            <div className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-xl shadow-black/5">
                <div className="relative aspect-[3/4] bg-muted">
                    {primaryPhoto ? (
                        <img
                            src={primaryPhoto}
                            alt={candidate.username}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/5 to-primary/20">
                            <User className="h-20 w-20 text-muted-foreground/30" />
                        </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-xl font-bold text-white">
                            {candidate.username}
                            {candidate.age && (
                                <span className="ml-1 font-normal text-white/70">, {candidate.age}</span>
                            )}
                        </h3>
                        {candidate.location && (
                            <p className="mt-1 flex items-center gap-1.5 text-sm text-white/70">
                                <MapPin className="h-3.5 w-3.5" />
                                {candidate.location}
                            </p>
                        )}
                        {candidate.description && (
                            <p className="mt-2 text-sm leading-relaxed text-white/60 line-clamp-2">
                                {candidate.description}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Action buttons — floated below card */}
            <div className="mt-5 flex justify-center gap-5">
                <Button
                    variant="outline"
                    size="lg"
                    className="h-16 w-16 rounded-full border-2 border-red-500/30 bg-card text-red-500 shadow-lg shadow-red-500/10 transition-all hover:scale-110 hover:border-red-500 hover:bg-red-500 hover:text-white hover:shadow-red-500/25"
                    onClick={() => onSwipe('dislike')}
                >
                    <X className="h-7 w-7" />
                </Button>
                <Button
                    variant="outline"
                    size="lg"
                    className="h-16 w-16 rounded-full border-2 border-green-500/30 bg-card text-green-500 shadow-lg shadow-green-500/10 transition-all hover:scale-110 hover:border-green-500 hover:bg-green-500 hover:text-white hover:shadow-green-500/25"
                    onClick={() => onSwipe('like')}
                >
                    <Heart className="h-7 w-7" />
                </Button>
            </div>
        </div>
    )
}
