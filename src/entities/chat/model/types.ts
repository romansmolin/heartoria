export interface ContactPreview {
    id: string
    username: string
    avatarUrl: string | null
    lastMessage: string | null
    lastMessageAt: string | null
    unreadCount: number
    isOnline: boolean
}

export interface ChatMessage {
    id: string
    senderId: string
    receiverId: string
    content: string
    createdAt: string
    isRead: boolean
}

export interface ChatContactsResponse {
    data: ContactPreview[]
}

export interface ChatMessagesResponse {
    data: ChatMessage[]
}

export interface SendChatMessageRequest {
    contactId: string
    contactUsername: string
    content: string
}

export interface SendChatMessageResponse {
    data: ChatMessage
}
