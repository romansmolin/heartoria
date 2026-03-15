import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Get session cookie (dual check)
    const sessionToken =
        request.cookies.get('better-auth.session_token') ??
        request.cookies.get('dating_session_id')

    // Protected routes that require authentication
    const isProtectedRoute =
        pathname.startsWith('/dashboard') ||
        pathname.startsWith('/wallet') ||
        pathname.startsWith('/match') ||
        pathname.startsWith('/chat') ||
        pathname.startsWith('/profile') ||
        pathname.startsWith('/gifts') ||
        pathname.startsWith('/activity')

    // Auth routes that should redirect to dashboard if already authenticated
    const isAuthRoute = pathname.startsWith('/auth')

    // If accessing protected route without session, redirect to auth
    if (isProtectedRoute && !sessionToken) {
        const url = new URL('/auth', request.url)
        return NextResponse.redirect(url)
    }

    // If accessing auth route with session, redirect to dashboard
    if (isAuthRoute && sessionToken) {
        const url = new URL('/dashboard', request.url)
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|public|api|gifts-1|gifts-2|gifts-3).*)'],
}
