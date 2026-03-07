import { asyncHandler } from '@/shared/http/async-handler'
import { container } from '@/shared/lib/di/container.server'
import { getSession } from '@/shared/lib/auth/get-session'
import { GetWalletController } from '@/entities/credit/api/server/controller/get-wallet.controller'
import { AppError } from '@/shared/errors/app-error'

/**
 * GET /api/credits/wallet - Get user's wallet balance and transactions
 */
export const GET = asyncHandler(async () => {
    const session = await getSession()
    if (!session?.user?.id) throw AppError.authenticationError()

    const controller = container.get(GetWalletController)
    return await controller.handle(session.user.id)
})
