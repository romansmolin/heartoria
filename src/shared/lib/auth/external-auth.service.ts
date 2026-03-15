import axios from 'axios'

import type {
    Gender,
    LookingFor,
    FotochatSignInResponse,
    FotochatSignUpResponse,
    ExternalSignInResponse,
    ExternalSignUpResponse,
} from './external-auth.types'

const DATING_API_URL = process.env.DATING_EXTERNAL_API_URL || 'https://api.fotochat.com/'
const DATING_API_KEY = process.env.DATING_EXTERNAL_API_KEY || ''

const SIGN_IN_ENDPOINT = '/index_api/login'
const SIGN_UP_ENDPOINT = '/index_api/subscribe'

const mapGenderToApi = (gender: Gender): number => {
    switch (gender) {
        case 'man':
            return 1
        case 'woman':
            return 2
        case 'non_binary':
        case 'other':
        default:
            return 3
    }
}

const mapLookingForToApi = (lookingFor: LookingFor): number => {
    switch (lookingFor) {
        case 'man':
            return 1
        case 'women':
            return 2
        case 'couple':
        default:
            return 3
    }
}

const cleanParams = (params: Record<string, unknown>) =>
    Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ''),
    )

interface SignInPayload {
    username: string
    password: string
    rememberMe?: boolean
    ipAddress?: string
    userAgent?: string
}

interface SignUpPayload {
    username: string
    email: string
    password: string
    gender: Gender
    lookingFor: LookingFor
    dateOfBirth: string
    city?: string
    ipAddress?: string
    userAgent?: string
}

export async function signIn(payload: SignInPayload): Promise<ExternalSignInResponse> {
    const params = cleanParams({
        login: payload.username,
        pass: payload.password,
        rememberme: payload.rememberMe ? '1' : undefined,
        browser: payload.userAgent,
        api_key: DATING_API_KEY,
    })

    const response = await axios.post<FotochatSignInResponse>(
        `${DATING_API_URL}${SIGN_IN_ENDPOINT}`,
        undefined,
        { params },
    )

    const data = response.data

    if (data.connected !== 1 || !data.session_id || !data.user_id) {
        throw new Error(data.error_label || data.error || data.message || 'Invalid credentials')
    }

    return {
        connected: true,
        sessionId: data.session_id,
        userId: data.user_id,
        tokenLogin: data.token_login,
        lang: data.lang_ui,
    }
}

export async function signUp(payload: SignUpPayload): Promise<ExternalSignUpResponse> {
    const params = cleanParams({
        login: payload.username,
        pass: payload.password,
        mail: payload.email,
        'fast-part': '1',
        sex: mapGenderToApi(payload.gender),
        cherche1: mapLookingForToApi(payload.lookingFor),
        birthday_date: payload.dateOfBirth,
        ip_adress: payload.ipAddress ?? '0.0.0.0',
        city: payload.city,
        browser: payload.userAgent,
        lang_ui: 'en',
        api_key: DATING_API_KEY,
    })

    const response = await axios.post<FotochatSignUpResponse>(
        `${DATING_API_URL}${SIGN_UP_ENDPOINT}`,
        undefined,
        { params },
    )

    const data = response.data

    if (data.accepted !== 1 || !data.session_id || !data.user_id) {
        throw new Error(data.error || 'Registration failed')
    }

    return {
        accepted: true,
        sessionId: data.session_id,
        userId: data.user_id,
        lang: data.lang_ui,
    }
}
