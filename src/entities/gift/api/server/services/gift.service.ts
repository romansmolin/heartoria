import 'server-only'
import { injectable, inject } from 'inversify'
import { GiftRepository } from '../repositories/gift.repo'
import { GIFT_PORT_TOKENS, type MatchReaderPort } from '../../../model/ports/match-reader.port'
import { resolveGiftImagePath } from '../../../lib/resolve-gift-image-path'
import { resolveGiftDisplayName } from '../../../lib/resolve-gift-display-name'
import { isProjectGiftSlug } from '../../../lib/gift-asset-map'
import type {
    GiftCatalogResponse,
    GiftInventoryResponse,
    BuyGiftResponse,
    SendGiftResponse,
    GiftHistoryResponse,
} from '../../../model/types'

@injectable()
export class GiftService {
    constructor(
        @inject(GiftRepository) private repo: GiftRepository,
        @inject(GIFT_PORT_TOKENS.MatchReaderPort) private matchReader: MatchReaderPort,
    ) {}

    async listCatalog(): Promise<GiftCatalogResponse> {
        const rows = await this.repo.listCatalog()
        return {
            items: rows.map((r) => ({
                id: r.id,
                slug: r.slug,
                name: resolveGiftDisplayName(r.slug, r.name),
                imagePath: resolveGiftImagePath(r.slug, r.imagePath),
                priceCoins: r.priceCoins,
            })),
        }
    }

    async listInventory(userId: string): Promise<GiftInventoryResponse> {
        const rows = await this.repo.listUserInventory(userId)
        return {
            items: rows.map((r) => ({
                giftId: r.giftId,
                giftName: resolveGiftDisplayName(r.giftSlug, r.giftName),
                giftImagePath: resolveGiftImagePath(r.giftSlug, r.giftImagePath),
                quantity: r.quantity,
                updatedAt: r.updatedAt.toISOString(),
            })),
        }
    }

    async listHistory(senderUserId: string, limit?: number): Promise<GiftHistoryResponse> {
        const rows = await this.repo.listUserGiftHistory(senderUserId, limit)
        return {
            items: rows.map((r) => ({
                id: r.id,
                giftId: r.giftId,
                giftName: resolveGiftDisplayName(r.giftSlug, r.giftName),
                giftImagePath: resolveGiftImagePath(r.giftSlug, r.giftImagePath),
                recipientUserId: r.recipientDatingUserId,
                priceCoins: r.priceCoins,
                createdAt: r.createdAt.toISOString(),
            })),
        }
    }

    async buyGift(input: { userId: string; giftId: string }): Promise<BuyGiftResponse> {
        const gift = await this.repo.findGiftById(input.giftId)
        if (!gift || !isProjectGiftSlug(gift.slug)) {
            throw new Error('Gift not found')
        }
        if (!gift.priceCoins && gift.priceCoins !== 0) {
            throw new Error('Gift is inactive')
        }

        const result = await this.repo.buyGiftTransactional({
            userId: input.userId,
            giftId: input.giftId,
            giftName: resolveGiftDisplayName(gift.slug, gift.name),
            priceCoins: gift.priceCoins,
        })

        return {
            giftId: input.giftId,
            purchasedQuantity: 1,
            inventoryQuantity: result.inventoryQuantity,
            spentCoins: gift.priceCoins,
            remainingBalance: result.remainingBalance,
        }
    }

    async sendGift(input: {
        senderUserId: string
        recipientUserId: number
        giftId: string
        sessionId: string
    }): Promise<SendGiftResponse> {
        // Validate gift exists
        const gift = await this.repo.findGiftById(input.giftId)
        if (!gift || !isProjectGiftSlug(gift.slug)) {
            throw new Error('Gift not found')
        }

        // Validate recipient is in sender's match list
        const matches = await this.matchReader.listMatches(input.sessionId)
        const isMatch = matches.items.some((m) => m.id === input.recipientUserId)
        if (!isMatch) {
            throw new Error('Match not found. Gifts can be sent only to matched users.')
        }

        const result = await this.repo.sendGiftTransactional({
            senderUserId: input.senderUserId,
            recipientDatingUserId: input.recipientUserId,
            giftId: input.giftId,
            priceCoins: gift.priceCoins,
        })

        return {
            giftSendId: result.giftSendId,
            giftId: input.giftId,
            recipientUserId: input.recipientUserId,
            remainingInventory: result.remainingInventory,
            createdAt: result.createdAt.toISOString(),
        }
    }
}
