/**
 * User domain types
 * Aligned with Better Auth schema
 */

export interface User {
  id: string
  email: string
  name: string
  emailVerified: boolean
  image: string | null
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserInput {
  email: string
  name: string
  image?: string
}

export interface UpdateUserInput {
  name?: string
  emailVerified?: boolean
  image?: string
}

export type UserGender = 'male' | 'female' | 'non-binary' | 'other'

export interface UserProfilePhoto {
  id: string
  url: string
  isPrimary: boolean
  order: number
}

export interface UserProfile {
  id: string
  userId: string
  username: string
  fullName: string | null
  email: string
  description: string | null
  gender: UserGender | null
  age: number | null
  location: string | null
  height: number | null
  weight: number | null
  eyeColor: number | null
  hairColor: number | null
  bodyType: number | null
  ethnicity: number | null
  smoking: number | null
  drinking: number | null
  education: number | null
  occupation: number | null
  income: number | null
  relationshipStatus: number | null
  lookingFor: number | null
  interests: number | null
  photos: UserProfilePhoto[]
  avatarUrl: string | null
  createdAt: string
  updatedAt: string
}

export interface UserProfileResponse {
  data: UserProfile
}

export interface UpdateProfileRequest {
  fullName?: string
  description?: string
  gender?: UserGender
  height?: number
  weight?: number
  eyeColor?: number
  hairColor?: number
  bodyType?: number
  ethnicity?: number
  smoking?: number
  drinking?: number
  education?: number
  occupation?: number
  income?: number
  relationshipStatus?: number
  lookingFor?: number
  interests?: number
}

export interface UpdateProfileResponse {
  data: UserProfile
}

export type ProfileAdvicePriority = 'high' | 'medium' | 'low'
export type ProfileAdviceCategory = 'photos' | 'bio' | 'preferences' | 'completeness'

export interface ProfileAdviceItem {
  category: ProfileAdviceCategory
  priority: ProfileAdvicePriority
  reason: string
  action: string
}

export interface AnalyzeProfileRequest {
  profileId?: string
}

export interface AnalyzeProfileResponse {
  summary: string
  score: number
  checklist: ProfileAdviceItem[]
}
