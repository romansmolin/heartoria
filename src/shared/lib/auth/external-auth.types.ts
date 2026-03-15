export const GENDER_VALUES = ['man', 'woman', 'non_binary', 'other'] as const
export type Gender = (typeof GENDER_VALUES)[number]

export const LOOKING_FOR_VALUES = ['man', 'women', 'couple'] as const
export type LookingFor = (typeof LOOKING_FOR_VALUES)[number]

export type FotochatSignInResponse = {
    connected?: number
    session_id?: string
    user_id?: number
    token_login?: string
    lang_ui?: string
    error?: string
    error_label?: string
    message?: string
}

export type FotochatSignUpResponse = {
    accepted?: number
    error?: string
    session_id?: string
    user_id?: number
    lang_ui?: string
}

export interface ExternalSignInResponse {
    connected: boolean
    sessionId: string
    userId: number
    tokenLogin?: string
    lang?: string
}

export interface ExternalSignUpResponse {
    accepted: boolean
    sessionId: string
    userId: number
    lang?: string
}
