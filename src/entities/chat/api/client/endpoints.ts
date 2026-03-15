import { api } from '@/shared/api/client/api'
import { normalizeError } from '@/shared/api/client/error-normalizer'
import { getChatContacts, getChatMessages, sendChatMessage } from './services/chat.service'
import type {
    ChatContactsResponse,
    ChatMessagesResponse,
    SendChatMessageRequest,
    SendChatMessageResponse,
} from '../../model/types'

export const chatApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getChatContacts: builder.query<ChatContactsResponse, void>({
            queryFn: async () => {
                try {
                    const data = await getChatContacts()
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return {
                        error: {
                            status: 'CUSTOM_ERROR' as const,
                            data: normalized,
                            error: normalized.message,
                        },
                    }
                }
            },
            providesTags: ['Chat'],
        }),
        getChatMessages: builder.query<ChatMessagesResponse, { contactId: string; contact?: string }>({
            queryFn: async ({ contactId, contact }) => {
                try {
                    const data = await getChatMessages(contactId, contact)
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return {
                        error: {
                            status: 'CUSTOM_ERROR' as const,
                            data: normalized,
                            error: normalized.message,
                        },
                    }
                }
            },
            providesTags: ['Chat'],
        }),
        sendChatMessage: builder.mutation<SendChatMessageResponse, SendChatMessageRequest>({
            queryFn: async (request) => {
                try {
                    const data = await sendChatMessage(request)
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return {
                        error: {
                            status: 'CUSTOM_ERROR' as const,
                            data: normalized,
                            error: normalized.message,
                        },
                    }
                }
            },
            invalidatesTags: ['Chat'],
        }),
    }),
})

export const {
    useGetChatContactsQuery,
    useGetChatMessagesQuery,
    useSendChatMessageMutation,
} = chatApi
