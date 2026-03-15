import { cn } from '@/shared/lib/css/utils'
import type { FeaturesSectionProps } from '../../model/types'

const defaultWhyHeartoriaFeatures = [
    {
        title: 'AI Compatibility Scoring',
        description:
            'Our algorithm analyzes values, lifestyle, and interests to calculate a compatibility score — so you skip the guesswork and meet people who truly match.',
    },
    {
        title: 'Swipe & Discover',
        description:
            'Browse profiles with an intuitive swipe interface. Like, pass, or dive deeper — finding your next match is fast and fun.',
    },
    {
        title: 'Virtual Gifts That Spark Conversation',
        description:
            'Stand out from the crowd by sending thoughtful virtual gifts. Break the ice in a way that feels personal and genuine.',
    },
    {
        title: 'Real-Time Chat',
        description:
            'When you match, the conversation starts instantly. See who is online, send messages in real time, and keep the momentum going.',
    },
]

export function FeatureSectionVariant05({
    title = 'How Heartoria Works',
    subtitle = 'Built around what actually matters — compatibility, intention, and real connection.',
    features,
    className,
}: FeaturesSectionProps) {
    const items = features ?? defaultWhyHeartoriaFeatures

    return (
        <section className={cn('px-4 py-16 md:py-24', className)}>
            <div className="mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mx-auto max-w-2xl text-muted-foreground">{subtitle}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {items.map((feature, index) => (
                        <div
                            key={index}
                            className="group rounded-2xl border border-border bg-card/30 p-6 transition-colors hover:border-primary/30 hover:bg-card"
                        >
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <span className="text-lg font-bold text-primary">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-foreground">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
