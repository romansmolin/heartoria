import { ArrowRight, Heart } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/css/utils'
import type { CtaSectionProps } from '../../model/types'

export function CtaVariant03({
    title = 'YOUR STORY STARTS HERE',
    description = 'Join thousands of singles who are done with shallow swiping and ready for something real. Create your free profile in under a minute.',
    primaryButton = { label: 'Create Free Account', href: '/auth' },
    className,
}: CtaSectionProps) {
    return (
        <section className={cn('px-4 py-16 md:py-24', className)}>
            <div className="mx-auto max-w-6xl">
                <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/20 via-transparent to-primary/10 p-8 text-center md:p-16">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--primary)/0.15,transparent_70%)]" />

                    <div className="relative">
                        <div className="mb-6 flex justify-center">
                            <Heart className="h-12 w-12 text-primary" />
                        </div>

                        <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                            {title}
                        </h2>
                        <p className="mx-auto mb-10 max-w-xl text-muted-foreground">
                            {description}
                        </p>

                        <div className="mb-8 flex justify-center gap-8 md:gap-12">
                            {[
                                { value: '50K+', label: 'Active Singles' },
                                { value: '12K+', label: 'Matches Made' },
                                { value: '92%', label: 'Match Satisfaction' },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <p className="text-2xl font-bold text-primary md:text-3xl">
                                        {stat.value}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <Button size="lg" asChild>
                            <a href={primaryButton.href}>
                                {primaryButton.label}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
