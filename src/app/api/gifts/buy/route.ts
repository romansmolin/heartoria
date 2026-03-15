import { NextRequest } from 'next/server'
import { asyncHandler } from '@/shared/http/async-handler'
import { container } from '@/shared/lib/di/container.server'
import { getSession } from '@/shared/lib/auth/get-session'
import { GiftController } from '@/entities/gift/api/server/controllers/gift.controller'
import { AppError } from '@/shared/errors/app-error'

export const POST = asyncHandler(async (req: NextRequest) => {
    const session = await getSession()
    if (!session?.user?.id) throw AppError.authenticationError()

    const controller = container.get(GiftController)
    return await controller.buyGift(req, session.user.id)
})
