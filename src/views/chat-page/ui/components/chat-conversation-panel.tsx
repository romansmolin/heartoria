'use client'

import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Textarea } from '@/shared/ui/textarea'
import { Skeleton } from '@/shared/ui/skeleton'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { useGetChatMessagesQuery, useSendChatMessageMutation } from '@/entities/chat'
import { cn } from '@/shared/lib/css/utils'

interface ChatConversationPanelProps {
    contactId: string
    contactUsername: string
}

function getCookie(name: string): string | undefined {
    if (typeof document === 'undefined') return undefined
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
    return match?.[1]
}

export function ChatConversationPanel({ contactId, contactUsername }: ChatConversationPanelProps) {
    const [message, setMessage] = useState('')
    const bottomRef = useRef<HTMLDivElement>(null)

    const currentUserId = getCookie('dating_user_id')
    const { data, isLoading, isError } = useGetChatMessagesQuery(
        { contactId, contact: contactUsername },
        { pollingInterval: 10000 },
    )
    const [sendMessage, { isLoading: isSending }] = useSendChatMessageMutation()

    const messages = data?.data ?? []

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages.length])

    const handleSend = async () => {
        const trimmed = message.trim()
        if (!trimmed) return

        try {
            await sendMessage({ contactId, contactUsername, content: trimmed }).unwrap()
            setMessage('')
        } catch {
            // error handled by RTK Query
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="flex h-full flex-col">
            <ScrollArea className="flex-1 p-4">
                {isLoading && (
                    <div className="space-y-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className={cn('h-10 w-48 rounded-lg', i % 2 === 0 ? 'ml-auto' : '')} />
                        ))}
                    </div>
                )}
                {isError && <p className="text-sm text-red-500">Failed to load messages.</p>}
                {!isLoading && messages.length === 0 && (
                    <p className="text-center text-sm text-muted-foreground">No messages yet. Say hello!</p>
                )}
                <div className="space-y-2">
                    {messages.map((msg) => {
                        const isMine = msg.senderId === currentUserId
                        return (
                            <div
                                key={msg.id}
                                className={cn('flex', isMine ? 'justify-end' : 'justify-start')}
                            >
                                <div
                                    className={cn(
                                        'max-w-[70%] rounded-lg px-3 py-2 text-sm',
                                        isMine
                                            ? 'bg-rose-500 text-white'
                                            : 'bg-slate-100 text-slate-900',
                                    )}
                                >
                                    <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                                    <p
                                        className={cn(
                                            'mt-1 text-[10px]',
                                            isMine ? 'text-white/70' : 'text-muted-foreground',
                                        )}
                                    >
                                        {new Date(msg.createdAt).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                    <div ref={bottomRef} />
                </div>
            </ScrollArea>
            <div className="border-t p-3">
                <div className="flex gap-2">
                    <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="min-h-[40px] resize-none"
                        rows={1}
                    />
                    <Button
                        size="icon"
                        disabled={!message.trim() || isSending}
                        onClick={handleSend}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
