import { AuthTabs } from '@/widgets/auth-tabs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Subtitly PDF Insights — Sign In or Sign Up',
    description: 'Access your Subtitly PDF Insights account or create a new one.',
}

export default function AuthPage() {
    return <AuthTabs />
}
