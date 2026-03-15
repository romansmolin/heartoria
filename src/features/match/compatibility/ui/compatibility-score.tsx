'use client'

import { Sparkles } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { useCompatibilityScoreMutation } from '@/entities/match'

interface CompatibilityScoreProps {
    candidateId: string
}

export function CompatibilityScore({ candidateId }: CompatibilityScoreProps) {
    const [getScore, { data, isLoading }] = useCompatibilityScoreMutation()

    const scoreColor = data
        ? data.score >= 80
            ? 'text-green-600'
            : data.score >= 50
                ? 'text-yellow-600'
                : 'text-red-500'
        : ''

    return (
        <div className="space-y-3">
            {!data ? (
                <Button
                    variant="outline"
                    size="sm"
                    disabled={isLoading}
                    onClick={() => getScore({ candidateId })}
                >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isLoading ? 'Analyzing...' : 'Check Compatibility'}
                </Button>
            ) : (
                <div className="space-y-2 rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                        <span className={`text-2xl font-bold ${scoreColor}`}>{data.score}%</span>
                        <span className="text-sm text-muted-foreground">compatibility</span>
                    </div>
                    <p className="text-sm">{data.summary}</p>
                    {data.reasons.length > 0 && (
                        <ul className="space-y-1">
                            {data.reasons.map((reason, i) => (
                                <li key={i} className="text-xs text-muted-foreground">
                                    &bull; {reason}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}
