import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import {
    DATING_API_URL,
    DATING_API_KEY,
    mapPhotos,
    type MembreBlock,
} from '../../_lib/fotochat-mappers'

type FotochatUserResponse = {
    connected?: number
    result?: MembreBlock
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

        const photos = data.result ? mapPhotos(data.result).map((p, i) => ({
            id: String(i),
            url: p.url,
            isPrimary: p.isPrimary,
            order: i,
        })) : []

        return NextResponse.json({ data: photos })
    } catch (error) {
        console.error('[User Photos GET]', error)
        const message = error instanceof Error ? error.message : 'Failed to fetch photos'
        return NextResponse.json(
            { error: { code: 'INTERNAL_ERROR', message } },
            { status: 500 },
        )
    }
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

        const formData = await request.formData()
        const file = formData.get('photo')

        if (!file) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: 'photo file is required' } },
                { status: 400 },
            )
        }

        // Forward multipart upload to fotochat
        const uploadForm = new FormData()
        uploadForm.append('photo', file)

        const response = await axios.post(
            `${DATING_API_URL}index_api/photos`,
            uploadForm,
            {
                params: {
                    action: 'upload',
                    session_id: sessionId,
                    api_key: DATING_API_KEY,
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
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

        return NextResponse.json({
            data: {
                id: String(data.photo_id ?? Date.now()),
                url: data.url ?? '',
                isPrimary: false,
                order: 0,
            },
        })
    } catch (error) {
        console.error('[User Photos POST]', error)
        const message = error instanceof Error ? error.message : 'Failed to upload photo'
        return NextResponse.json(
            { error: { code: 'INTERNAL_ERROR', message } },
            { status: 500 },
        )
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const sessionId = request.cookies.get('dating_session_id')?.value
        if (!sessionId) {
            return NextResponse.json(
                { error: { code: 'AUTH_REQUIRED', message: 'Authentication required' } },
                { status: 401 },
            )
        }

        const { searchParams } = new URL(request.url)
        const photoId = searchParams.get('photoId')

        if (!photoId) {
            return NextResponse.json(
                { error: { code: 'INVALID_INPUT', message: 'photoId is required' } },
                { status: 400 },
            )
        }

        const response = await axios.post(
            `${DATING_API_URL}index_api/photos`,
            undefined,
            {
                params: {
                    action: 'delete',
                    photo_id: photoId,
                    session_id: sessionId,
                    api_key: DATING_API_KEY,
                },
            },
        )

        if (response.data.connected === 0) {
            return NextResponse.json(
                { error: { code: 'AUTH_REQUIRED', message: 'Session expired' } },
                { status: 401 },
            )
        }

        return NextResponse.json({ data: { deleted: true } })
    } catch (error) {
        console.error('[User Photos DELETE]', error)
        const message = error instanceof Error ? error.message : 'Failed to delete photo'
        return NextResponse.json(
            { error: { code: 'INTERNAL_ERROR', message } },
            { status: 500 },
        )
    }
}
