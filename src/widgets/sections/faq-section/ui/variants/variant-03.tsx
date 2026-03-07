import { cn } from '@/shared/lib/css/utils'
import { FaqItem } from '../../model/types'

interface FaqSectionVariant03Props {
    title?: string
    subtitle?: string
    badge?: string
    faqs?: FaqItem[]
    cta?: { label: string; href: string }
    className?: string
}

const defaultFaqs: FaqItem[] = [
    {
        question: 'How do credits work?',
        answer: 'Each action costs a specific number of credits based on the operation. Your balance updates after every successful transaction. Credits never expire.',
    },
    {
        question: 'Do I need to pay to get started?',
        answer: 'No. You can sign up and explore the platform for free. Credits are optional and only needed for specific premium actions.',
    },
    {
        question: 'What file types and formats are supported?',
        answer: 'We support most common formats. For best results use standard file types with good quality source material.',
    },
    {
        question: 'How long does processing take?',
        answer: 'Most operations complete in under a minute. Larger or more complex requests may take slightly longer during peak times.',
    },
    {
        question: 'What is your refund policy?',
        answer: 'We only deduct credits after a successful operation. Failed requests are never charged to your balance.',
    },
    {
        question: 'How is my data handled?',
        answer: 'Uploads and results are stored temporarily so you can access them. You can delete your data at any time from your account settings.',
    },
]

export const FaqSectionVariant03 = ({
    title = 'Frequently Asked Questions',
    subtitle = 'Everything you need to know about our platform.',
    faqs = defaultFaqs,
    className,
}: FaqSectionVariant03Props) => {
    return (
        <section className={cn(className)} id="faq">
            <div className="container mx-auto px-4 max-w-3xl">
                {(title || subtitle) && (
                    <div className="text-center mb-12">
                        {title && (
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-muted-foreground">{subtitle}</p>
                        )}
                    </div>
                )}

                <div className="space-y-3">
                    {faqs.map((item, index) => (
                        <details
                            key={item.question}
                            name="faq-accordion"
                            open={index === 0}
                            className="faq-accordion-item rounded-2xl border border-border bg-card px-6 py-5 shadow-sm"
                        >
                            <summary className="faq-accordion-summary flex cursor-pointer list-none items-center justify-between gap-4">
                                <span className="text-base font-semibold md:text-lg">
                                    {item.question}
                                </span>
                                <span
                                    className="faq-accordion-toggle grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-background text-base"
                                    aria-hidden="true"
                                >
                                    <span className="faq-accordion-toggle-open">−</span>
                                    <span className="faq-accordion-toggle-closed">+</span>
                                </span>
                            </summary>
                            <div className="faq-accordion-content">
                                <div>
                                    <p className="pt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    )
}
