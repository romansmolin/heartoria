import type { ContactSectionProps } from '../model/types'
import { ContactVariant01 } from './variants/variant-01'

export function ContactSection({ variant = 'variant-01', ...props }: ContactSectionProps) {
    switch (variant) {
        case 'variant-01':
        default:
            return <ContactVariant01 {...props} />
    }
}
