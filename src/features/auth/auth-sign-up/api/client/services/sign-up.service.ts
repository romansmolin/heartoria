import { apiClient } from '@/shared/api/client/axios.config'
import { SignUpDto } from '@/features/auth/auth-sign-up/contracts/sign-up.dto'

export interface SignUpResponse {
    accepted: boolean
    sessionId: string
    userId: number
    lang?: string
}

export async function signUp(data: SignUpDto): Promise<SignUpResponse> {
    const { consent: _consent, ...payload } = data
    const response = await apiClient.post<SignUpResponse>('/api/auth/sign-up', payload)

    return response.data
}
