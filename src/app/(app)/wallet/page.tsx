import { WalletPage } from '@/views/wallet-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Subtitly PDF Insights — Wallet',
    description: 'Manage your credits and view recent transactions.',
}

export default function WalletPageRoute() {
    return <WalletPage />
}
