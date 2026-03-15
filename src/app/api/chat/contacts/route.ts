import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import type { ChatContactsResponse, ContactPreview } from '@/entities/chat/model/types'

const DATING_API_URL = process.env.DATING_EXTERNAL_API_URL || 'https://api.fotochat.com/'
const DATING_API_KEY = process.env.DATING_EXTERNAL_API_KEY || ''

type ContactBlock = {
    m_id?: number
    pseudo?: string
    photo?: string
    nb_new?: number
    online?: string
    is_friend?: number
    tab_last_msg?: string | string[] | null
}

type LoadContactsResponse = {
    contacts?: ContactBlock[]
}

const mapOnlineStatus = (value?: string): boolean => value === 'green'

const mapContact = (contact: ContactBlock): ContactPreview => ({
    id: String(contact.m_id ?? 0),
    username: contact.pseudo ?? 'Unknown',
    avatarUrl: contact.photo ?? null,
    unreadCount: contact.nb_new ?? 0,
    isOnline: mapOnlineStatus(contact.online),
    lastMessage: Array.isArray(contact.tab_last_msg)
        ? contact.tab_last_msg[0] ?? null
        : contact.tab_last_msg ?? null,
    lastMessageAt: null,
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

        const response = await axios.get<LoadContactsResponse>(
            `${DATING_API_URL}ajax_api/load_contacts`,
            {
                params: {
                    session_id: sessionId,
                    filter: 1,
                    api_key: DATING_API_KEY,
                },
            },
        )

        const contacts = response.data.contacts?.map(mapContact) ?? []

        const result: ChatContactsResponse = { data: contacts }
        return NextResponse.json(result)
    } catch (error) {
        console.error('[Chat Contacts]', error)
        const message = error instanceof Error ? error.message : 'Failed to load contacts'
        return NextResponse.json(
            { error: { code: 'INTERNAL_ERROR', message } },
            { status: 500 },
        )
    }
}
