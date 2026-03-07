import type { FaqItem } from '../model/types'

export const defaultFaqs: FaqItem[] = [
    {
        question: 'How do credits work?',
        answer: 'Each action costs a specific number of credits based on the operation. Your balance updates after every successful transaction.',
    },
    {
        question: 'What file types are supported?',
        answer: 'We support most common file formats. For best results, use standard formats with good quality.',
    },
    {
        question: 'How long does processing take?',
        answer: 'Most operations complete in under a minute. Larger or more complex requests may take slightly longer during peak times.',
    },
    {
        question: 'What output formats are available?',
        answer: 'You can download your results in various high-quality formats ready for use.',
    },
    {
        question: 'What is your refund policy?',
        answer: 'We only deduct credits after successful operations. Failed requests do not reduce your balance.',
    },
    {
        question: 'How do you handle my data?',
        answer: 'We store uploads and results temporarily so you can access them. You can delete your data anytime from your account.',
    },
]
