import { LandingPage } from '@/views/landing-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Nexus AI Summit 2026 — The Premier AI Event',
    description:
        'Join 2,000+ AI professionals for three days of keynotes, workshops, and networking at Nexus AI Summit 2026 in San Francisco.',
}

export default function Home() {
    return <LandingPage />
}
