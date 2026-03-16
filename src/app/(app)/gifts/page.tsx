import { GiftsView } from '@/views/gifts-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'HeartOria — Gifts',
    description: 'Browse and send gifts.',
}

export default function GiftsPageRoute() {
    return <GiftsView />
}
