'use client'

import Link from 'next/link'
import { Coins, Gift, Heart, MessageCircle, ShoppingCart, TrendingUp, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'
import { useWallet } from '@/features/credit-wallet'
import { useDiscoverMatchesQuery } from '@/entities/match'
import { useGetGiftInventoryQuery } from '@/entities/gift'

export function DashboardPage() {
    const { wallet, isLoading: walletLoading } = useWallet()
    const { data: discoverData, isLoading: discoverLoading } = useDiscoverMatchesQuery({ page: 1, perPage: 6 })
    const { data: inventoryData, isLoading: inventoryLoading } = useGetGiftInventoryQuery()

    const totalGifts = inventoryData?.items?.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0) ?? 0
    const totalSpent = wallet?.wallet.totalSpent ?? 0
    const balance = wallet?.wallet.balance ?? 0
    const candidates = discoverData?.data ?? []
    const transactions = wallet?.transactions ?? []

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto w-full max-w-6xl space-y-8 px-4 pb-16 pt-10">
                <header className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Dashboard</p>
                    <h1 className="text-3xl font-semibold text-slate-900">Welcome back</h1>
                    <p className="text-sm text-slate-600">
                        Here&apos;s an overview of your activity and quick actions.
                    </p>
                </header>

                {/* Stats Row */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Balance</CardTitle>
                            <Coins className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            {walletLoading ? (
                                <Skeleton className="h-8 w-24" />
                            ) : (
                                <div className="text-2xl font-bold">{balance}</div>
                            )}
                            <p className="text-xs text-muted-foreground">credits available</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Gifts Owned</CardTitle>
                            <Gift className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            {inventoryLoading ? (
                                <Skeleton className="h-8 w-24" />
                            ) : (
                                <div className="text-2xl font-bold">{totalGifts}</div>
                            )}
                            <p className="text-xs text-muted-foreground">in your inventory</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            {walletLoading ? (
                                <Skeleton className="h-8 w-24" />
                            ) : (
                                <div className="text-2xl font-bold">{totalSpent}</div>
                            )}
                            <p className="text-xs text-muted-foreground">credits used</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Links */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { title: 'Buy Tokens', href: '/wallet', icon: ShoppingCart, color: 'text-emerald-600' },
                        { title: 'Discover', href: '/match', icon: Heart, color: 'text-rose-500' },
                        { title: 'Messages', href: '/chat', icon: MessageCircle, color: 'text-blue-500' },
                        { title: 'Profile', href: '/profile', icon: User, color: 'text-violet-500' },
                    ].map((link) => (
                        <Link key={link.href} href={link.href}>
                            <Card className="cursor-pointer transition-shadow hover:shadow-md">
                                <CardContent className="flex items-center gap-3 pt-6">
                                    <link.icon className={`h-5 w-5 ${link.color}`} />
                                    <span className="font-medium">{link.title}</span>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Top Members */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {discoverLoading ? (
                            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2">
                                        <Skeleton className="h-16 w-16 rounded-full" />
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                ))}
                            </div>
                        ) : candidates.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No members to show yet.</p>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
                                {candidates.slice(0, 6).map((c) => (
                                    <div key={c.id} className="flex flex-col items-center gap-2">
                                        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-slate-100">
                                            {c.avatarUrl ? (
                                                <img src={c.avatarUrl} alt={c.username} className="h-full w-full object-cover" />
                                            ) : (
                                                <User className="h-8 w-8 text-slate-400" />
                                            )}
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-medium">{c.username}</p>
                                            {c.age && <p className="text-xs text-muted-foreground">{c.age} yrs</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {walletLoading ? (
                            <div className="space-y-3">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Skeleton key={i} className="h-10 w-full" />
                                ))}
                            </div>
                        ) : transactions.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No recent activity.</p>
                        ) : (
                            <div className="space-y-3">
                                {transactions.slice(0, 5).map((tx) => (
                                    <div key={tx.id} className="flex items-center justify-between rounded-lg border p-3">
                                        <div>
                                            <p className="text-sm font-medium capitalize">{tx.type}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(tx.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <span className={`text-sm font-semibold ${tx.type === 'spend' ? 'text-red-500' : 'text-emerald-600'}`}>
                                            {tx.type === 'spend' ? '-' : '+'}{tx.amount}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
