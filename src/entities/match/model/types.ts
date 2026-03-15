export interface MatchCandidate {
    id: string
    username: string
    fullName: string | null
    age: number | null
    location: string | null
    avatarUrl: string | null
    photos: { url: string; isPrimary: boolean }[]
    description: string | null
    gender: string | null
}

export interface DiscoverMatchesResponse {
    data: MatchCandidate[]
    total: number
    page: number
    perPage: number
}

export type MatchAction = 'like' | 'dislike'

export interface MatchActionRequest {
    candidateId: string
    action: MatchAction
}

export interface MatchActionResponse {
    matched: boolean
    matchId: string | null
}

export interface MatchItem {
    id: string
    userId: string
    matchedUserId: string
    username: string
    avatarUrl: string | null
    createdAt: string
}

export interface MatchListResponse {
    data: MatchItem[]
    total: number
}

export interface CompatibilityScoreRequest {
    candidateId: string
}

export interface CompatibilityScoreResponse {
    score: number
    summary: string
    reasons: string[]
}

export interface DiscoverMatchesParams {
    page?: number
    perPage?: number
    minAge?: number
    maxAge?: number
    gender?: number
    location?: string
    hasPhoto?: number
    isOnline?: number
}
