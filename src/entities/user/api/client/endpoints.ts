import { api } from '@/shared/api/client/api'
import { getCurrentUser } from './services/get-current-user.service'
import { getUserProfile, updateUserProfile, analyzeUserProfile } from './services/profile.service'
import { UserResponseDto } from '../server/contracts/user-response.dto'
import { normalizeError } from '@/shared/api/client/error-normalizer'
import type {
    UserProfile,
    UpdateProfileRequest,
    AnalyzeProfileRequest,
    AnalyzeProfileResponse,
} from '../../model/types'

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<UserResponseDto, void>({
            queryFn: async () => {
                try {
                    const data = await getCurrentUser()
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
            providesTags: ['User'],
        }),
        getUserProfile: builder.query<UserProfile, void>({
            queryFn: async () => {
                try {
                    const data = await getUserProfile()
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
            providesTags: ['User'],
        }),
        updateUserProfile: builder.mutation<UserProfile, UpdateProfileRequest>({
            queryFn: async (request) => {
                try {
                    const data = await updateUserProfile(request)
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
            invalidatesTags: ['User'],
        }),
        analyzeUserProfile: builder.mutation<AnalyzeProfileResponse, AnalyzeProfileRequest>({
            queryFn: async (request) => {
                try {
                    const data = await analyzeUserProfile(request)
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
    useGetCurrentUserQuery,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useAnalyzeUserProfileMutation,
} = userApi
