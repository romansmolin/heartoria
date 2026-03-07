'use client'

import { motion } from 'motion/react'
import { Badge } from '@/shared/ui/badge'
import { TestimonialsColumn } from '../components/testimonials-column'
import { Testimonial } from '../../model/types'
import { cn } from '@/shared/lib/css/utils'

interface TestimonialsVariant03Props {
    title?: string
    subtitle?: string
    badge?: string
    testimonials?: Testimonial[]
    className?: string
}

const defaultTestimonials: Testimonial[] = [
    {
        content:
            'I was tired of endless browsing. This platform helped me find someone who shared my values, and our first conversation felt effortless.',
        author: 'Briana Patton',
        handle: 'Member',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        platform: 'twitter',
    },
    {
        content:
            'The profile prompts are actually useful. They made it easy to talk about real priorities instead of just small talk.',
        author: 'Bilal Ahmed',
        handle: 'Member',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        platform: 'twitter',
    },
    {
        content:
            'I appreciate the safety tools and verified profiles. I feel more comfortable here than on other platforms.',
        author: 'Saman Malik',
        handle: 'Verified User',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        platform: 'twitter',
    },
    {
        content:
            'Fewer but better results, which saves time and makes every interaction feel more intentional.',
        author: 'Omar Raza',
        handle: 'Busy Professional',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        platform: 'twitter',
    },
    {
        content:
            'I matched with someone who wanted the same kind of relationship I do. That clarity changed everything for me.',
        author: 'Zainab Hussain',
        handle: 'Long-term Seeker',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
        platform: 'twitter',
    },
    {
        content:
            'The app feels calm and thoughtful. I spend less time scrolling and more time having meaningful conversations.',
        author: 'Aliza Khan',
        handle: 'Member',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
        platform: 'twitter',
    },
    {
        content:
            'Made things feel less random. The compatibility insights helped me understand who I should actually invest time in.',
        author: 'Farhan Siddiqui',
        handle: 'Thoughtful User',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
        platform: 'twitter',
    },
    {
        content:
            'After one week, I had two great conversations and one amazing first meeting. The quality difference is real.',
        author: 'Sana Sheikh',
        handle: 'Member',
        avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop',
        platform: 'twitter',
    },
    {
        content:
            'I like that people show their intentions upfront. It helped me avoid mismatches and focus on genuine connections.',
        author: 'Hassan Ali',
        handle: 'Intentional User',
        avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop',
        platform: 'twitter',
    },
]

export const TestimonialsVariant03 = ({
    title = 'What our users say',
    subtitle = 'Real stories from people building meaningful connections.',
    badge = 'Testimonials',
    testimonials = defaultTestimonials,
    className,
}: TestimonialsVariant03Props) => {
    const firstColumn = testimonials.slice(0, 3)
    const secondColumn = testimonials.slice(3, 6)
    const thirdColumn = testimonials.slice(6, 9)

    return (
        <section
            className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}
            id="testimonials"
        >
            <div className="z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center max-w-135 mx-auto"
                >
                    {badge && (
                        <Badge className="bg-transparent px-3 py-2 text-sm font-medium text-primary border border-primary border-dashed">
                            ✨ {badge}
                        </Badge>
                    )}

                    <h2 className="text-xl uppercase sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-nowrap tracking-tighter mt-5 text-center">
                        {title}
                    </h2>
                    <p className="text-center mt-5 opacity-75 text-slate-600">{subtitle}</p>
                </motion.div>

                <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
                    <TestimonialsColumn testimonials={firstColumn} duration={15} />
                    <TestimonialsColumn
                        testimonials={secondColumn}
                        className="hidden md:block"
                        duration={19}
                    />
                    <TestimonialsColumn
                        testimonials={thirdColumn}
                        className="hidden lg:block"
                        duration={17}
                    />
                </div>
            </div>
        </section>
    )
}
