import { NextResponse } from 'next/server'
import { asyncHandler } from '@/shared/http/async-handler'
import { container } from '@/shared/lib/di/container.server'
import { getSession } from '@/shared/lib/auth/get-session'
import { GetWalletController } from '@/entities/credit/api/server/controller/get-wallet.controller'
import { AppError } from '@/shared/errors/app-error'

/**
 * GET /api/credits/wallet - Get user's wallet balance and transactions
 * Falls back to empty wallet for external-auth users without a local DB record.
 */
export const GET = asyncHandler(async () => {
    const session = await getSession()
    if (!session?.user?.id) throw AppError.authenticationError()

    try {
        const controller = container.get(GetWalletController)
        return await controller.handle(session.user.id)
    } catch {
        // External-auth users may not have a local Prisma user record yet.
        // Return a default empty wallet so the dashboard renders gracefully.
        return NextResponse.json({
            wallet: {
                balance: 0,
                currency: 'EUR',
                totalPurchased: 0,
                totalSpent: 0,
                pendingCredits: 0,
            },
            transactions: [],
            total: 0,
        })
    }
})
