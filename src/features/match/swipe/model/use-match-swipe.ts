import { useState, useCallback } from 'react'
import { useDiscoverMatchesQuery, useMatchActionMutation } from '@/entities/match'
import type { MatchAction } from '@/entities/match'

export function useMatchSwipe() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [feedback, setFeedback] = useState<string | null>(null)

    const { data, isLoading, isError, refetch } = useDiscoverMatchesQuery({ page: 1, perPage: 20 })
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

    return {
        candidate,
        candidates,
        currentIndex,
        isLoading,
        isError,
        isEmpty,
        isExhausted,
        feedback,
        onSwipe,
        onReload,
    }
}
