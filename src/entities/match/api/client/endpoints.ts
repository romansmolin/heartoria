import { api } from '@/shared/api/client/api'
import { normalizeError } from '@/shared/api/client/error-normalizer'
import { discoverMatches, getMatches, sendMatchAction, getCompatibilityScore } from './services/match.service'
import type {
    DiscoverMatchesResponse,
    DiscoverMatchesParams,
    MatchListResponse,
    MatchActionRequest,
    MatchActionResponse,
    CompatibilityScoreRequest,
    CompatibilityScoreResponse,
} from '../../model/types'

export const matchApi = api.injectEndpoints({
    endpoints: (builder) => ({
        discoverMatches: builder.query<DiscoverMatchesResponse, DiscoverMatchesParams>({
            queryFn: async (params) => {
                try {
                    const data = await discoverMatches(params)
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
            providesTags: ['Discover'],
        }),
        getMatches: builder.query<MatchListResponse, void>({
            queryFn: async () => {
                try {
                    const data = await getMatches()
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
            providesTags: ['Match'],
        }),
        matchAction: builder.mutation<MatchActionResponse, MatchActionRequest>({
            queryFn: async (request) => {
                try {
                    const data = await sendMatchAction(request)
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
            invalidatesTags: ['Discover', 'Match'],
        }),
        compatibilityScore: builder.mutation<CompatibilityScoreResponse, CompatibilityScoreRequest>({
            queryFn: async (request) => {
                try {
                    const data = await getCompatibilityScore(request)
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
        }),
    }),
})

export const {
    useDiscoverMatchesQuery,
    useGetMatchesQuery,
    useMatchActionMutation,
    useCompatibilityScoreMutation,
} = matchApi
