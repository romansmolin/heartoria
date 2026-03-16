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
            ? 'text-green-500'
            : data.score >= 50
                ? 'text-yellow-500'
                : 'text-red-500'
        : ''

    const scoreBg = data
        ? data.score >= 80
            ? 'bg-green-500/10 border-green-500/20'
            : data.score >= 50
                ? 'bg-yellow-500/10 border-yellow-500/20'
                : 'bg-red-500/10 border-red-500/20'
        : ''

    return (
        <div className="w-full max-w-sm">
            {!data ? (
                <Button
                    variant="outline"
                    size="sm"
                    disabled={isLoading}
                    onClick={() => getScore({ candidateId })}
                    className="w-full rounded-xl border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
                >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isLoading ? 'Analyzing compatibility...' : 'Check Compatibility'}
                </Button>
            ) : (
                <div className={`rounded-2xl border p-4 ${scoreBg}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-xs font-medium text-muted-foreground">
                                Compatibility
                            </span>
                        </div>
                        <span className={`text-2xl font-bold ${scoreColor}`}>{data.score}%</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed">{data.summary}</p>
                    {data.reasons.length > 0 && (
                        <ul className="mt-3 space-y-1.5 border-t border-border/50 pt-3">
                            {data.reasons.map((reason, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-2 text-xs text-muted-foreground"
                                >
                                    <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                                    {reason}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}
