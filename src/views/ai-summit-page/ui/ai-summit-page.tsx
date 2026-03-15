'use client'

import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { HeroSection } from '@/widgets/sections/hero-section'
import { SocialProofSection } from '@/widgets/sections/social-proof-section'
import { InfoGridSection } from '@/widgets/sections/info-grid-section'
import { AgendaSection } from '@/widgets/sections/agenda-section'
import { SpeakersSection } from '@/widgets/sections/speakers-section'
import { FeatureSection } from '@/widgets/sections/features-section'
import { TestimonialsSection } from '@/widgets/sections/testimonials-section'
import { CtaSection } from '@/widgets/sections/cta-section'
import { PricingSection } from '@/widgets/sections/pricing-section'
import { ContactSection } from '@/widgets/sections/contact-section'
import { defaultLogos } from '@/widgets/sections/social-proof-section/lib/social-proof-section.mock'

const summitLogos = [
    ...defaultLogos,
    { src: '', alt: 'OpenAI' },
    { src: '', alt: 'Google DeepMind' },
    { src: '', alt: 'Meta AI' },
]

export function AiSummitPage() {
    return (
        <div className="dark">
            <div className="min-h-screen bg-background">
                <Header variant="variant-02" />

                <div className="space-y-0">
                    <HeroSection variant="variant-10" />

                    <SocialProofSection variant="variant-03" logos={summitLogos} />

                    <InfoGridSection variant="variant-01" />

                    <AgendaSection variant="variant-01" />

                    <SpeakersSection variant="variant-01" />

                    <FeatureSection variant="variant-05" />

                    <TestimonialsSection variant="variant-04" />

                    <CtaSection variant="variant-03" />

                    <PricingSection variant="variant-04" />

                    <ContactSection variant="variant-01" />

                    <Footer variant="variant-02" />
                </div>
            </div>
        </div>
    )
}
