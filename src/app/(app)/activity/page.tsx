import { ActivityView } from '@/views/activity-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'HeartOria — Activity',
    description: 'See community activity.',
}

export default function ActivityPageRoute() {
    return <ActivityView />
}
