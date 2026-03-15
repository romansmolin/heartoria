'use client'

import { Footer } from '@/widgets/footer'
import { HeroSection } from '@/widgets/sections/hero-section'
import { InfoGridSection } from '@/widgets/sections/info-grid-section'
import { SpeakersSection } from '@/widgets/sections/speakers-section'
import { FeatureSection } from '@/widgets/sections/features-section'
import { TestimonialsSection } from '@/widgets/sections/testimonials-section'
import { CtaSection } from '@/widgets/sections/cta-section'
import { ContactSection } from '@/widgets/sections/contact-section'

export function LandingPage() {
    return (
        <div className="dark">
            <div className="min-h-screen bg-background">
                <div className="space-y-0">
                    <HeroSection variant="variant-10" />

                    <InfoGridSection variant="variant-01" />

                    <SpeakersSection variant="variant-01" />

                    <FeatureSection variant="variant-05" />

                    <TestimonialsSection variant="variant-04" />

                    <CtaSection variant="variant-03" />

                    <ContactSection variant="variant-01" />

                    <Footer variant="variant-02" />
                </div>
            </div>
        </div>
    )
}
