import Link from 'next/link'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/css/utils'
import type { FooterProps } from '../../model/types'

const defaultFooterLinks = [
    {
        title: 'Product',
        links: [
            { text: 'How It Works', url: '#features' },
            { text: 'Success Stories', url: '#testimonials' },
            { text: 'Safety Tips', url: '#' },
            { text: 'Community', url: '#' },
        ],
    },
    {
        title: 'Company',
        links: [
            { text: 'About', url: '#' },
            { text: 'Blog', url: '#' },
            { text: 'Careers', url: '#' },
            { text: 'Press', url: '#' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { text: 'Privacy Policy', url: '#' },
            { text: 'Terms of Service', url: '#' },
            { text: 'Cookie Policy', url: '#' },
        ],
    },
]

export function FooterVariant02({ className, menuItems, copyright }: FooterProps) {
    const links = menuItems ?? defaultFooterLinks

    return (
        <footer className={cn('border-t border-border px-4 py-12 md:py-16', className)}>
            <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <Link href="/" className="text-xl font-bold text-foreground">
                            Heartoria<span className="text-primary">.</span>
                        </Link>
                        <p className="mb-4 mt-4 max-w-xs text-sm text-muted-foreground">
                            Where real connections begin. Find someone who truly fits your life
                            with AI-powered compatibility matching.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Enter your email"
                                className="max-w-[240px]"
                            />
                            <Button>Subscribe</Button>
                        </div>
                    </div>

                    {links.map((section) => (
                        <div key={section.title}>
                            <h3 className="mb-4 text-sm font-semibold text-foreground">
                                {section.title}
                            </h3>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.text}>
                                        <Link
                                            href={link.url}
                                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
                    <p className="text-sm text-muted-foreground">
                        {copyright ?? `\u00A9 ${new Date().getFullYear()} Heartoria. All rights reserved.`}
                    </p>
                    <div className="flex gap-6">
                        {['Twitter', 'Instagram', 'TikTok'].map((social) => (
                            <Link
                                key={social}
                                href="#"
                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {social}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
