import type { SocialProofSectionProps } from '../model/types'
import { defaultStats, defaultLogos } from '../lib/social-proof-section.mock'
import { Variant01 } from './variants/variant-01'
import { Variant02 } from './variants/variant-02'
import { Variant03 } from './variants/variant-03'

export function SocialProofSection({
    variant = 'variant-01',
    stats = defaultStats,
    logos = defaultLogos,
    ...props
}: SocialProofSectionProps) {
    switch (variant) {
        case 'variant-03':
            return <Variant03 stats={stats} logos={logos} {...props} />
        case 'variant-02':
            return <Variant02 stats={stats} logos={logos} {...props} />
        case 'variant-01':
        default:
            return <Variant01 stats={stats} logos={logos} {...props} />
    }
}
