import { NextRequest, NextResponse } from 'next/server'
import { signUp } from '@/shared/lib/auth/external-auth.service'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { username, email, password, gender, lookingFor, dateOfBirth, city } = body

        if (!username || !email || !password || !gender || !lookingFor || !dateOfBirth) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: 'All required fields must be provided' } },
                { status: 400 },
            )
        }

        const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            || request.headers.get('x-real-ip')
            || '0.0.0.0'
        const userAgent = request.headers.get('user-agent') || ''

        const result = await signUp({
            username,
            email,
            password,
            gender,
            lookingFor,
            dateOfBirth,
            city,
            ipAddress,
            userAgent,
        })

        const response = NextResponse.json({
            accepted: result.accepted,
            sessionId: result.sessionId,
            userId: result.userId,
            lang: result.lang,
        })

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax' as const,
            path: '/',
            maxAge: COOKIE_MAX_AGE,
        }

        response.cookies.set('dating_session_id', result.sessionId, cookieOptions)
        response.cookies.set('dating_user_id', String(result.userId), {
            ...cookieOptions,
            httpOnly: false,
        })

        response.cookies.set('dating_lang', result.lang || 'en', {
            ...cookieOptions,
            httpOnly: false,
        })

        return response
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Sign up failed'
        return NextResponse.json(
            { error: { code: 'REGISTRATION_FAILED', message } },
            { status: 400 },
        )
    }
}
