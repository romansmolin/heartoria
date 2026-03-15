import type { InfoGridSectionProps } from '../model/types'
import { InfoGridVariant01 } from './variants/variant-01'

export function InfoGridSection({ variant = 'variant-01', ...props }: InfoGridSectionProps) {
    switch (variant) {
        case 'variant-01':
        default:
            return <InfoGridVariant01 {...props} />
    }
}
