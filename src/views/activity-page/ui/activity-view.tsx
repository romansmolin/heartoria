'use client'

import { RefreshCw, User } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Skeleton } from '@/shared/ui/skeleton'
import { useGetActivityQuery } from '@/entities/activity'

export function ActivityView() {
    const { data, isLoading, isError, refetch } = useGetActivityQuery()
    const items = data?.data ?? []

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto w-full max-w-2xl space-y-6 px-4 pb-16 pt-10">
                <header className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Feed</p>
                    <h1 className="text-3xl font-semibold text-slate-900">Activity</h1>
                    <p className="text-sm text-slate-600">See what&apos;s happening in the community.</p>
                </header>

                {isLoading && (
                    <div className="space-y-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-20 w-full rounded-lg" />
                        ))}
                    </div>
                )}

                {isError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
                        <p className="text-sm text-red-600">Failed to load activity feed.</p>
                        <Button variant="outline" size="sm" className="mt-3" onClick={() => refetch()}>
                            Try again
                        </Button>
                    </div>
                )}

                {!isLoading && !isError && items.length === 0 && (
                    <div className="rounded-lg border p-8 text-center">
                        <p className="text-sm text-muted-foreground">No activity yet.</p>
                        <Button variant="outline" size="sm" className="mt-3" onClick={() => refetch()}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Refresh
                        </Button>
                    </div>
                )}

                {items.length > 0 && (
                    <div className="space-y-3">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-start gap-3 rounded-lg border bg-card p-4"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
                                    {item.avatarUrl ? (
                                        <img
                                            src={item.avatarUrl}
                                            alt={item.username}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <User className="h-5 w-5 text-muted-foreground" />
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">{item.username}</span>
                                        <span className="text-xs text-muted-foreground">{item.type}</span>
                                    </div>
                                    {item.content && (
                                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                            {item.content}
                                        </p>
                                    )}
                                    <time className="mt-1 block text-xs text-muted-foreground">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </time>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
