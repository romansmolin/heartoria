import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import type { SendChatMessageResponse, ChatMessage } from '@/entities/chat/model/types'

const DATING_API_URL = process.env.DATING_EXTERNAL_API_URL || 'https://api.fotochat.com/'
const DATING_API_KEY = process.env.DATING_EXTERNAL_API_KEY || ''

type FotochatSendResponse = {
    notification?: string
    msg?: string
    p_extra?: string
    date?: string
    id?: number
}

export async function POST(request: NextRequest) {
    try {
        const sessionId = request.cookies.get('dating_session_id')?.value
        const userId = request.cookies.get('dating_user_id')?.value
        if (!sessionId) {
            return NextResponse.json(
                { error: { code: 'AUTH_REQUIRED', message: 'Authentication required' } },
                { status: 401 },
            )
        }

        const body = await request.json()
        const { contactId, contactUsername, content } = body

        if (!contactId || !content?.trim()) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: 'contactId and content are required' } },
                { status: 400 },
            )
        }

        const response = await axios.get<FotochatSendResponse>(
            `${DATING_API_URL}ajax_api/send_message`,
            {
                params: {
                    'api-key': DATING_API_KEY,
                    session_id: sessionId,
                    dest: contactUsername || contactId,
                    msg: content.trim(),
                },
            },
        )

        const data = response.data

        const sentMessage: ChatMessage = {
            id: String(data.id ?? Date.now()),
            senderId: userId ?? '',
            receiverId: contactId,
            content: data.msg ?? content.trim(),
            createdAt: data.date ?? new Date().toISOString(),
            isRead: false,
        }

        const result: SendChatMessageResponse = { data: sentMessage }
        return NextResponse.json(result)
    } catch (error) {
        console.error('[Chat Send]', error)
        const message = error instanceof Error ? error.message : 'Failed to send message'
        return NextResponse.json(
            { error: { code: 'INTERNAL_ERROR', message } },
            { status: 500 },
        )
    }
}
