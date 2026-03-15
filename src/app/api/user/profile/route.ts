import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import {
    DATING_API_URL,
    DATING_API_KEY,
    mapGenderToUserGender,
    pickPhotoUrl,
    mapPhotos,
    cleanParams,
    type MembreBlock,
} from '../../_lib/fotochat-mappers'
import type { UserProfile } from '@/entities/user/model/types'

type FotochatUserResponse = {
    connected?: number
    result?: MembreBlock
}

function mapMemberToProfile(member: MembreBlock, userId: string): UserProfile {
    const photos = mapPhotos(member)
    return {
        id: String(member.id ?? userId),
        userId,
        username: member.pseudo ?? 'User',
        fullName: member.prenom ?? null,
        email: member.email ?? '',
        description: member.description ?? null,
        gender: mapGenderToUserGender(member.sexe1),
        age: member.age ?? null,
        location: member.zone_name ?? null,
        height: member.taille ?? null,
        weight: member.poids ?? null,
        eyeColor: member.yeux ?? null,
        hairColor: member.cheveux ?? null,
        bodyType: member.silhouette ?? null,
        ethnicity: member.origine ?? null,
        smoking: member.fume ?? null,
        drinking: member.alcool ?? null,
        education: member.etude ?? null,
        occupation: member.profession ?? null,
        income: member.salaire ?? null,
        relationshipStatus: member.situation ?? null,
        lookingFor: member.cherche ?? null,
        interests: member.interets ?? null,
        photos: photos.map((p, i) => ({
            id: String(i),
            url: p.url,
            isPrimary: p.isPrimary,
            order: i,
        })),
        avatarUrl: pickPhotoUrl(member),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
}

export async function GET(request: NextRequest) {
    try {
        const sessionId = request.cookies.get('dating_session_id')?.value
        const userId = request.cookies.get('dating_user_id')?.value
        if (!sessionId || !userId) {
            return NextResponse.json(
                { error: { code: 'AUTH_REQUIRED', message: 'Authentication required' } },
                { status: 401 },
            )
        }

        const response = await axios.post<FotochatUserResponse>(
            `${DATING_API_URL}index_api/user`,
            undefined,
            {
                params: {
                    id: userId,
                    session_id: sessionId,
                    api_key: DATING_API_KEY,
                    get_picture_430: 1,
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

        if (!data.result) {
            return NextResponse.json(
                { error: { code: 'NOT_FOUND', message: 'Profile not found' } },
                { status: 404 },
            )
        }

        const profile = mapMemberToProfile(data.result, userId)
        return NextResponse.json({ data: profile })
    } catch (error) {
        console.error('[User Profile GET]', error)
        const message = error instanceof Error ? error.message : 'Failed to fetch profile'
        return NextResponse.json(
            { error: { code: 'INTERNAL_ERROR', message } },
            { status: 500 },
        )
    }
}

const FIELD_MAP: Record<string, string> = {
    fullName: 'prenom',
    description: 'description',
    height: 'taille',
    weight: 'poids',
    eyeColor: 'yeux',
    hairColor: 'cheveux',
    bodyType: 'silhouette',
    ethnicity: 'origine',
    smoking: 'fume',
    drinking: 'alcool',
    education: 'etude',
    occupation: 'profession',
    income: 'salaire',
    relationshipStatus: 'situation',
    lookingFor: 'cherche',
    interests: 'interets',
}

export async function PUT(request: NextRequest) {
    try {
        const sessionId = request.cookies.get('dating_session_id')?.value
        const userId = request.cookies.get('dating_user_id')?.value
        if (!sessionId || !userId) {
            return NextResponse.json(
                { error: { code: 'AUTH_REQUIRED', message: 'Authentication required' } },
                { status: 401 },
            )
        }

        const body = await request.json()

        // Map client field names to fotochat field names
        const mappedFields: Record<string, unknown> = {}
        for (const [clientKey, value] of Object.entries(body)) {
            const fotochatKey = FIELD_MAP[clientKey]
            if (fotochatKey && value !== undefined) {
                mappedFields[fotochatKey] = value
            }
        }

        const params = cleanParams({
            action: 'update',
            session_id: sessionId,
            api_key: DATING_API_KEY,
            ...mappedFields,
        })

        const updateResponse = await axios.post(
            `${DATING_API_URL}index_api/user`,
            undefined,
            { params },
        )

        if (updateResponse.data.connected === 0) {
            return NextResponse.json(
                { error: { code: 'AUTH_REQUIRED', message: 'Session expired' } },
                { status: 401 },
            )
        }

        // Fetch fresh profile after update
        const profileResponse = await axios.post<FotochatUserResponse>(
            `${DATING_API_URL}index_api/user`,
            undefined,
            {
                params: {
                    id: userId,
                    session_id: sessionId,
                    api_key: DATING_API_KEY,
                    get_picture_430: 1,
                },
            },
        )

        const profile = profileResponse.data.result
            ? mapMemberToProfile(profileResponse.data.result, userId)
            : null

        if (!profile) {
            return NextResponse.json(
                { error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch updated profile' } },
                { status: 500 },
            )
        }

        return NextResponse.json({ data: profile })
    } catch (error) {
        console.error('[User Profile PUT]', error)
        const message = error instanceof Error ? error.message : 'Failed to update profile'
        return NextResponse.json(
            { error: { code: 'INTERNAL_ERROR', message } },
            { status: 500 },
        )
    }
}
