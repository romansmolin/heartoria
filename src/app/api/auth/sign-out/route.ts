import { NextResponse } from 'next/server'

const DATING_COOKIES = ['dating_session_id', 'dating_user_id', 'dating_token_login', 'dating_lang']

export async function POST() {
    const response = NextResponse.json({ success: true })

    for (const name of DATING_COOKIES) {
        response.cookies.set(name, '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 0,
        })
    }

    return response
}
