import { NextRequest, NextResponse } from 'next/server'
import type { AnalyzeProfileResponse, ProfileAdviceItem } from '@/entities/user/model/types'

export async function POST(request: NextRequest) {
    try {
        const sessionId = request.cookies.get('dating_session_id')?.value
        if (!sessionId) {
            return NextResponse.json(
                { error: { code: 'AUTH_REQUIRED', message: 'Authentication required' } },
                { status: 401 },
            )
        }

        // Mock analysis — can be enhanced with real AI later
        const checklist: ProfileAdviceItem[] = [
            {
                category: 'photos',
                priority: 'high',
                reason: 'Profiles with 3+ photos get 5x more matches.',
                action: 'Upload at least 3 clear photos showing your face and interests.',
            },
            {
                category: 'bio',
                priority: 'high',
                reason: 'A descriptive bio helps others understand who you are.',
                action: 'Write a bio of at least 50 characters describing yourself.',
            },
            {
                category: 'preferences',
                priority: 'medium',
                reason: 'Setting preferences helps our matching algorithm.',
                action: 'Fill in your relationship goals and interests.',
            },
            {
                category: 'completeness',
                priority: 'low',
                reason: 'Complete profiles appear higher in search results.',
                action: 'Add your height, education, and occupation.',
            },
        ]

        const result: AnalyzeProfileResponse = {
            summary: 'Your profile has room for improvement. Focus on adding more photos and writing a compelling bio to increase your visibility.',
            score: 62,
            checklist,
        }

        return NextResponse.json(result)
    } catch (error) {
        console.error('[Profile Analyze]', error)
        const message = error instanceof Error ? error.message : 'Failed to analyze profile'
        return NextResponse.json(
            { error: { code: 'INTERNAL_ERROR', message } },
            { status: 500 },
        )
    }
}
