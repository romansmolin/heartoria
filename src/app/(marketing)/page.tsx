import { LandingPage } from '@/views/landing-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Your Brand',
    description: 'Your Brand — a modern platform to help you build, ship, and grow.',
}

export default function Home() {
    return <LandingPage />
}
