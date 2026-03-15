export type SpeakersVariant = 'variant-01'

export interface Speaker {
    name: string
    role: string
    company: string
    topic?: string
    image?: string
    age?: number
    location?: string
}

export interface SpeakersSectionProps {
    variant?: SpeakersVariant
    title?: string
    subtitle?: string
    speakers?: Speaker[]
    className?: string
}
