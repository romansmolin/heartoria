import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/css/utils'
import type { PricingVariantProps } from '../../model/types'

const defaultTickets = [
    {
        id: 'general',
        name: 'General Admission',
        price: 299,
        currency: '$',
        description: 'Full access to all keynotes and sessions.',
        features: [
            { title: 'All keynote sessions' },
            { title: 'Networking events' },
            { title: 'Conference materials' },
        ],
    },
    {
        id: 'vip',
        name: 'VIP Pass',
        price: 599,
        currency: '$',
        description: 'Premium access with exclusive perks.',
        features: [
            { title: 'Everything in General' },
            { title: 'VIP lounge access' },
            { title: 'Priority seating' },
            { title: 'Speaker meet & greet' },
        ],
        isPopular: true,
        label: 'Most Popular',
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: 1499,
        currency: '$',
        description: 'Team packages with dedicated support.',
        features: [
            { title: 'Everything in VIP' },
            { title: '5 team passes' },
            { title: 'Private workshop' },
            { title: 'Dedicated account manager' },
            { title: 'Custom branding' },
        ],
    },
]

export function PricingVariant04({
    title = 'Get Your Tickets',
    subtitle = 'Choose the pass that fits your needs. Early bird pricing ends soon.',
    plans = defaultTickets,
    className,
}: PricingVariantProps) {
    return (
        <section className={cn('px-4 py-16 md:py-24', className)}>
            <div className="mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        {title}
                    </h2>
                    <p className="mx-auto max-w-2xl text-muted-foreground">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={cn(
                                'relative rounded-2xl border p-6 transition-colors md:p-8',
                                plan.isPopular
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border bg-card/30 hover:border-primary/30'
                            )}
                        >
                            {plan.label && (
                                <div className="absolute -top-3 left-6">
                                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                                        {plan.label}
                                    </span>
                                </div>
                            )}

                            <h3 className="mb-2 text-lg font-semibold text-foreground">{plan.name}</h3>
                            <p className="mb-4 text-sm text-muted-foreground">
                                {plan.description}
                            </p>

                            <div className="mb-6">
                                <span className="text-4xl font-bold text-foreground">
                                    {plan.currency}
                                    {plan.price}
                                </span>
                                <span className="text-sm text-muted-foreground"> / person</span>
                            </div>

                            <ul className="mb-8 space-y-3">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Check className="h-4 w-4 shrink-0 text-primary" />
                                        <span className="text-sm text-foreground/80">
                                            {feature.title}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className={cn(
                                    'w-full',
                                    !plan.isPopular && 'bg-secondary text-secondary-foreground hover:bg-accent'
                                )}
                                asChild
                            >
                                <a href="#register">
                                    Get {plan.name}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
