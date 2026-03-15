import { apiClient } from '@/shared/api/client/axios.config'
import type {
    ChatContactsResponse,
    ChatMessagesResponse,
    SendChatMessageRequest,
    SendChatMessageResponse,
} from '../../../model/types'

export async function getChatContacts(): Promise<ChatContactsResponse> {
    const response = await apiClient.get<ChatContactsResponse>('/api/chat/contacts')
    return response.data
}

export async function getChatMessages(contactId: string, contact?: string): Promise<ChatMessagesResponse> {
    const response = await apiClient.get<ChatMessagesResponse>('/api/chat/messages', {
        params: { contactId, ...(contact ? { contact } : {}) },
    })
    return response.data
}

export async function sendChatMessage(data: SendChatMessageRequest): Promise<SendChatMessageResponse> {
    const response = await apiClient.post<SendChatMessageResponse>('/api/chat/send', data)
    return response.data
}
