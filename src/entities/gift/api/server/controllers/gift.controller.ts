import { injectable, inject } from 'inversify'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { GiftService } from '../services/gift.service'

const giftIdBodySchema = z.object({
    giftId: z.string().trim().min(1),
})

const sendGiftBodySchema = z.object({
    recipientUserId: z.number().int().positive(),
    giftId: z.string().trim().min(1),
})

function parseLimit(url: URL): number {
    const raw = url.searchParams.get('limit')
    if (!raw) return 20
    const n = parseInt(raw, 10)
    if (isNaN(n) || n < 1) return 20
    return Math.min(n, 100)
}

@injectable()
export class GiftController {
    constructor(@inject(GiftService) private service: GiftService) {}

    async getCatalog(): Promise<NextResponse> {
        const result = await this.service.listCatalog()
        return NextResponse.json(result)
    }

    async getInventory(userId: string): Promise<NextResponse> {
        const result = await this.service.listInventory(userId)
        return NextResponse.json(result)
    }

    async getHistory(request: NextRequest, userId: string): Promise<NextResponse> {
        const limit = parseLimit(new URL(request.url))
        const result = await this.service.listHistory(userId, limit)
        return NextResponse.json(result)
    }

    async buyGift(request: NextRequest, userId: string): Promise<NextResponse> {
        const body = await request.json()
        const parsed = giftIdBodySchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: { code: 'VALIDATION_ERROR', message: 'giftId is required' } },
                { status: 400 },
            )
        }
        const result = await this.service.buyGift({
            userId,
            giftId: parsed.data.giftId,
        })
        return NextResponse.json(result)
    }

    async sendGift(request: NextRequest, userId: string): Promise<NextResponse> {
        const sessionId = request.cookies.get('dating_session_id')?.value
        if (!sessionId) {
            return NextResponse.json(
                { error: { code: 'AUTH_REQUIRED', message: 'Authentication required' } },
                { status: 401 },
            )
        }

        const body = await request.json()
        const parsed = sendGiftBodySchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: { code: 'VALIDATION_ERROR', message: 'recipientUserId and giftId are required' } },
                { status: 400 },
            )
        }

        const result = await this.service.sendGift({
            senderUserId: userId,
            recipientUserId: parsed.data.recipientUserId,
            giftId: parsed.data.giftId,
            sessionId,
        })
        return NextResponse.json(result)
    }
}
