import { apiClient } from '@/shared/api/client/axios.config'
import type {
    DiscoverMatchesResponse,
    DiscoverMatchesParams,
    MatchListResponse,
    MatchActionRequest,
    MatchActionResponse,
    CompatibilityScoreRequest,
    CompatibilityScoreResponse,
} from '../../../model/types'

export async function discoverMatches(params: DiscoverMatchesParams = {}): Promise<DiscoverMatchesResponse> {
    const response = await apiClient.get<DiscoverMatchesResponse>('/api/match/discover', { params })
    return response.data
}

export async function getMatches(): Promise<MatchListResponse> {
    const response = await apiClient.get<MatchListResponse>('/api/match')
    return response.data
}

export async function sendMatchAction(data: MatchActionRequest): Promise<MatchActionResponse> {
    const response = await apiClient.post<MatchActionResponse>('/api/match/action', data)
    return response.data
}

export async function getCompatibilityScore(data: CompatibilityScoreRequest): Promise<CompatibilityScoreResponse> {
    const response = await apiClient.post<CompatibilityScoreResponse>('/api/match/compatibility', data)
    return response.data
}
