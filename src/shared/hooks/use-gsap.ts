'use client'

import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function getSectionWrapper(el: Element): Element | null {
    let current: Element | null = el
    while (current) {
        if (current.hasAttribute('data-animate')) return current
        current = current.parentElement
    }
    return null
}

function scrollReveal(
    elements: gsap.TweenTarget,
    trigger: Element,
    from: gsap.TweenVars,
    to: gsap.TweenVars
) {
    gsap.fromTo(elements, from, {
        ...to,
        scrollTrigger: {
            trigger,
            start: 'top 85%',
            toggleActions: 'play none none none',
            onEnter: () => {
                // Ensure the section wrapper is visible when any child triggers
                const wrapper = getSectionWrapper(trigger)
                if (wrapper) gsap.set(wrapper, { visibility: 'visible' })
            },
        },
    })
}

function animateHero(container: Element) {
    const hero = container.querySelector('[data-animate="hero"]')
    if (!hero) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Fade in the whole hero container
    gsap.set(hero, { opacity: 1 })

    const badge = hero.querySelector('.mb-4.w-fit')
    const h1 = hero.querySelector('h1')
    const subtitle = hero.querySelector('p')
    const ctaButtons = hero.querySelectorAll('a')
    const illustration = hero.querySelector('[class*="rotate"]')

    // Staggered text entrance
    tl.fromTo(
        badge,
        { opacity: 0, y: -20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 }
    )
        .fromTo(
            h1,
            { opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' },
            { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.9 },
            '-=0.3'
        )
        .fromTo(
            subtitle,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7 },
            '-=0.5'
        )
        .fromTo(
            ctaButtons,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, stagger: 0.15 },
            '-=0.3'
        )

    // Illustration floats in from the right
    if (illustration) {
        tl.fromTo(
            illustration,
            { opacity: 0, x: 80, rotate: 30 },
            { opacity: 1, x: 0, rotate: 20, duration: 1.2, ease: 'elastic.out(1, 0.6)' },
            0.3
        )
    }

    // Floating hearts parallax drift — target only absolute-positioned hearts
    const hearts = hero.querySelectorAll('[class*="absolute"][class*="opacity-"]')
    hearts.forEach((heart, i) => {
        const direction = i % 2 === 0 ? 1 : -1
        gsap.fromTo(
            heart,
            { opacity: 0, scale: 0, rotate: direction * 45 },
            {
                opacity: parseFloat(getComputedStyle(heart).opacity) || 0.3,
                scale: 1,
                rotate: 0,
                duration: 0.8,
                delay: 0.6 + i * 0.08,
                ease: 'back.out(2)',
            }
        )

        // Continuous gentle floating
        gsap.to(heart, {
            y: direction * gsap.utils.random(8, 20),
            x: direction * gsap.utils.random(3, 8),
            rotation: direction * gsap.utils.random(3, 8),
            duration: gsap.utils.random(2.5, 4),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.2,
        })
    })
}

function animateInfoGrid(container: Element) {
    const section = container.querySelector('[data-animate="info-grid"]')
    if (!section) return

    const heading = section.querySelector('h2')
    const subtitle = section.querySelector('p')
    const cards = section.querySelectorAll('[class*="rounded-2xl"][class*="p-10"]')

    if (heading) {
        scrollReveal(
            heading,
            section,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
        )
    }

    if (subtitle) {
        scrollReveal(
            subtitle,
            section,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7, delay: 0.15, ease: 'power2.out' }
        )
    }

    // Cards slide in from different directions
    cards.forEach((card, i) => {
        const directions = [
            { x: -60, y: 40, rotate: -3 },
            { x: 60, y: 20, rotate: 2 },
            { x: -40, y: 30, rotate: -2 },
        ]
        const dir = directions[i % directions.length]

        scrollReveal(
            card,
            card,
            { opacity: 0, ...dir, scale: 0.92 },
            {
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                duration: 0.8,
                delay: i * 0.15,
                ease: 'power3.out',
            }
        )
    })

    // Stagger avatar images inside first card
    const avatars = section.querySelectorAll('[class*="-space-x"] img')
    if (avatars.length) {
        scrollReveal(
            avatars,
            section,
            { opacity: 0, scale: 0, x: -10 },
            {
                opacity: 1,
                scale: 1,
                x: 0,
                duration: 0.4,
                stagger: 0.1,
                delay: 0.6,
                ease: 'back.out(2)',
            }
        )
    }
}

function animateSpeakers(container: Element) {
    const section = container.querySelector('[data-animate="speakers"]')
    if (!section) return

    const heading = section.querySelector('h2')
    const subtitle = section.querySelector('p')
    const cards = section.querySelectorAll('[class*="group"]')

    if (heading) {
        scrollReveal(
            heading,
            section,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
        )
    }

    if (subtitle) {
        scrollReveal(
            subtitle,
            section,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: 'power2.out' }
        )
    }

    // Cards rise up with stagger and slight rotation
    cards.forEach((card, i) => {
        scrollReveal(
            card,
            card,
            { opacity: 0, y: 80, rotate: i % 2 === 0 ? -3 : 3, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                rotate: 0,
                scale: 1,
                duration: 0.7,
                delay: i * 0.12,
                ease: 'power3.out',
            }
        )
    })
}

