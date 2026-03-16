import { ProfileView } from '@/views/profile-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'HeartOria — Profile',
    description: 'Manage your profile.',
}

export default function ProfilePageRoute() {
    return <ProfileView />
}
