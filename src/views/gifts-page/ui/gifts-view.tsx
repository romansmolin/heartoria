'use client'

import { useState } from 'react'
import { Coins } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs'
import { useWallet } from '@/features/credit-wallet'
import { GiftShopSection } from './components/gift-shop-section'
import { CurrentGiftsSection } from './components/current-gifts-section'
import { ReceivedGiftsSection } from './components/received-gifts-section'
import { GiftHistorySection } from './components/gift-history-section'

export function GiftsView() {
    const { wallet } = useWallet()
    const balance = wallet?.wallet.balance ?? 0
    const [activeCategory, setActiveCategory] = useState<string | null>(null)

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto w-full max-w-6xl space-y-6 px-4 pb-16 pt-10">
                {/* Header with balance */}
                <div className="flex items-end justify-between">
                    <header className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Gifts</p>
                        <h1 className="text-3xl font-semibold text-slate-900">Gift Shop</h1>
                        <p className="text-sm text-slate-600">
                            Send special gifts to show someone you care.
                        </p>
                    </header>
                    <div className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm">
                        <Coins className="h-4 w-4 text-amber-500" />
                        <span className="text-sm font-semibold">{balance}</span>
                        <span className="text-xs text-muted-foreground">credits</span>
                    </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="shop">
                    <TabsList>
                        <TabsTrigger value="shop">Shop</TabsTrigger>
                        <TabsTrigger value="inventory">My Gifts</TabsTrigger>
                        <TabsTrigger value="received">Received</TabsTrigger>
                        <TabsTrigger value="history">History</TabsTrigger>
                    </TabsList>

                    <TabsContent value="shop" className="mt-6">
                        {/* Category filter chips */}
                        <div className="mb-6 flex flex-wrap gap-2">
                            {['All', 'Basic', 'Standard', 'Premium'].map((cat) => {
                                const isActive = cat === 'All' ? activeCategory === null : activeCategory === cat
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat === 'All' ? null : cat)}
                                        className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                                            isActive
                                                ? 'bg-slate-900 text-white shadow-sm'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                )
                            })}
                        </div>
                        <GiftShopSection activeCategory={activeCategory} />
                    </TabsContent>

                    <TabsContent value="inventory" className="mt-6">
                        <CurrentGiftsSection />
                    </TabsContent>

                    <TabsContent value="received" className="mt-6">
                        <ReceivedGiftsSection />
                    </TabsContent>

                    <TabsContent value="history" className="mt-6">
                        <GiftHistorySection />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
