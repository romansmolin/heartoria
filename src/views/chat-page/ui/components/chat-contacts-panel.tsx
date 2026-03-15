'use client'

import { User } from 'lucide-react'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { Skeleton } from '@/shared/ui/skeleton'
import { useGetChatContactsQuery } from '@/entities/chat'
import { cn } from '@/shared/lib/css/utils'

interface ChatContactsPanelProps {
    selectedContactId: string | null
    onSelectContact: (id: string, username: string) => void
}

export function ChatContactsPanel({ selectedContactId, onSelectContact }: ChatContactsPanelProps) {
    const { data, isLoading, isError } = useGetChatContactsQuery()

    const contacts = data?.data ?? []

    return (
        <div className="flex h-full flex-col border-r">
            <div className="border-b p-4">
                <h2 className="text-sm font-semibold">Contacts</h2>
            </div>
            <ScrollArea className="flex-1">
                {isLoading && (
                    <div className="space-y-2 p-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-3 p-2">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="flex-1 space-y-1">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {isError && (
                    <p className="p-4 text-sm text-red-500">Failed to load contacts.</p>
                )}
                {!isLoading && contacts.length === 0 && (
                    <p className="p-4 text-sm text-muted-foreground">No contacts yet.</p>
                )}
                <div className="space-y-0.5 p-2">
                    {contacts.map((contact) => (
                        <button
                            key={contact.id}
                            type="button"
                            onClick={() => onSelectContact(contact.id, contact.username)}
                            className={cn(
                                'flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-slate-100',
                                selectedContactId === contact.id && 'bg-slate-100',
                            )}
                        >
                            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100">
                                {contact.avatarUrl ? (
                                    <img src={contact.avatarUrl} alt="" className="h-full w-full object-cover" />
                                ) : (
                                    <User className="h-5 w-5 text-slate-400" />
                                )}
                                {contact.isOnline && (
                                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
                                )}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="truncate text-sm font-medium">{contact.username}</p>
                                    {contact.unreadCount > 0 && (
                                        <span className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                                            {contact.unreadCount}
                                        </span>
                                    )}
                                </div>
                                {contact.lastMessage && (
                                    <p className="truncate text-xs text-muted-foreground">
                                        {contact.lastMessage}
                                    </p>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}
