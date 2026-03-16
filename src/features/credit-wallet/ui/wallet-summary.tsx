import { Coins, TrendingDown, TrendingUp, Clock } from 'lucide-react'
import type { WalletSummary as WalletSummaryType } from '../api/client/services/wallet.service'

type WalletSummaryProps = {
    summary: WalletSummaryType
}

const formatCurrency = (amount: number, currency: string) => {
    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            maximumFractionDigits: 2,
        }).format(amount)
    } catch (error) {
        return `${amount.toFixed(2)} ${currency}`
    }
}

export const WalletSummary = ({ summary }: WalletSummaryProps) => {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Balance - highlighted */}
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-5">
                <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/10 blur-2xl" />
                <div className="relative">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <Coins className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">Balance</p>
                    <p className="mt-1 text-2xl font-bold">{summary.balance}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        {formatCurrency(summary.balance * 0.02, summary.currency)}
                    </p>
                </div>
            </div>

            {/* Total purchased */}
            <div className="rounded-2xl border bg-card/50 p-5">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10">
                    <TrendingUp className="h-4.5 w-4.5 text-green-500" />
                </div>
                <p className="text-xs font-medium text-muted-foreground">Purchased</p>
                <p className="mt-1 text-2xl font-bold">{summary.totalPurchased}</p>
            </div>

            {/* Total spent */}
            <div className="rounded-2xl border bg-card/50 p-5">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10">
                    <TrendingDown className="h-4.5 w-4.5 text-red-500" />
                </div>
                <p className="text-xs font-medium text-muted-foreground">Spent</p>
                <p className="mt-1 text-2xl font-bold">{summary.totalSpent}</p>
            </div>

            {/* Pending */}
            <div className="rounded-2xl border bg-card/50 p-5">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500/10">
                    <Clock className="h-4.5 w-4.5 text-yellow-500" />
                </div>
                <p className="text-xs font-medium text-muted-foreground">Pending</p>
                <p className="mt-1 text-2xl font-bold">{summary.pendingCredits}</p>
            </div>
        </div>
    )
}
