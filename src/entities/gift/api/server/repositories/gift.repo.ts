import { injectable } from 'inversify'
import { prisma } from '@/shared/lib/database/prisma'
import { PROJECT_GIFT_SLUGS } from '../../../lib/gift-asset-map'

// ─── Row types ───

export interface GiftCatalogRow {
    id: string
    slug: string
    name: string
    imagePath: string
    priceCoins: number
}

export interface GiftInventoryRow {
    giftId: string
    giftSlug: string
    giftName: string
    giftImagePath: string
    quantity: number
    updatedAt: Date
}

export interface GiftSendHistoryRow {
    id: string
    giftId: string
    giftSlug: string
    giftName: string
    giftImagePath: string
    recipientDatingUserId: number
    priceCoins: number
    createdAt: Date
}

export interface BuyGiftTransactionalInput {
    userId: string
    giftId: string
    giftName: string
    priceCoins: number
}

export interface BuyGiftTransactionalResult {
    remainingBalance: number
    inventoryQuantity: number
}

export interface SendGiftTransactionalInput {
    senderUserId: string
    recipientDatingUserId: number
    giftId: string
    priceCoins: number
}

export interface SendGiftTransactionalResult {
    giftSendId: string
    remainingInventory: number
    createdAt: Date
}

@injectable()
export class GiftRepository {
    async listCatalog(): Promise<GiftCatalogRow[]> {
        const rows = await prisma.gift_catalog.findMany({
            where: {
                isActive: true,
                slug: { in: PROJECT_GIFT_SLUGS },
            },
            orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
        })
        return rows.map((r) => ({
            id: r.id,
            slug: r.slug,
            name: r.name,
            imagePath: r.imagePath,
            priceCoins: r.priceCoins,
        }))
    }

    async findGiftById(giftId: string): Promise<GiftCatalogRow | null> {
        const row = await prisma.gift_catalog.findUnique({ where: { id: giftId } })
        if (!row) return null
        return {
            id: row.id,
            slug: row.slug,
            name: row.name,
            imagePath: row.imagePath,
            priceCoins: row.priceCoins,
        }
    }

    async listUserInventory(userId: string): Promise<GiftInventoryRow[]> {
        const rows = await prisma.gift_inventory.findMany({
            where: {
                userId,
                quantity: { gt: 0 },
            },
            orderBy: { updatedAt: 'desc' },
        })

        // Fetch gift catalog data for each inventory item
        const giftIds = rows.map((r) => r.giftId)
        const gifts = await prisma.gift_catalog.findMany({
            where: {
                id: { in: giftIds },
                slug: { in: PROJECT_GIFT_SLUGS },
            },
        })
        const giftMap = new Map(gifts.map((g) => [g.id, g]))

        return rows
            .filter((r) => giftMap.has(r.giftId))
            .map((r) => {
                const gift = giftMap.get(r.giftId)!
                return {
                    giftId: r.giftId,
                    giftSlug: gift.slug,
                    giftName: gift.name,
                    giftImagePath: gift.imagePath,
                    quantity: r.quantity,
                    updatedAt: r.updatedAt,
                }
            })
    }

    async listUserGiftHistory(
        senderUserId: string,
        limit = 20,
    ): Promise<GiftSendHistoryRow[]> {
        const rows = await prisma.gift_send.findMany({
            where: { senderUserId },
            orderBy: { createdAt: 'desc' },
            take: limit,
        })

        // Fetch gift catalog data
        const giftIds = [...new Set(rows.map((r) => r.giftId))]
        const gifts = await prisma.gift_catalog.findMany({
            where: {
                id: { in: giftIds },
                slug: { in: PROJECT_GIFT_SLUGS },
            },
        })
        const giftMap = new Map(gifts.map((g) => [g.id, g]))

        return rows
            .filter((r) => giftMap.has(r.giftId))
            .map((r) => {
                const gift = giftMap.get(r.giftId)!
                return {
                    id: r.id,
                    giftId: r.giftId,
                    giftSlug: gift.slug,
                    giftName: gift.name,
                    giftImagePath: gift.imagePath,
                    recipientDatingUserId: r.recipientDatingUserId,
                    priceCoins: r.priceCoins,
                    createdAt: r.createdAt,
                }
            })
    }

    async buyGiftTransactional(
        input: BuyGiftTransactionalInput,
    ): Promise<BuyGiftTransactionalResult> {
        return prisma.$transaction(async (tx) => {
            // 1. Ensure user_credits row exists
            await tx.user_credits.upsert({
                where: { userId: input.userId },
                create: {
                    id: crypto.randomUUID(),
                    userId: input.userId,
                    balance: 0,
                },
                update: {},
            })

            // 2. Decrement balance atomically — fails if insufficient
            const updated = await tx.user_credits.updateMany({
                where: {
                    userId: input.userId,
                    balance: { gte: input.priceCoins },
                },
                data: {
                    balance: { decrement: input.priceCoins },
                },
            })
            if (updated.count === 0) {
                throw new Error('Insufficient Lovity Coins')
            }

            // 3. Upsert inventory
            const inventory = await tx.gift_inventory.upsert({
                where: {
                    namespace_userId_giftId: {
                        namespace: '',
                        userId: input.userId,
                        giftId: input.giftId,
                    },
                },
                create: {
                    id: crypto.randomUUID(),
                    namespace: '',
                    userId: input.userId,
                    giftId: input.giftId,
                    giftName: input.giftName,
                    imagePath: '',
                    quantity: 1,
                },
                update: {
                    quantity: { increment: 1 },
                    giftName: input.giftName,
                },
            })

            // 4. Create credit transaction
            await tx.credit_transaction.create({
                data: {
                    id: crypto.randomUUID(),
                    userId: input.userId,
                    type: 'spend',
                    amount: -input.priceCoins,
                    status: 'SUCCESSFUL',
                    reason: `Gift purchased: ${input.giftName}`,
                },
            })

            // 5. Read remaining balance
            const credits = await tx.user_credits.findUniqueOrThrow({
                where: { userId: input.userId },
            })

            return {
                remainingBalance: credits.balance,
                inventoryQuantity: inventory.quantity,
            }
        })
    }

    async sendGiftTransactional(
        input: SendGiftTransactionalInput,
    ): Promise<SendGiftTransactionalResult> {
        return prisma.$transaction(async (tx) => {
            // 1. Decrement inventory atomically
            const updated = await tx.gift_inventory.updateMany({
                where: {
                    userId: input.senderUserId,
                    giftId: input.giftId,
                    quantity: { gte: 1 },
                },
                data: {
                    quantity: { decrement: 1 },
                },
            })
            if (updated.count === 0) {
                throw new Error('Gift is not available in inventory')
            }

            // 2. Read remaining inventory
            const inv = await tx.gift_inventory.findFirst({
                where: {
                    userId: input.senderUserId,
                    giftId: input.giftId,
                },
            })

            // 3. Create gift_send record
            const sendId = crypto.randomUUID()
            await tx.gift_send.create({
                data: {
                    id: sendId,
                    senderUserId: input.senderUserId,
                    recipientDatingUserId: input.recipientDatingUserId,
                    giftId: input.giftId,
                    priceCoins: input.priceCoins,
                },
            })

            return {
                giftSendId: sendId,
                remainingInventory: inv?.quantity ?? 0,
                createdAt: new Date(),
            }
        })
    }
}
