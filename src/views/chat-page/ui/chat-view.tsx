'use client'

import { useCallback, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { ChatContactsPanel } from './components/chat-contacts-panel'
import { ChatConversationPanel } from './components/chat-conversation-panel'

interface SelectedContact {
    id: string
    username: string
}

export function ChatView() {
    const [selectedContact, setSelectedContact] = useState<SelectedContact | null>(null)

    const handleSelectContact = useCallback((id: string, username: string) => {
        setSelectedContact({ id, username })
    }, [])

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10">
                <header className="mb-6 space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Chat</p>
                    <h1 className="text-3xl font-semibold text-slate-900">Messages</h1>
                </header>

                <div className="grid h-[600px] grid-cols-[300px_1fr] overflow-hidden rounded-xl border">
                    <ChatContactsPanel
                        selectedContactId={selectedContact?.id ?? null}
                        onSelectContact={handleSelectContact}
                    />
                    {selectedContact ? (
                        <ChatConversationPanel
                            contactId={selectedContact.id}
                            contactUsername={selectedContact.username}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                            <MessageCircle className="h-10 w-10" />
                            <p className="text-sm">Select a contact to start chatting</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
