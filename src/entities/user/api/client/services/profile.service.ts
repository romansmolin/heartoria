import { apiClient } from '@/shared/api/client/axios.config'
import type {
    UserProfile,
    UpdateProfileRequest,
    UpdateProfileResponse,
    AnalyzeProfileRequest,
    AnalyzeProfileResponse,
} from '../../../model/types'

export async function getUserProfile(): Promise<UserProfile> {
    const response = await apiClient.get<{ data: UserProfile }>('/api/user/profile')
    return response.data.data
}

export async function updateUserProfile(data: UpdateProfileRequest): Promise<UserProfile> {
    const response = await apiClient.put<UpdateProfileResponse>('/api/user/profile', data)
    return response.data.data
}

export async function analyzeUserProfile(data: AnalyzeProfileRequest): Promise<AnalyzeProfileResponse> {
    const response = await apiClient.post<AnalyzeProfileResponse>('/api/user/profile/analyze', data)
    return response.data
}
