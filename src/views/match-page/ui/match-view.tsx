'use client'

import { useState, useCallback } from 'react'
import { RefreshCw } from 'lucide-react'
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

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto w-full max-w-lg space-y-6 px-4 pb-16 pt-10">
                <header className="space-y-2 text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Discover</p>
                    <h1 className="text-3xl font-semibold text-slate-900">Find your match</h1>
                </header>

                <SearchFilters onApply={onApplyFilters} isLoading={isLoading} />

                {feedback && (
                    <div className="rounded-lg bg-rose-50 p-3 text-center text-sm font-medium text-rose-700">
                        {feedback}
                    </div>
                )}

                {isLoading && (
                    <div className="flex justify-center">
                        <Skeleton className="aspect-[3/4] w-full max-w-sm rounded-xl" />
                    </div>
                )}

                {isError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
                        <p className="text-sm text-red-600">Failed to load matches.</p>
                        <Button variant="outline" size="sm" className="mt-3" onClick={onReload}>
                            Try again
                        </Button>
                    </div>
                )}

                {isEmpty && (
                    <div className="rounded-lg border p-8 text-center">
                        <p className="text-sm text-muted-foreground">No one to discover right now.</p>
                        <Button variant="outline" size="sm" className="mt-3" onClick={onReload}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Refresh
                        </Button>
                    </div>
                )}

                {isExhausted && (
                    <div className="rounded-lg border p-8 text-center">
                        <p className="text-sm text-muted-foreground">You&apos;ve seen everyone for now.</p>
                        <Button variant="outline" size="sm" className="mt-3" onClick={onReload}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Load more
                        </Button>
                    </div>
                )}

                {candidate && (
                    <div className="flex flex-col items-center gap-4">
                        <SwipeMatchCard candidate={candidate} onSwipe={onSwipe} />
                        <CompatibilityScore candidateId={candidate.id} />
                    </div>
                )}
            </div>
        </div>
    )
}
