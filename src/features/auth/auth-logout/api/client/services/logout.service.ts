import { authClient } from '@/shared/lib/auth/auth-client'
import { apiClient } from '@/shared/api/client/axios.config'

export async function logout(): Promise<void> {
    // Clear dating session cookies
    await apiClient.post('/api/auth/sign-out')

    // Also sign out from Better Auth
    const response = await authClient.signOut()

    if (response.error) {
        throw new Error(response.error.message || 'Logout failed')
    }
}
