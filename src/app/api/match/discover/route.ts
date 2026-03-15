import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import type { DiscoverMatchesResponse, MatchCandidate } from '@/entities/match/model/types'
import {
    DATING_API_URL,
    DATING_API_KEY,
    mapGender,
    pickPhotoUrl,
    mapPhotos,
    cleanParams,
    type MembreBlock,
} from '../../_lib/fotochat-mappers'

type SearchResponse = {
    connected?: number
    nb_pages?: number
    total?: number
    result?: MembreBlock[]
}

const mapMember = (member: MembreBlock): MatchCandidate => ({
    id: String(member.id ?? 0),
    username: member.pseudo ?? member.prenom ?? 'Member',
    fullName: member.prenom ?? null,
    age: member.age ?? null,
    gender: mapGender(member.sexe1),
    location: member.zone_name ?? null,
    avatarUrl: pickPhotoUrl(member),
    photos: mapPhotos(member),
    description: member.description ?? null,
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

        const { searchParams } = new URL(request.url)
        const page = searchParams.get('page') ? Number(searchParams.get('page')) : undefined
        const perPage = searchParams.get('perPage') ? Number(searchParams.get('perPage')) : undefined
        const minAge = searchParams.get('minAge') ? Number(searchParams.get('minAge')) : undefined
        const maxAge = searchParams.get('maxAge') ? Number(searchParams.get('maxAge')) : undefined
        const gender = searchParams.get('gender') ? Number(searchParams.get('gender')) : undefined
        const location = searchParams.get('location') || undefined
        const hasPhoto = searchParams.get('hasPhoto') ? Number(searchParams.get('hasPhoto')) : undefined
        const isOnline = searchParams.get('isOnline') ? Number(searchParams.get('isOnline')) : undefined

        const params = cleanParams({
            session_id: sessionId,
            api_key: DATING_API_KEY,
            page,
            pas: perPage,
            get_picture_430: 1,
            searchAction: 'Last',
            age_min: minAge,
            age_max: maxAge,
            sexe1: gender,
            zone: location,
            withPhoto: hasPhoto,
            isOnline: isOnline,
        })

        const response = await axios.post<SearchResponse>(
            `${DATING_API_URL}index_api/search`,
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

        const result: DiscoverMatchesResponse = {
            data: data.result?.map(mapMember) ?? [],
            total: data.total ?? 0,
            page: page ?? 1,
            perPage: perPage ?? 20,
        }

        return NextResponse.json(result)
    } catch (error) {
        console.error('[Match Discover]', error)
        const message = error instanceof Error ? error.message : 'Failed to fetch matches'
        return NextResponse.json(
            { error: { code: 'INTERNAL_ERROR', message } },
            { status: 500 },
        )
    }
}
