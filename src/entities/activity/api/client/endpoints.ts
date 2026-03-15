import { api } from '@/shared/api/client/api'
import { normalizeError } from '@/shared/api/client/error-normalizer'
import { getActivity } from './services/activity.service'
import type { ActivityResponse } from '../../model/types'

export const activityApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getActivity: builder.query<ActivityResponse, void>({
            queryFn: async () => {
                try {
                    const data = await getActivity()
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return {
                        error: {
                            status: 'CUSTOM_ERROR' as const,
                            data: normalized,
                            error: normalized.message,
                        },
                    }
                }
            },
            providesTags: ['Activity'],
        }),
    }),
})

export const { useGetActivityQuery } = activityApi
