export type AgendaVariant = 'variant-01'

export interface AgendaSession {
    time: string
    title: string
    speaker?: string
    description?: string
}

export interface AgendaDay {
    day: string
    date: string
    sessions: AgendaSession[]
}

export interface AgendaSectionProps {
    variant?: AgendaVariant
    title?: string
    subtitle?: string
    days?: AgendaDay[]
    className?: string
}
