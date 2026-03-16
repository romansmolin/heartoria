'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { ArrowDownUp, CreditCard, Wallet } from 'lucide-react'
import { CreditPurchaseForm, useCreditPurchase } from '@/features/credit-purchase'
import { WalletSummary, WalletTransactions, useWallet } from '@/features/credit-wallet'

export const WalletPage = () => {
    const searchParams = useSearchParams()
    const notifiedRef = useRef(false)

    const { wallet, isLoading, refreshWallet } = useWallet()

    const {
        presets,
        selectedPreset,
        customAmount,
        customCredits,
        customError,
        selectedCredits,
        checkoutUrl,
        isSubmitting,
        selectPreset,
        updateCustomAmount,
        startPurchase,
        closeCheckout,
    } = useCreditPurchase({
        onCheckoutReady: refreshWallet,
    })

    useEffect(() => {
        if (notifiedRef.current) return
        const status = searchParams.get('status')
        if (!status) return

        notifiedRef.current = true

        if (status === 'successful') {
            toast.success('Payment successful. Credits will be added shortly.')
            void refreshWallet()
            return
        }

        if (status === 'pending') {
            toast('Payment is pending. We will update your balance soon.')
            void refreshWallet()
            return
        }

        toast.error('Payment failed or was declined.')
        void refreshWallet()
    }, [searchParams, refreshWallet])

    const handleCloseCheckout = () => {
        closeCheckout()
        void refreshWallet()
    }

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
            <div className="pointer-events-none absolute -left-20 bottom-1/3 h-72 w-72 rounded-full bg-primary/5 blur-[100px]" />

            <div className="relative mx-auto w-full max-w-5xl px-4 pb-16 pt-8">
                {/* Header */}
                <header className="mb-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                            <Wallet className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Wallet</h1>
                            <p className="text-sm text-muted-foreground">
                                Manage your credits and purchase history
                            </p>
                        </div>
                    </div>
                </header>

                {/* Wallet summary */}
                <div className="mb-6">
                    {wallet ? (
                        <WalletSummary summary={wallet.wallet} />
                    ) : (
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="h-28 animate-pulse rounded-2xl border bg-card/50" />
                            <div className="h-28 animate-pulse rounded-2xl border bg-card/50" />
                            <div className="h-28 animate-pulse rounded-2xl border bg-card/50" />
                        </div>
                    )}
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
                    {/* Transactions */}
                    <section className="rounded-2xl border bg-card/50 backdrop-blur-sm">
                        <div className="flex items-center gap-2.5 border-b px-6 py-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                <ArrowDownUp className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold">Transactions</h2>
                                <p className="text-xs text-muted-foreground">
                                    Recent credit activity
                                </p>
                            </div>
                        </div>
                        <div className="p-6">
                            <WalletTransactions
                                transactions={wallet?.transactions ?? []}
                                isLoading={isLoading}
                            />
                        </div>
                    </section>

                    {/* Purchase form sidebar */}
                    <aside>
                        <div className="sticky top-4 rounded-2xl border bg-card/50 backdrop-blur-sm">
                            <div className="flex items-center gap-2.5 border-b px-6 py-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                    <CreditCard className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-semibold">Buy Credits</h2>
                                    <p className="text-xs text-muted-foreground">
                                        Top up your balance
                                    </p>
                                </div>
                            </div>
                            <div className="p-6">
                                <CreditPurchaseForm
                                    presets={presets}
                                    selectedPreset={selectedPreset}
                                    customAmount={customAmount}
                                    customCredits={customCredits}
                                    customError={customError}
                                    selectedCredits={selectedCredits}
                                    checkoutUrl={checkoutUrl}
                                    isSubmitting={isSubmitting}
                                    onSelectPreset={selectPreset}
                                    onCustomAmountChange={updateCustomAmount}
                                    onPurchase={startPurchase}
                                    onCloseCheckout={handleCloseCheckout}
                                />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
