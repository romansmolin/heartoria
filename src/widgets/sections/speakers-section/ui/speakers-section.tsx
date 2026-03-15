import type { SpeakersSectionProps } from '../model/types'
import { SpeakersVariant01 } from './variants/variant-01'

export function SpeakersSection({ variant = 'variant-01', ...props }: SpeakersSectionProps) {
    switch (variant) {
        case 'variant-01':
        default:
            return <SpeakersVariant01 {...props} />
    }
}
