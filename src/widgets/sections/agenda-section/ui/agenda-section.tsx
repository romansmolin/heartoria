import type { AgendaSectionProps } from '../model/types'
import { AgendaVariant01 } from './variants/variant-01'

export function AgendaSection({ variant = 'variant-01', ...props }: AgendaSectionProps) {
    switch (variant) {
        case 'variant-01':
        default:
            return <AgendaVariant01 {...props} />
    }
}
