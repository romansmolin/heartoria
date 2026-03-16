'use client'

import { useState, useCallback } from 'react'
import { Heart, RefreshCw, Sparkles, Users } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Skeleton } from '@/shared/ui/skeleton'
import { useDiscoverMatchesQuery, useMatchActionMutation } from '@/entities/match'
import type { MatchAction, DiscoverMatchesParams } from '@/entities/match'
import { SwipeMatchCard } from '@/features/match/swipe'
import { CompatibilityScore } from '@/features/match/compatibility'
import { SearchFilters } from '@/features/match/search-filters'

export function MatchView() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [feedback, setFeedback] = useState<string | null>(null)
    const [filterParams, setFilterParams] = useState<DiscoverMatchesParams>({ page: 1, perPage: 20 })

    const { data, isLoading, isError, refetch } = useDiscoverMatchesQuery(filterParams)
    const [matchAction] = useMatchActionMutation()

    const candidates = data?.data ?? []
    const candidate = candidates[currentIndex] ?? null
    const isEmpty = !isLoading && candidates.length === 0
    const isExhausted = !isLoading && currentIndex >= candidates.length && candidates.length > 0

    const onSwipe = useCallback(
        async (action: MatchAction) => {
            if (!candidate) return
            try {
                const result = await matchAction({
                    candidateId: candidate.id,
                    action,
                }).unwrap()

                if (result.matched) {
                    setFeedback("It's a match!")
                } else if (action === 'like') {
                    setFeedback('Liked!')
                } else {
                    setFeedback(null)
                }

                setCurrentIndex((prev) => prev + 1)
                setTimeout(() => setFeedback(null), 2000)
            } catch {
                setFeedback('Something went wrong')
                setTimeout(() => setFeedback(null), 2000)
            }
        },
        [candidate, matchAction],
    )

    const onReload = useCallback(() => {
        setCurrentIndex(0)
        setFeedback(null)
        refetch()
    }, [refetch])

    const onApplyFilters = useCallback((params: DiscoverMatchesParams) => {
        setCurrentIndex(0)
        setFeedback(null)
        setFilterParams(params)
    }, [])

    const remaining = Math.max(0, candidates.length - currentIndex)

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
            <div className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 rounded-full bg-primary/5 blur-[100px]" />

            <div className="relative mx-auto w-full max-w-5xl px-4 pb-16 pt-8">
                {/* Header */}
                <header className="mb-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                            <Heart className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Discover</h1>
                            <p className="text-sm text-muted-foreground">
                                Find someone who truly fits your life
                            </p>
                        </div>
                    </div>
                    {candidates.length > 0 && (
                        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                            <Users className="h-3.5 w-3.5" />
                            <span>{remaining} profiles remaining</span>
                        </div>
                    )}
                </header>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
                    {/* Main content area */}
                    <div className="flex flex-col items-center gap-5">
                        {/* Match feedback toast */}
                        {feedback && (
                            <div className="w-full max-w-sm animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        {feedback === "It's a match!" && (
                                            <Sparkles className="h-4 w-4 text-primary" />
                                        )}
                                        <span className="text-sm font-semibold text-primary">
                                            {feedback}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Loading skeleton */}
                        {isLoading && (
                            <div className="w-full max-w-sm">
                                <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
                                <div className="mt-4 flex justify-center gap-4">
                                    <Skeleton className="h-14 w-14 rounded-full" />
                                    <Skeleton className="h-14 w-14 rounded-full" />
                                </div>
                            </div>
                        )}

                        {/* Error state */}
                        {isError && (
                            <div className="w-full max-w-sm rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                                    <Heart className="h-6 w-6 text-destructive" />
                                </div>
                                <p className="mb-1 text-sm font-medium">Failed to load matches</p>
                                <p className="mb-4 text-xs text-muted-foreground">
                                    Something went wrong. Please try again.
                                </p>
                                <Button variant="outline" size="sm" onClick={onReload}>
                                    <RefreshCw className="mr-2 h-3.5 w-3.5" />
                                    Try again
                                </Button>
                            </div>
                        )}

                        {/* Empty state */}
                        {isEmpty && (
                            <div className="w-full max-w-sm rounded-2xl border bg-card/50 p-8 text-center">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                    <Users className="h-6 w-6 text-primary" />
                                </div>
                                <p className="mb-1 text-sm font-medium">No one to discover</p>
                                <p className="mb-4 text-xs text-muted-foreground">
                                    Try adjusting your filters or check back later.
                                </p>
                                <Button variant="outline" size="sm" onClick={onReload}>
                                    <RefreshCw className="mr-2 h-3.5 w-3.5" />
                                    Refresh
                                </Button>
                            </div>
                        )}

                        {/* Exhausted state */}
                        {isExhausted && (
                            <div className="w-full max-w-sm rounded-2xl border bg-card/50 p-8 text-center">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                    <Sparkles className="h-6 w-6 text-primary" />
                                </div>
                                <p className="mb-1 text-sm font-medium">You&apos;ve seen everyone</p>
                                <p className="mb-4 text-xs text-muted-foreground">
                                    Come back later for new profiles.
                                </p>
                                <Button variant="outline" size="sm" onClick={onReload}>
                                    <RefreshCw className="mr-2 h-3.5 w-3.5" />
                                    Load more
                                </Button>
                            </div>
                        )}

                        {/* Candidate card + compatibility */}
                        {candidate && (
                            <div className="flex flex-col items-center gap-5">
                                <SwipeMatchCard candidate={candidate} onSwipe={onSwipe} />
                                <CompatibilityScore candidateId={candidate.id} />
                            </div>
                        )}
                    </div>

                    {/* Sidebar filters */}
                    <aside className="order-first lg:order-last">
                        <SearchFilters onApply={onApplyFilters} isLoading={isLoading} />
                    </aside>
                </div>
            </div>
        </div>
    )
}
