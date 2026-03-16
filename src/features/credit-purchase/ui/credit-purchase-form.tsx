'use client'

import { useState } from 'react'
import { Coins } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

type CreditPurchaseFormProps = {
    presets: readonly number[]
    selectedPreset: number | null
    customAmount: string
    customCredits: number | null
    customError: string | null
    selectedCredits: number | null
    checkoutUrl: string | null
    isSubmitting: boolean
    onSelectPreset: (credits: number) => void
    onCustomAmountChange: (value: string) => void
    onPurchase: () => void
    onCloseCheckout: () => void
}

const EURO_PER_CREDIT = 0.02

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 2,
    }).format(value)
}

export const CreditPurchaseForm = ({
    presets,
    selectedPreset,
    customAmount,
    customCredits,
    customError,
    selectedCredits,
    checkoutUrl,
    isSubmitting,
    onSelectPreset,
    onCustomAmountChange,
    onPurchase,
    onCloseCheckout,
}: CreditPurchaseFormProps) => {
    const estimatedAmount = selectedCredits ? selectedCredits * EURO_PER_CREDIT : null
    const [isConsentOpen, setIsConsentOpen] = useState(false)
    const [consentChecked, setConsentChecked] = useState(false)

    const handleOpenConsent = () => {
        setConsentChecked(false)
        setIsConsentOpen(true)
    }

    const handleCloseConsent = () => {
        setConsentChecked(false)
        setIsConsentOpen(false)
    }

    const handleConfirmConsent = () => {
        if (!consentChecked) return
        setIsConsentOpen(false)
        setConsentChecked(false)
        onPurchase()
    }

    return (
        <div className="space-y-5">
            {/* Presets */}
            <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground">Quick packs</p>
                <div className="grid grid-cols-3 gap-2">
                    {presets.map((credits) => {
                        const isActive = selectedPreset === credits
                        return (
                            <button
                                key={credits}
                                type="button"
                                onClick={() => onSelectPreset(credits)}
                                className={`rounded-xl border p-3 text-center transition-all ${
                                    isActive
                                        ? 'border-primary bg-primary/10 ring-1 ring-primary/30'
                                        : 'border-border bg-card/50 hover:border-primary/30 hover:bg-primary/5'
                                }`}
                            >
                                <p className="text-lg font-bold">{credits}</p>
                                <p className="text-[10px] text-muted-foreground">
                                    {formatCurrency(credits * EURO_PER_CREDIT)}
                                </p>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Custom amount */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-muted-foreground">Custom amount</p>
                    <span className="text-[10px] text-muted-foreground">€0.02/credit</span>
                </div>
                <Input
                    type="number"
                    inputMode="decimal"
                    step="0.02"
                    min="0"
                    placeholder="Enter EUR amount"
                    value={customAmount}
                    onChange={(event) => onCustomAmountChange(event.target.value)}
                    className="rounded-lg"
                />
                <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">
                        {customCredits ? `${customCredits} credits` : 'Enter amount to see credits'}
                    </span>
                    {customError && <span className="text-destructive">{customError}</span>}
                </div>
            </div>

            {/* Summary + buy button */}
            <div className="rounded-xl border bg-muted/30 p-4">
                <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Coins className="h-4 w-4 text-primary" />
                        <span className="text-xs font-medium text-muted-foreground">Total</span>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold">{selectedCredits ?? 0} credits</p>
                        <p className="text-xs text-muted-foreground">
                            {estimatedAmount ? formatCurrency(estimatedAmount) : '—'}
                        </p>
                    </div>
                </div>
                <Button
                    type="button"
                    onClick={handleOpenConsent}
                    disabled={!selectedCredits || Boolean(customError) || isSubmitting}
                    data-testid="buy-credits-button"
                    className="w-full rounded-lg"
                >
                    {isSubmitting ? 'Starting checkout...' : 'Buy Credits'}
                </Button>
            </div>

            {/* Consent modal */}
            {isConsentOpen && (
                <div
                    className="fixed inset-0 z-40 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
                    data-testid="credits-consent-modal"
                >
                    <div className="w-full max-w-lg rounded-2xl border bg-card p-6 shadow-xl">
                        <div className="space-y-2">
                            <p className="text-sm font-semibold">Confirm consent</p>
                            <p className="text-sm text-muted-foreground">
                                Please confirm you agree before proceeding to checkout.
                            </p>
                        </div>
                        <div className="mt-4 flex items-start gap-3">
                            <input
                                id="credits-consent"
                                type="checkbox"
                                className="mt-1 h-4 w-4 rounded accent-primary"
                                checked={consentChecked}
                                onChange={(event) => setConsentChecked(event.target.checked)}
                                data-testid="credits-consent-checkbox"
                            />
                            <label
                                htmlFor="credits-consent"
                                className="text-sm leading-relaxed text-muted-foreground"
                            >
                                I agree to the{' '}
                                <a
                                    href="/terms-of-service"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-primary underline hover:text-primary/80"
                                    data-testid="credits-terms-link"
                                >
                                    Terms of Service
                                </a>
                                ,{' '}
                                <a
                                    href="/privacy-policy"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-primary underline hover:text-primary/80"
                                    data-testid="credits-privacy-link"
                                >
                                    Privacy Policy
                                </a>
                                , and{' '}
                                <a
                                    href="/return-policy"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-primary underline hover:text-primary/80"
                                    data-testid="credits-return-link"
                                >
                                    Return Policy
                                </a>
                                .
                            </label>
                        </div>
                        <div className="mt-6 flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCloseConsent}
                                className="rounded-lg"
                                data-testid="credits-consent-cancel"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                onClick={handleConfirmConsent}
                                disabled={!consentChecked}
                                className="rounded-lg"
                                data-testid="credits-consent-confirm"
                            >
                                Continue to checkout
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Checkout iframe modal */}
            {checkoutUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
                    <div className="relative h-[80vh] w-full max-w-3xl overflow-hidden rounded-2xl border bg-card shadow-xl">
                        <div className="flex items-center justify-between border-b px-5 py-3">
                            <div>
                                <p className="text-sm font-semibold">Secure checkout</p>
                                <p className="text-xs text-muted-foreground">
                                    Complete payment to add credits
                                </p>
                            </div>
                            <Button variant="outline" size="sm" onClick={onCloseCheckout} className="rounded-lg">
                                Close
                            </Button>
                        </div>
                        <iframe
                            title="Secure Processor checkout"
                            src={checkoutUrl}
                            className="h-full w-full"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
