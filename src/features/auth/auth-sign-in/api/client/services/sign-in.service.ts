import { apiClient } from '@/shared/api/client/axios.config'
import { SignInDto } from '@/features/auth/auth-sign-in/contracts/sign-in.dto'

export interface SignInResponse {
    connected: boolean
    sessionId: string
    userId: number
    tokenLogin?: string
    lang?: string
}

export async function signIn(data: SignInDto): Promise<SignInResponse> {
    const { consent: _consent, ...payload } = data
    const response = await apiClient.post<SignInResponse>('/api/auth/sign-in', {
        username: payload.username,
        password: payload.password,
        rememberMe: payload.rememberMe,
    })

    return response.data
}
