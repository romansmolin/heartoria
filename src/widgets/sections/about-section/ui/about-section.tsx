import type { AboutSectionProps } from '../model/types'
import { defaultAboutContent } from '../lib/about-section.mock'
import { AboutSectionVariant01 } from './variants/variant-01'
import { AboutSectionVariant02 } from './variants/varaint-02'
import { AboutSectionVariant03 } from './variants/variant-03'
import { AboutSectionVariant04 } from './variants/variant-04'

export const AboutSection = ({
    variant = 'variant-01',
    title,
    subtitle,
    className,
}: AboutSectionProps) => {
    const variantProps = {
        className,
        title: title ?? defaultAboutContent.title,
        subtitle: subtitle ?? defaultAboutContent.subtitle,
        badge: defaultAboutContent.badge,
        image: defaultAboutContent.image,
        cards: defaultAboutContent.cards,
    }

    switch (variant) {
        case 'variant-01':
            return <AboutSectionVariant01 {...variantProps} />
        case 'variant-02':
            return <AboutSectionVariant02 {...variantProps} />
        case 'variant-03':
            return <AboutSectionVariant03 {...variantProps} />
        case 'variant-04':
            return <AboutSectionVariant04 {...variantProps} />
        default:
            const check: never = variant
            return check
    }
}
