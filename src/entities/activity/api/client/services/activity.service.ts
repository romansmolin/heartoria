import { apiClient } from '@/shared/api/client/axios.config'
import type { ActivityResponse } from '../../../model/types'

export async function getActivity(): Promise<ActivityResponse> {
    const response = await apiClient.get<ActivityResponse>('/api/activity')
    return response.data
}
