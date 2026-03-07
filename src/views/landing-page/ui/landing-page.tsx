'use client'

import { HeroSection } from '@/widgets/sections/hero-section'
import { FeatureSection } from '@/widgets/sections/features-section'
import { ContentSection } from '@/widgets/sections/content-section'
import { SocialProofSection } from '@/widgets/sections/social-proof-section'
import { PricingSection } from '@/widgets/sections/pricing-section'
import { HowItWorksSection } from '@/widgets/sections/how-it-works-section'
import { TestimonialsSection } from '@/widgets/sections/testimonials-section'
import { CtaSection } from '@/widgets/sections/cta-section'

import { navItems, floatingChips } from '@/widgets/sections/hero-section/lib/hero-section.mock'
import {
    featuresVariant01,
    featuresVariant02,
    defaultVisualStats,
} from '@/widgets/sections/features-section/lib/features-section.mock'
import {
    defaultImage,
    defaultFeatures,
    defaultCta,
} from '@/widgets/sections/content-section/lib/content-section.mock'
import {
    defaultStats,
    defaultLogos,
} from '@/widgets/sections/social-proof-section/lib/social-proof-section.mock'
import { defaultPlans } from '@/widgets/sections/pricing-section/lib/pricing-section.mock'
import { FaqSection } from '@/widgets/sections'
import { AboutSection } from '@/widgets/sections/about-section'

const heroContentVariant07 = {
    headlineLine1: 'Level Up with a Curated',
    headlineLine2: 'Mastermind Circle',
    subtitle:
        'Alliatus connects ambitious people into small, handpicked groups for honest feedback, strategy sessions, and real accountability.',
    primaryCta: {
        label: 'Learn How It Works',
        href: '#how-it-works',
    },
    secondaryCta: {
        label: 'Apply Now',
        href: '#contact',
    },
}

export function LandingPage() {
    return (
        <div className="space-y-16 md:space-y-24">
            <HeroSection
                variant="variant-07"
                navItems={navItems}
                floatingChips={floatingChips}
                content={heroContentVariant07}
                badge="Your Brand"
                badgeIcon="wallet"
                rating={4.9}
                userAvatars={[
                    'https://api.dicebear.com/7.x/avataaars/png?seed=User1',
                    'https://api.dicebear.com/7.x/avataaars/png?seed=User2',
                    'https://api.dicebear.com/7.x/avataaars/png?seed=User3',
                ]}
                dashboardCards={[
                    {
                        id: 'metric-1',
                        title: 'Active Users',
                        value: '2,450',
                        subtitle: 'Last 30 days',
                        metric: '+12%',
                    },
                    {
                        id: 'metric-2',
                        title: 'Revenue',
                        value: '$48.2K',
                        subtitle: 'Monthly recurring',
                    },
                    {
                        id: 'metric-3',
                        title: 'Satisfaction',
                        value: '98.5%',
                        subtitle: 'Customer rating',
                    },
                    {
                        id: 'metric-4',
                        title: 'Tasks Completed',
                        value: '1,284',
                        subtitle: 'This month',
                        metric: '+8 new',
                    },
                ]}
            />

            <SocialProofSection variant="variant-01" stats={defaultStats} logos={defaultLogos} />

            <AboutSection variant="variant-01" />
            <AboutSection
                variant="variant-02"
                title="Made for People Like You"
                subtitle="A focused community for builders who want honest perspective, meaningful support, and steady progress."
            />

            <FeatureSection
                variant="variant-03"
                title="Everything you need to succeed"
                features={featuresVariant01}
            />

            <ContentSection
                variant="variant-01"
                title="Built for modern teams"
                subtitle="A powerful platform designed to help you move faster, work smarter, and deliver results."
                image={defaultImage}
                features={defaultFeatures}
                cta={defaultCta}
            />

            <ContentSection
                variant="variant-02"
                title="Built for modern teams"
                subtitle="A powerful platform designed to help you move faster, work smarter, and deliver results."
                image={defaultImage}
                features={defaultFeatures}
                cta={defaultCta}
            />

            <FeatureSection
                variant="variant-02"
                title="Powerful features for every workflow"
                subtitle="Designed for professionals who need speed, quality, and reliability."
                features={featuresVariant02}
                visualStats={defaultVisualStats}
            />

            <HowItWorksSection variant="variant-03" />

            <TestimonialsSection variant="variant-03" />

            <PricingSection
                variant="variant-02"
                title="Simple, transparent pricing"
                subtitle="Choose the plan that fits your needs. No hidden fees."
                plans={defaultPlans}
            />

            <FaqSection variant="variant-03" />

            <CtaSection variant="variant-02" />
        </div>
    )
}
