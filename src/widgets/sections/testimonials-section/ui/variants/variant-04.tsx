import { cn } from '@/shared/lib/css/utils'
import { Badge } from '@/shared/ui/badge'
import type { TestimonialsSectionProps, Testimonial } from '../../model/types'

const heartoriaTestimonials: Testimonial[] = [
    {
        content:
            'I was skeptical about dating apps, but Heartoria felt different from day one. The compatibility score actually works — my first match turned into a real relationship.',
        author: 'Jessica M.',
        handle: 'Matched 3 months ago',
        avatar: '',
        platform: 'twitter',
    },
    {
        content:
            'The virtual gifts feature is such a cute touch. My now-boyfriend sent me a gift before our first message and it instantly broke the ice.',
        author: 'Priya K.',
        handle: 'In a relationship',
        avatar: '',
        platform: 'twitter',
    },
    {
        content:
            'Other apps felt like a numbers game. Heartoria actually matches you with people who share your values. Quality over quantity, every time.',
        author: 'Marcus T.',
        handle: 'Found his person',
        avatar: '',
        platform: 'twitter',
    },
    {
        content:
            'The profile analysis feature told me my bio needed work — I updated it and immediately started getting better matches. Smart stuff.',
        author: 'Aisha R.',
        handle: 'Active member',
        avatar: '',
        platform: 'twitter',
    },
    {
        content:
            'I love that I can see who visited my profile. It gives you a real sense of who is interested, no guessing games.',
        author: 'Tom W.',
        handle: 'Premium member',
        avatar: '',
        platform: 'twitter',
    },
    {
        content:
            'Finally a dating app that does not make you feel like you are shouting into the void. Real people, real conversations, real connections.',
        author: 'Elena S.',
        handle: 'Engaged!',
        avatar: '',
        platform: 'twitter',
    },
]

export function TestimonialsVariant04({
    title = 'Love Stories Start Here',
    subtitle = 'Hear from real people who found meaningful connections on Heartoria.',
    testimonials,
    className,
}: TestimonialsSectionProps) {
    const items = testimonials ?? heartoriaTestimonials

    return (
        <section className={cn('px-4 py-16 md:py-24', className)}>
            <div className="mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        {title}
                    </h2>
                    <p className="mx-auto max-w-2xl text-muted-foreground">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {items.slice(0, 6).map((testimonial, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-border bg-card/30 p-6 transition-colors hover:border-primary/30 hover:bg-card"
                        >
                            <Badge className="mb-4 border-primary/30 bg-primary/10 text-primary">
                                {testimonial.handle}
                            </Badge>
                            <p className="mb-4 text-sm text-foreground/80">{testimonial.content}</p>
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground"
                                    aria-label={`Avatar of ${testimonial.author}`}
                                >
                                    {testimonial.author
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                </div>
                                <span className="text-sm font-medium text-foreground">
                                    {testimonial.author}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
