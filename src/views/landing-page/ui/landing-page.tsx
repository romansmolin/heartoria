'use client'

import { useRef } from 'react'
import { useGSAP } from '@/shared/hooks/use-gsap'
import { Footer } from '@/widgets/footer'
import { HeroSection } from '@/widgets/sections/hero-section'
import { InfoGridSection } from '@/widgets/sections/info-grid-section'
import { SpeakersSection } from '@/widgets/sections/speakers-section'
import { FeatureSection } from '@/widgets/sections/features-section'
import { TestimonialsSection } from '@/widgets/sections/testimonials-section'
import { CtaSection } from '@/widgets/sections/cta-section'
import { ContactSection } from '@/widgets/sections/contact-section'

export function LandingPage() {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(containerRef)

    return (
        <div className="dark" ref={containerRef}>
            <div className="min-h-screen bg-background">
                <div className="space-y-0">
                    <div data-animate="hero">
                        <HeroSection variant="variant-10" />
                    </div>

                    <div id="how-it-works" data-animate="info-grid">
                        <InfoGridSection variant="variant-01" />
                    </div>

                    <div data-animate="speakers">
                        <SpeakersSection variant="variant-01" />
                    </div>

                    <div id="features" data-animate="features">
                        <FeatureSection variant="variant-05" />
                    </div>

                    <div id="testimonials" data-animate="testimonials">
                        <TestimonialsSection variant="variant-04" />
                    </div>

                    <div data-animate="cta">
                        <CtaSection variant="variant-03" />
                    </div>

                    <div id="contact" data-animate="contact">
                        <ContactSection variant="variant-01" />
                    </div>

                    <div data-animate="footer">
                        <Footer variant="variant-02" />
                    </div>
                </div>
            </div>
        </div>
    )
}
