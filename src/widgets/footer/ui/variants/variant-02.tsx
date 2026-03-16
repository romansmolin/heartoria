import Link from 'next/link'
import { cn } from '@/shared/lib/css/utils'
import type { FooterProps } from '../../model/types'

const defaultFooterLinks = [
    {
        title: 'Product',
        links: [
            { text: 'How It Works', url: '#features' },
            { text: 'Success Stories', url: '#testimonials' },
            { text: 'Dashboard', url: '/dashboard' },
            { text: 'Discover', url: '/match' },
        ],
    },
    {
        title: 'Account',
        links: [
            { text: 'Sign In', url: '/auth' },
            { text: 'Profile', url: '/profile' },
            { text: 'Wallet', url: '/wallet' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { text: 'Terms of Service', url: '/terms-of-service' },
            { text: 'Privacy Policy', url: '/privacy-policy' },
            { text: 'Return Policy', url: '/return-policy' },
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
                            Where real connections begin. Find someone who truly fits your life with
                            AI-powered compatibility matching.
                        </p>
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
                        {copyright ??
                            `\u00A9 ${new Date().getFullYear()} Heartoria. All rights reserved.`}
                    </p>
                </div>
            </div>
        </footer>
    )
}
