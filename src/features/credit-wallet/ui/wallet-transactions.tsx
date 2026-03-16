import { ArrowDownLeft, ArrowUpRight, RotateCcw, Settings2 } from 'lucide-react'
import type { CreditTransaction } from '../api/client/services/wallet.service'

type WalletTransactionsProps = {
    transactions: CreditTransaction[]
    isLoading?: boolean
}

const formatDateTime = (value: string) => {
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) return 'Unknown date'
    return parsed.toLocaleString()
}

const formatAmount = (tx: CreditTransaction) => {
    const sign = tx.type === 'spend' ? '-' : '+'
    const amount = Math.abs(tx.amount)
    return `${sign}${amount}`
}

const statusStyles: Record<NonNullable<CreditTransaction['status']>, string> = {
    PENDING: 'bg-yellow-500/10 text-yellow-500',
    SUCCESSFUL: 'bg-green-500/10 text-green-500',
    FAILED: 'bg-red-500/10 text-red-500',
}

const typeConfig: Record<
    NonNullable<CreditTransaction['type']>,
    { label: string; icon: typeof ArrowDownLeft; color: string }
> = {
    grant: { label: 'Purchase', icon: ArrowDownLeft, color: 'text-green-500 bg-green-500/10' },
    spend: { label: 'Generation', icon: ArrowUpRight, color: 'text-red-500 bg-red-500/10' },
    refund: { label: 'Refund', icon: RotateCcw, color: 'text-blue-500 bg-blue-500/10' },
    adjustment: { label: 'Adjustment', icon: Settings2, color: 'text-muted-foreground bg-muted' },
}

export const WalletTransactions = ({ transactions, isLoading }: WalletTransactionsProps) => {
    if (isLoading) {
        return (
            <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-4 rounded-xl p-3">
                        <div className="h-10 w-10 animate-pulse rounded-lg bg-muted" />
                        <div className="flex-1 space-y-2">
                            <div className="h-3.5 w-1/3 animate-pulse rounded bg-muted" />
                            <div className="h-3 w-1/4 animate-pulse rounded bg-muted" />
                        </div>
                        <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                    </div>
                ))}
            </div>
        )
    }

    if (transactions.length === 0) {
        return (
            <div className="rounded-xl border border-dashed p-8 text-center">
                <p className="text-sm font-medium">No transactions yet</p>
                <p className="mt-1 text-xs text-muted-foreground">
                    Purchase credits to see your history here.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-1">
            {transactions.map((tx) => {
                const status = tx.status ?? 'PENDING'
                const type = tx.type ?? 'grant'
                const config = typeConfig[type]
                const Icon = config.icon

                return (
                    <div
                        key={tx.id}
                        className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-muted/30"
                    >
                        <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${config.color}`}
                        >
                            <Icon className="h-4.5 w-4.5" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium">{config.label}</p>
                            <p className="truncate text-xs text-muted-foreground">
                                {tx.reason ?? 'Credit activity'} &middot;{' '}
                                {formatDateTime(tx.createdAt)}
                            </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                            <span
                                className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${statusStyles[status]}`}
                            >
                                {status.toLowerCase()}
                            </span>
                            <span
                                className={`text-sm font-semibold ${
                                    tx.type === 'spend' ? 'text-red-500' : 'text-green-500'
                                }`}
                            >
                                {formatAmount(tx)}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
