import { CtaSectionProps } from '../model/types'
import { CtaVariant01 } from './variants/variant-01'
import { CtaVariant02 } from './variants/variant-02'

export const CtaSection = ({
    variant = 'variant-01',
    badge,
    title,
    description,
    primaryButton,
    secondaryButton,
    className,
}: CtaSectionProps) => {
    const variantProps = { badge, title, description, primaryButton, secondaryButton, className }

    switch (variant) {
        case 'variant-02':
            return <CtaVariant02 {...variantProps} />
        case 'variant-01':
        default:
            return <CtaVariant01 {...variantProps} />
    }
}
