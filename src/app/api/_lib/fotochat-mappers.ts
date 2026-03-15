export type PhotoBlock = {
    url_middle?: string
    url_small?: string
    url_big?: string
}

export type PhotoBlockV2 = {
    normal?: string
    sq_430?: string
    sq_middle?: string
    sq_small?: string
}

export type MembreBlock = {
    id?: number
    pseudo?: string
    prenom?: string
    sexe1?: number
    age?: number
    zone_name?: string
    moyenne?: number
    photo?: number
    photos?: PhotoBlock[]
    photos_v2?: PhotoBlockV2[]
    description?: string
    taille?: number
    poids?: number
    yeux?: number
    cheveux?: number
    silhouette?: number
    origine?: number
    fume?: number
    alcool?: number
    etude?: number
    profession?: number
    salaire?: number
    situation?: number
    cherche?: number
    interets?: number
    online?: string
    email?: string
}

export const DATING_API_URL = process.env.DATING_EXTERNAL_API_URL || 'https://api.fotochat.com/'
export const DATING_API_KEY = process.env.DATING_EXTERNAL_API_KEY || ''

export const mapGender = (value?: number): string | null => {
    switch (value) {
        case 1: return 'man'
        case 2: return 'woman'
        case 3: return 'couple'
        default: return null
    }
}

export const mapGenderToUserGender = (value?: number): 'male' | 'female' | 'non-binary' | 'other' | null => {
    switch (value) {
        case 1: return 'male'
        case 2: return 'female'
        case 3: return 'other'
        default: return null
    }
}

export const pickPhotoUrl = (member: MembreBlock): string | null => {
    const v2 = member.photos_v2?.[0]
    const legacy = member.photos?.[0]
    return (
        v2?.sq_430 ??
        v2?.sq_middle ??
        v2?.sq_small ??
        v2?.normal ??
        legacy?.url_middle ??
        legacy?.url_small ??
        legacy?.url_big ??
        null
    )
}

export const mapPhotos = (member: MembreBlock) =>
    (member.photos_v2 ?? member.photos ?? []).map((p, i) => ({
        url: ('sq_430' in p ? p.sq_430 : undefined) ?? ('url_middle' in p ? p.url_middle : undefined) ?? '',
        isPrimary: i === 0,
    })).filter(p => p.url)

export const cleanParams = (params: Record<string, unknown>) =>
    Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ''),
    )

export function getSessionFromRequest(request: Request): { sessionId: string; userId?: string } | null {
    const cookieHeader = request.headers.get('cookie') ?? ''
    const cookies = Object.fromEntries(
        cookieHeader.split(';').map(c => {
            const [key, ...rest] = c.trim().split('=')
            return [key, rest.join('=')]
        }),
    )
    const sessionId = cookies['dating_session_id']
    if (!sessionId) return null
    return { sessionId, userId: cookies['dating_user_id'] }
}
