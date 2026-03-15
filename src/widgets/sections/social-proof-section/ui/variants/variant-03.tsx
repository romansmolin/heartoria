import { cn } from '@/shared/lib/css/utils'
import type { SocialProofVariantProps } from '../../model/types'

export function Variant03({ logos, className }: SocialProofVariantProps) {
    return (
        <section className={cn('px-4 py-12', className)}>
            <div className="mx-auto max-w-6xl">
                <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    Trusted by leading companies
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                    {logos.map((logo, index) => (
                        <div
                            key={index}
                            className="text-lg font-semibold text-foreground/40 transition-colors hover:text-foreground/70"
                        >
                            {logo.alt || `Company ${index + 1}`}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
