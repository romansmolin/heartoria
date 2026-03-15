import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import {
    DATING_API_URL,
    DATING_API_KEY,
    pickPhotoUrl,
    type MembreBlock,
} from '../_lib/fotochat-mappers'
import type { MatchItem, MatchListResponse } from '@/entities/match/model/types'

type MatchMemberBlock = MembreBlock & { match_id?: number; match_date?: string }

type GetMatchesResponse = {
    connected?: number
    result?: MatchMemberBlock[] | Record<string, MatchMemberBlock>
    total?: number
}

export async function GET(request: NextRequest) {
    try {
        const sessionId = request.cookies.get('dating_session_id')?.value
        const userId = request.cookies.get('dating_user_id')?.value
        if (!sessionId) {
            return NextResponse.json(
                { error: { code: 'AUTH_REQUIRED', message: 'Authentication required' } },
                { status: 401 },
            )
        }

        const response = await axios.post<GetMatchesResponse>(
            `${DATING_API_URL}index_api/match`,
            undefined,
            {
                params: {
                    action: 'get_matches',
                    session_id: sessionId,
                    api_key: DATING_API_KEY,
                },
            },
        )

        const data = response.data

        if (data.connected === 0) {
            return NextResponse.json(
                { error: { code: 'AUTH_REQUIRED', message: 'Session expired' } },
                { status: 401 },
            )
        }

        const rawResult = data.result ?? []
        const resultArray: MatchMemberBlock[] = Array.isArray(rawResult) ? rawResult : Object.values(rawResult)

        const matches: MatchItem[] = resultArray.map((m) => ({
            id: String(m.match_id ?? m.id ?? 0),
            userId: userId ?? '',
            matchedUserId: String(m.id ?? 0),
            username: m.pseudo ?? m.prenom ?? 'Member',
            avatarUrl: pickPhotoUrl(m),
            createdAt: m.match_date ?? new Date().toISOString(),
        }))

        const result: MatchListResponse = {
            data: matches,
            total: data.total ?? matches.length,
        }

        return NextResponse.json(result)
    } catch (error) {
        console.error('[Match List]', error)
        const message = error instanceof Error ? error.message : 'Failed to fetch matches'
        return NextResponse.json(
            { error: { code: 'INTERNAL_ERROR', message } },
            { status: 500 },
        )
    }
}
