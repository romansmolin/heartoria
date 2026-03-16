import { LandingPage } from '@/views/landing-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Heartoria — Where Real Connections Begin',
    description:
        'Find meaningful connections with AI-powered compatibility matching. Discover someone who truly fits your life.',
}

export default function Home() {
    return <LandingPage />
}
