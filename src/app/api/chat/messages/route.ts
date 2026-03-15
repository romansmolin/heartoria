import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import type { ChatMessagesResponse, ChatMessage } from '@/entities/chat/model/types'

const DATING_API_URL = process.env.DATING_EXTERNAL_API_URL || 'https://api.fotochat.com/'
const DATING_API_KEY = process.env.DATING_EXTERNAL_API_KEY || ''

type EclairBlock = {
    id?: number
    exp?: number
    date?: string
    msg?: string
    p_extra?: string
    album_share?: string
    state?: string
}

type LoadMessagesResponse = {
    credits_counter?: number
    eclairs?: EclairBlock[]
}

const mapMessage = (msg: EclairBlock): ChatMessage => ({
    id: String(msg.id ?? `${msg.exp ?? 'msg'}-${msg.date ?? Date.now()}`),
    senderId: String(msg.exp ?? ''),
    receiverId: '',
    content: msg.msg ?? '',
    createdAt: msg.date ?? new Date().toISOString(),
    isRead: true,
})

export async function GET(request: NextRequest) {
    try {
        const sessionId = request.cookies.get('dating_session_id')?.value
        if (!sessionId) {
            return NextResponse.json(
                { error: { code: 'AUTH_REQUIRED', message: 'Authentication required' } },
                { status: 401 },
            )
        }

        const { searchParams } = new URL(request.url)
        const contactId = searchParams.get('contactId')
        const contact = searchParams.get('contact')

        if (!contactId) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: 'contactId is required' } },
                { status: 400 },
            )
        }

        const response = await axios.get<LoadMessagesResponse>(
            `${DATING_API_URL}ajax_api/load_messages`,
            {
                params: {
                    'api-key': DATING_API_KEY,
                    session_id: sessionId,
                    contact_id: Number(contactId),
                    ...(contact ? { contact } : {}),
                },
            },
        )

        const messages = response.data.eclairs?.map(mapMessage) ?? []

        const result: ChatMessagesResponse = { data: messages }
        return NextResponse.json(result)
    } catch (error) {
        console.error('[Chat Messages]', error)
        const message = error instanceof Error ? error.message : 'Failed to load messages'
        return NextResponse.json(
            { error: { code: 'INTERNAL_ERROR', message } },
            { status: 500 },
        )
    }
}
