import { NextRequest, NextResponse } from 'next/server'
import type { CompatibilityScoreResponse } from '@/entities/match/model/types'

const SUMMARIES = [
    'You share many common interests and values.',
    'Great potential for a meaningful connection!',
    'Your personalities complement each other well.',
    'A promising match with shared lifestyle goals.',
    'You have a lot in common — worth exploring!',
]

const REASONS_POOL = [
    'Similar lifestyle preferences',
    'Compatible age range',
    'Shared interests detected',
    'Geographic proximity',
    'Complementary personality traits',
    'Matching relationship goals',
    'Both value communication',
    'Similar activity levels',
]

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
        const { candidateId } = body

        if (!candidateId) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: 'candidateId is required' } },
                { status: 400 },
            )
        }

        // Generate a deterministic-ish score based on candidateId
        const seed = Number(candidateId) || candidateId.length
        const score = 60 + (seed % 36) // 60-95 range

        const summaryIndex = seed % SUMMARIES.length
        const reasonCount = 2 + (seed % 3) // 2-4 reasons
        const reasons: string[] = []

        for (let i = 0; i < reasonCount; i++) {
            reasons.push(REASONS_POOL[(seed + i) % REASONS_POOL.length])
        }

        const result: CompatibilityScoreResponse = {
            score,
            summary: SUMMARIES[summaryIndex],
            reasons,
        }

        return NextResponse.json(result)
    } catch (error) {
        console.error('[Match Compatibility]', error)
        const message = error instanceof Error ? error.message : 'Failed to calculate compatibility'
        return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message } }, { status: 500 })
    }
}
