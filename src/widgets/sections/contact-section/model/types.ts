export type ContactVariant = 'variant-01'

export interface ContactInfo {
    email: string
    phone: string
    address: string
}

export interface ContactSectionProps {
    variant?: ContactVariant
    title?: string
    subtitle?: string
    contactInfo?: ContactInfo
    className?: string
}
