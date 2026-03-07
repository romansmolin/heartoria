import { NextRequest } from 'next/server'
import { asyncHandler } from '@/shared/http/async-handler'
import { container } from '@/shared/lib/di/container.server'
import { getSession } from '@/shared/lib/auth/get-session'
import { PurchaseCreditsController } from '@/entities/credit/api/server/controller/purchase-credits.controller'
import { AppError } from '@/shared/errors/app-error'

/**
 * POST /api/credits/purchase - Create a credit purchase and return checkout token
 */
export const POST = asyncHandler(async (req: NextRequest) => {
    const session = await getSession()
    if (!session?.user?.id) throw AppError.authenticationError()

    const controller = container.get(PurchaseCreditsController)
    return await controller.handle(req, session.user.id)
})
