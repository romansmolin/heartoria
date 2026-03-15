export interface ActivityItem {
    id: string
    type: string
    userId: string
    username: string
    avatarUrl: string | null
    content: string | null
    createdAt: string
}

export interface ActivityResponse {
    data: ActivityItem[]
}
