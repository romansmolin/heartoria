import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { DATING_API_URL, DATING_API_KEY } from '../_lib/fotochat-mappers'

type FotochatPhotoEntry = {
    normal?: string
    sq_small?: string
    sq_middle?: string
    sq_430?: string
    is_main?: string | number
}

type FotochatActivityEntry = {
    id?: number | string
    user_id?: number | string
    pseudo?: string
    prenom?: string
    age?: number | string
    action?: string
    action_type?: string
    date_action?: string
    zone_name?: string
    all_photos?: FotochatPhotoEntry[] | Record<string, FotochatPhotoEntry>
    tab_photo?: { sq_middle?: string; sq_small?: string; normal?: string }[]
    online?: string
}

type FotochatWallResponse = {
    connected?: number
    result?: FotochatActivityEntry[] | Record<string, FotochatActivityEntry>
    data?: FotochatActivityEntry[] | Record<string, FotochatActivityEntry>
}

interface ActivityItem {
    id: string
    type: string
    userId: string
    username: string
    avatarUrl: string | null
    content: string | null
    createdAt: string
}

function pickAvatar(entry: FotochatActivityEntry): string | null {
    // Try tab_photo first (always an array)
    const tabPhoto = entry.tab_photo?.[0]
    if (tabPhoto) {
        return tabPhoto.sq_middle ?? tabPhoto.sq_small ?? tabPhoto.normal ?? null
    }
    // Try all_photos
    const allPhotos = entry.all_photos
    if (allPhotos) {
        const photos = Array.isArray(allPhotos) ? allPhotos : Object.values(allPhotos)
        const main = photos.find(p => String(p.is_main) === '1') ?? photos[0]
        if (main) return main.sq_430 ?? main.sq_middle ?? main.sq_small ?? main.normal ?? null
    }
    return null
}

function formatAction(action?: string): string {
    switch (action) {
        case 'birthday': return 'has a birthday today'
        case 'visite': return 'visited your profile'
        case 'new_photo': return 'uploaded a new photo'
        case 'new_member': return 'joined the community'
        case 'update_profile': return 'updated their profile'
        default: return action ?? 'activity'
    }
}

function mapActivityEntry(entry: FotochatActivityEntry): ActivityItem {
    return {
        id: String(entry.id ?? entry.user_id ?? 0),
        type: entry.action ?? entry.action_type ?? 'update',
        userId: String(entry.user_id ?? entry.id ?? 0),
        username: entry.pseudo ?? entry.prenom ?? 'User',
        avatarUrl: pickAvatar(entry),
        content: formatAction(entry.action ?? entry.action_type),
        createdAt: entry.date_action ?? new Date().toISOString(),
    }
}

export async function GET(request: NextRequest) {
    try {
        const sessionId = request.cookies.get('dating_session_id')?.value
        if (!sessionId) {
            return NextResponse.json(
                { error: { code: 'AUTH_REQUIRED', message: 'Authentication required' } },
                { status: 401 },
            )
        }

        const response = await axios.post<FotochatWallResponse>(
            `${DATING_API_URL}index_api/wall`,
            undefined,
            {
                params: {
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

        const rawEntries = data.result ?? data.data ?? []
        const entries = Array.isArray(rawEntries) ? rawEntries : Object.values(rawEntries)

        return NextResponse.json({
            data: (entries as FotochatActivityEntry[]).map(mapActivityEntry),
        })
    } catch (error) {
        console.error('[Activity Wall]', error)
        const message = error instanceof Error ? error.message : 'Failed to fetch activity'
        return NextResponse.json(
            { error: { code: 'INTERNAL_ERROR', message } },
            { status: 500 },
        )
    }
}
