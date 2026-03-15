import { NextRequest, NextResponse } from 'next/server'
import { signIn } from '@/shared/lib/auth/external-auth.service'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { username, password, rememberMe } = body

        if (!username || !password) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: 'Username and password are required' } },
                { status: 400 },
            )
        }

        const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            || request.headers.get('x-real-ip')
            || '0.0.0.0'
        const userAgent = request.headers.get('user-agent') || ''

        const result = await signIn({ username, password, rememberMe, ipAddress, userAgent })

        const response = NextResponse.json({
            connected: result.connected,
            sessionId: result.sessionId,
            userId: result.userId,
            tokenLogin: result.tokenLogin,
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

        if (result.tokenLogin) {
            response.cookies.set('dating_token_login', result.tokenLogin, cookieOptions)
        }

        response.cookies.set('dating_lang', result.lang || 'en', {
            ...cookieOptions,
            httpOnly: false,
        })

        return response
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Sign in failed'
        return NextResponse.json(
            { error: { code: 'INVALID_CREDENTIALS', message } },
            { status: 401 },
        )
    }
}
