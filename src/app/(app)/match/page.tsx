import { MatchView } from '@/views/match-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'HeartOria — Discover',
    description: 'Discover new matches.',
}

export default function MatchPageRoute() {
    return <MatchView />
}
