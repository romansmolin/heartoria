export type InfoGridVariant = 'variant-01'

export interface InfoGridCard {
    title: string
    description: string
    stat?: string
    statLabel?: string
    className?: string
}

export interface InfoGridSectionProps {
    variant?: InfoGridVariant
    title?: string
    subtitle?: string
    cards?: InfoGridCard[]
    className?: string
}