function animateFeatures(container: Element) {
    const section = container.querySelector('[data-animate="features"]')
    if (!section) return

    const heading = section.querySelector('h2')
    const cards = section.querySelectorAll('[class*="group"]')

    if (heading) {
        scrollReveal(
            heading,
            section,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
        )
    }

    // Feature cards flip in from alternating sides
    cards.forEach((card, i) => {
        const fromLeft = i % 2 === 0
        scrollReveal(
            card,
            card,
            { opacity: 0, x: fromLeft ? -50 : 50, rotateY: fromLeft ? 8 : -8 },
            {
                opacity: 1,
                x: 0,
                rotateY: 0,
                duration: 0.8,
                delay: i * 0.12,
                ease: 'power3.out',
            }
        )

        // Animate the number badge inside each card
        const badge = card.querySelector('[class*="bg-primary"]')
        if (badge) {
            scrollReveal(
                badge,
                card,
                { opacity: 0, scale: 0, rotate: -180 },
                {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    duration: 0.6,
                    delay: 0.3 + i * 0.12,
                    ease: 'back.out(3)',
                }
            )
        }
    })
}

function animateTestimonials(container: Element) {
    const section = container.querySelector('[data-animate="testimonials"]')
    if (!section) return

    const heading = section.querySelector('h2')
    const cards = section.querySelectorAll('[class*="rounded-2xl"][class*="border"]')

    if (heading) {
        scrollReveal(
            heading,
            section,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
        )
    }

    // Cards pop in with scale bounce, staggered in a wave
    cards.forEach((card, i) => {
        scrollReveal(
            card,
            card,
            { opacity: 0, y: 50, scale: 0.85 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'back.out(1.5)',
            }
        )
    })
}

function animateCta(container: Element) {
    const section = container.querySelector('[data-animate="cta"]')
    if (!section) return

    const icon = section.querySelector('[class*="h-12"]')
    const heading = section.querySelector('h2')
    const subtitle = section.querySelector('[class*="max-w-xl"]')
    const stats = section.querySelectorAll('[class*="text-center"]')
    const button = section.querySelector('button, [class*="btn"], a[class]')

    // Heart icon pulses in
    if (icon) {
        scrollReveal(
            icon,
            section,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.5)' }
        )

        // Continuous heartbeat
        gsap.to(icon, {
            scale: 1.15,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1.5,
            scrollTrigger: {
                trigger: section,
                start: 'top 82%',
                toggleActions: 'play none none none',
            },
        })
    }

    if (heading) {
        scrollReveal(
            heading,
            section,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
        )
    }

    if (subtitle) {
        scrollReveal(
            subtitle,
            section,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7, delay: 0.35, ease: 'power2.out' }
        )
    }

    // Stats count up with stagger
    stats.forEach((stat, i) => {
        scrollReveal(
            stat,
            section,
            { opacity: 0, y: 30, scale: 0.8 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                delay: 0.5 + i * 0.15,
                ease: 'back.out(2)',
            }
        )
    })

    if (button) {
        scrollReveal(
            button,
            section,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, delay: 0.9, ease: 'power2.out' }
        )
    }
}

function animateContact(container: Element) {
    const section = container.querySelector('[data-animate="contact"]')
    if (!section) return

    const heading = section.querySelector('h2')

    // Left column feature blocks
    const featureBlocks = section.querySelectorAll('[class*="items-start"][class*="gap-4"]')
    // Right column form
    const form = section.querySelector('form')

    if (heading) {
        scrollReveal(
            heading,
            section,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
        )
    }

    // Feature blocks slide in from left
    featureBlocks.forEach((block, i) => {
        scrollReveal(
            block,
            section,
            { opacity: 0, x: -40, y: 20 },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.6,
                delay: 0.2 + i * 0.15,
                ease: 'power3.out',
            }
        )
    })

    // Form slides in from right
    if (form) {
        scrollReveal(
            form,
            section,
            { opacity: 0, x: 60, rotateY: 5 },
            {
                opacity: 1,
                x: 0,
                rotateY: 0,
                duration: 0.9,
                delay: 0.3,
                ease: 'power3.out',
            }
        )
    }
}

function animateFooter(container: Element) {
    const section = container.querySelector('[data-animate="footer"]')
    if (!section) return

    scrollReveal(
        section,
        section,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
    )
}

export function useGSAP(containerRef: RefObject<HTMLDivElement | null>) {
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // Hide non-hero sections using visibility so they still occupy
        // layout space and ScrollTrigger can calculate positions correctly
        container.querySelectorAll('[data-animate]').forEach((el) => {
            if (el.getAttribute('data-animate') !== 'hero') {
                gsap.set(el, { visibility: 'hidden' })
            }
        })

        const ctx = gsap.context(() => {
            animateHero(container)
            animateInfoGrid(container)
            animateSpeakers(container)
            animateFeatures(container)
            animateTestimonials(container)
            animateCta(container)
            animateContact(container)
            animateFooter(container)
        }, container)

        return () => ctx.revert()
    }, [containerRef])
}
