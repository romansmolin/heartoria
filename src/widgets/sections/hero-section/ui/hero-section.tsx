import { HeroContent, HeroSectionProps, HeroVariant } from '../model/types'
import { HeroVariant01 } from './variants/variant-01'
import { HeroVariant02 } from './variants/variant-02'
import { HeroVariant03 } from './variants/variant-03'
import { HeroVariant04 } from './variants/variant-04'
import { HeroVariant05 } from './variants/variant-05'
import { HeroVariant06 } from './variants/variant-06'
import {
    floatingChips as defaultFloatingChips,
    heroContent as defaultVariant01Content,
    mockupCards as defaultMockupCards,
    navItems as defaultNavItems,
} from '../lib/hero-section.mock'
import { HeroVariant07 } from './variants/variant-07'
import { HeroVariant08 } from './variants/variant-08'
import { HeroVariant09 } from './variants/variant-09'
import { HeroVariant10 } from './variants/variant-10'

const defaultVariant02Content: HeroContent = {
    headlineLine1: 'Your Product',
    headlineLine2: 'Delivers Results Fast',
    subtitle: 'A powerful solution that helps you accomplish more in less time. Try it today.',
    primaryCta: {
        label: 'Get Started',
        href: '/auth',
    },
    secondaryCta: {
        label: 'See Examples',
        href: '#features',
    },
}

const defaultVariant03Content: HeroContent = {
    headlineLine1: 'Modern Solutions for',
    headlineLine2: 'Your Business',
    subtitle:
        'Our advanced technology and secure systems provide a reliable way to manage your workflow, ensuring efficiency at every step.',
    primaryCta: {
        label: 'Create Account',
        href: '/auth',
    },
    secondaryCta: {
        label: 'Learn More',
        href: '#features',
    },
}

const defaultVariant04Content: HeroContent = {
    headlineLine1: 'Schedule once, launch on',
    headlineLine2: 'every channel',
    subtitle:
        'Plan campaigns, tailor captions per platform, and let automation drop them at peak times. One hub, every network — no tab juggling.',
    primaryCta: {
        label: 'Get Started',
        href: '#pricing',
    },
    secondaryCta: {
        label: 'Learn More',
        href: '#features',
    },
}

const defaultVariant05Content: HeroContent = {
    headlineLine1: 'Connect with intention.',
    headlineLine2: 'Spark results.',
    subtitle:
        'A premium platform for people who want meaningful outcomes, not endless noise. Smart tools, better workflows, and elegant UX help you turn ideas into real results.',
    primaryCta: {
        label: 'Get Started',
        href: '/auth',
    },
    secondaryCta: {
        label: 'Learn More',
        href: '#features',
    },
}

const defaultVariant06Content: HeroContent = {
    headlineLine1: 'Find someone who actually',
    headlineLine2: 'fits your life',
    subtitle:
        'A platform built around values, habits, and emotional compatibility so meaningful conversations start naturally.',
    primaryCta: {
        label: 'Get Started',
        href: '/auth',
    },
    secondaryCta: {
        label: 'How it works',
        href: '#how-it-works',
    },
}

const defaultVariant07Content: HeroContent = {
    headlineLine1: 'Level up with a curated',
    headlineLine2: 'mastermind circle',
    subtitle:
        'Alliatus connects ambitious people into small, handpicked groups for honest feedback, strategy sessions, and real accountability.',
    primaryCta: {
        label: 'Learn how it works',
        href: '#how-it-works',
    },
    secondaryCta: {
        label: 'Apply now',
        href: '#contact',
    },
}

const defaultVariant08Content: HeroContent = {
    headlineLine1: 'Find someone who actually',
    headlineLine2: 'fits your life',
    subtitle:
        'A platform built around values, habits, and emotional compatibility so meaningful conversations start naturally.',
    primaryCta: {
        label: 'Get Started',
        href: '/auth',
    },
    secondaryCta: {
        label: 'How it works',
        href: '#how-it-works',
    },
}

const defaultVariantContent: Record<HeroVariant, HeroContent> = {
    'variant-01': defaultVariant01Content,
    'variant-02': defaultVariant02Content,
    'variant-03': defaultVariant03Content,
    'variant-04': defaultVariant04Content,
    'variant-05': defaultVariant05Content,
    'variant-06': defaultVariant06Content,
    'variant-07': defaultVariant07Content,
    'variant-08': defaultVariant08Content,
    'variant-09': defaultVariant08Content,
    'variant-10': {
        headlineLine1: 'Where Real',
        headlineLine2: 'Connections Begin',
        subtitle:
            'Smart compatibility matching, virtual gifts, and real-time chat — everything you need to find someone who truly fits your life.',
        primaryCta: { label: 'Start Matching', href: '/auth' },
        secondaryCta: { label: 'Learn More', href: '#features' },
    },
}

const defaultUserAvatars = [
    'https://api.dicebear.com/7.x/avataaars/png?seed=User1',
    'https://api.dicebear.com/7.x/avataaars/png?seed=User2',
    'https://api.dicebear.com/7.x/avataaars/png?seed=User3',
]

const defaultHeroImages = {
    cardHand: '/assets/card-hand.jpg',
    notification: '/assets/notification.jpg',
    amount: '/assets/amount.jpg',
    phoneHand: '/assets/phone-hand.jpg',
}

export const HeroSection = ({
    variant = 'variant-02',
    navItems = defaultNavItems,
    floatingChips = defaultFloatingChips,
    content,
    mockupCards = defaultMockupCards,
    dashboardCards = [],
    className,
    badge = 'Your Product',
    badgeIcon = 'wallet',
    userAvatars = defaultUserAvatars,
    rating = 4.8,
    images = defaultHeroImages,
}: HeroSectionProps) => {
    const resolvedContent = content ?? defaultVariantContent[variant]

    const variantProps = {
        navItems,
        floatingChips,
        content: resolvedContent,
        mockupCards,
        dashboardCards,
        className,
        badge,
        badgeIcon,
        userAvatars,
        rating,
        images,
    }

    switch (variant) {
        case 'variant-01':
            return <HeroVariant01 {...variantProps} />
        case 'variant-02':
            return <HeroVariant02 {...variantProps} />
        case 'variant-03':
            return <HeroVariant03 {...variantProps} />
        case 'variant-04':
            return <HeroVariant04 {...variantProps} />
        case 'variant-05':
            return <HeroVariant05 {...variantProps} />
        case 'variant-06':
            return <HeroVariant06 {...variantProps} />
        case 'variant-07':
            return <HeroVariant07 {...variantProps} />
        case 'variant-08':
            return <HeroVariant08 {...variantProps} />
        case 'variant-09':
            return <HeroVariant09 {...variantProps} />
        case 'variant-10':
            return <HeroVariant10 {...variantProps} />
        default:
            return <HeroVariant02 {...variantProps} />
    }
}
