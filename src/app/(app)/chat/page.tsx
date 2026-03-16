import { ChatView } from '@/views/chat-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'HeartOria — Chat',
    description: 'Chat with your matches.',
}

export default function ChatPageRoute() {
    return <ChatView />
}
