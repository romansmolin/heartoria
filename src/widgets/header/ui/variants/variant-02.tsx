'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/css/utils'
import type { NavigationData } from '../../model/types'

const defaultNavData: NavigationData = {
    logo: { text: 'HeartOria', href: '/' },
    features: [
        { title: 'Features', href: '#features' },
        { title: 'Testimonials', href: '#testimonials' },
    ],
    company: { primary: [], secondary: [] },
    cta: {
        login: { label: 'Login', href: '/auth' },
        primary: { label: 'Get Started', href: '/auth' },
    },
}

function scrollToSection(href: string) {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (!el) return

    el.style.visibility = 'visible'
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

interface HeaderVariant02Props {
    className?: string
    navigationData?: NavigationData
}

export function HeaderVariant02({ className, navigationData }: HeaderVariant02Props) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const nav = navigationData ?? defaultNavData

    return (
        <header className={cn('fixed top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md', className)}>
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                <Link href={nav.logo.href} className="text-xl font-bold text-foreground">
                    {nav.logo.text}
                    <span className="text-primary">.</span>
                </Link>

                <nav className="hidden items-center gap-8 md:flex">
                    {nav.features.map((link) => (
                        <button
                            key={link.title}
                            type="button"
                            onClick={() => scrollToSection(link.href)}
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {link.title}
                        </button>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={nav.cta.login.href}>{nav.cta.login.label}</Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link href={nav.cta.primary.href}>{nav.cta.primary.label}</Link>
                    </Button>
                </div>

                <button
                    className="text-foreground md:hidden"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {mobileOpen && (
                <div className="border-t border-border bg-background px-4 py-4 md:hidden">
                    <nav className="flex flex-col gap-4">
                        {nav.features.map((link) => (
                            <button
                                key={link.title}
                                type="button"
                                className="text-left text-sm text-muted-foreground hover:text-foreground"
                                onClick={() => {
                                    setMobileOpen(false)
                                    scrollToSection(link.href)
                                }}
                            >
                                {link.title}
                            </button>
                        ))}
                        <div className="flex flex-col gap-2 pt-4">
                            <Button variant="outline" size="sm" asChild>
                                <Link href={nav.cta.login.href}>{nav.cta.login.label}</Link>
                            </Button>
                            <Button size="sm" asChild>
                                <Link href={nav.cta.primary.href}>{nav.cta.primary.label}</Link>
                            </Button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}
