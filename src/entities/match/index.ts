export type {
    MatchCandidate,
    DiscoverMatchesResponse,
    MatchAction,
    MatchActionRequest,
    MatchActionResponse,
    MatchItem,
    MatchListResponse,
    CompatibilityScoreRequest,
    CompatibilityScoreResponse,
    DiscoverMatchesParams,
} from './model/types'

export {
    useDiscoverMatchesQuery,
    useGetMatchesQuery,
    useMatchActionMutation,
    useCompatibilityScoreMutation,
} from './api/client/endpoints'
