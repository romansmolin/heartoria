import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { DATING_API_URL, DATING_API_KEY, cleanParams } from '../../_lib/fotochat-mappers'
import type { MatchActionResponse } from '@/entities/match/model/types'

type FotochatMatchResponse = {
    connected?: number
    match?: boolean
    result?: string | number
}

export async function POST(request: NextRequest) {
    try {
        const sessionId = request.cookies.get('dating_session_id')?.value
        if (!sessionId) {
            return NextResponse.json(
                { error: { code: 'AUTH_REQUIRED', message: 'Authentication required' } },
                { status: 401 },
            )
        }

        const body = await request.json()
        const { candidateId, action } = body

        if (!candidateId || !action || !['like', 'dislike'].includes(action)) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: 'candidateId and action (like/dislike) are required' } },
                { status: 400 },
            )
        }

        const fotochatAction = action === 'like' ? 'set_like' : 'set_dislike'

        const params = cleanParams({
            action: fotochatAction,
            id_user: candidateId,
            session_id: sessionId,
            api_key: DATING_API_KEY,
        })

        const response = await axios.post<FotochatMatchResponse>(
            `${DATING_API_URL}index_api/match`,
            undefined,
            { params },
        )

        const data = response.data

        if (data.connected === 0) {
            return NextResponse.json(
                { error: { code: 'AUTH_REQUIRED', message: 'Session expired' } },
                { status: 401 },
            )
        }

        const result: MatchActionResponse = {
            matched: data.match === true,
            matchId: data.result ? String(data.result) : null,
        }

        return NextResponse.json(result)
    } catch (error) {
        console.error('[Match Action]', error)
        const message = error instanceof Error ? error.message : 'Failed to perform match action'
        return NextResponse.json(
            { error: { code: 'INTERNAL_ERROR', message } },
            { status: 500 },
        )
    }
}
