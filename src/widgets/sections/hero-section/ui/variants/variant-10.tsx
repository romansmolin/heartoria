import { ArrowRight, Heart } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { cn } from '@/shared/lib/css/utils'
import type { HeroVariantProps } from '../../model/types'
import { Illustration1 } from '@/shared/illustrations/illustration-1'
import { IllustrationHeart } from '@/shared/illustrations/illustration-heart'

export function HeroVariant10({ content, className }: HeroVariantProps) {
    return (
        <section
            className={cn(
                'relative flex sm:min-h-screen flex-col justify-center overflow-hidden px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10',
                className,
            )}
        >
            <div className="relative border border-primary flex-1 flex flex-col md:flex-row overflow-hidden items-center rounded-2xl">
                {/* Decorative gradient */}
                <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 translate-x-1/3 translate-y-[-20%] rounded-full bg-primary/20 blur-[120px] md:h-150 md:w-150" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-60 w-60 translate-x-[-30%] translate-y-[30%] rounded-full bg-primary/10 blur-[100px] md:h-100 md:w-100" />

                {/* Content + illustration wrapper */}
                <div className="px-5 py-10 sm:px-8 md:px-10 flex flex-col md:flex-row gap-5 w-full overflow-hidden md:items-center">
                    {/* Text content */}
                    <div className="relative z-10 flex flex-col text-start">
                        <Badge className="mb-4 w-fit border-primary/30 bg-primary/10 text-primary sm:mb-6">
                            <Heart className="mr-2 h-3 w-3" />
                            AI-Powered Compatibility
                            <span className="mx-2 hidden text-muted-foreground sm:inline">|</span>
                            <span className="hidden sm:inline">Meaningful Matches</span>
                        </Badge>

                        <h1 className="mb-4 max-w-4xl text-3xl font-bold tracking-tight text-foreground sm:mb-6 sm:text-5xl lg:text-7xl xl:text-9xl">
                            {content.headlineLine1}
                            <span className="block text-primary">{content.headlineLine2}</span>
                        </h1>

                        <p className="mb-6 max-w-xl text-base text-muted-foreground sm:mb-8 sm:max-w-2xl sm:text-lg">
                            {content.subtitle}
                        </p>

                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button size="lg" className="h-12 sm:h-14" asChild>
                                <a href={content.primaryCta.href}>
                                    {content.primaryCta.label}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Illustration — stacked below on mobile, absolute-positioned on md+ */}
                    <div className="relative flex items-center justify-center md:absolute md:right-5 md:bottom-[50%] md:translate-y-[50%]">
                        <Illustration1 className="size-75 sm:size-60 sm:size-72 md:size-80 lg:size-100 xl:size-115 rotate-20 z-0" />
                    </div>
                </div>

                {/* Floating hearts — scattered around */}
                {/* Right cluster */}
                <IllustrationHeart className="size-10 sm:size-14 md:size-16 lg:size-20 absolute right-6 sm:right-12 top-6 rotate-12 opacity-60" />
                <IllustrationHeart className="size-8 sm:size-10 lg:size-14 absolute right-20 sm:right-52 -top-2 -rotate-20 opacity-40" />
                <IllustrationHeart className="size-5 sm:size-6 lg:size-8 absolute right-16 sm:right-36 top-16 rotate-45 opacity-30" />
                <IllustrationHeart className="size-10 sm:size-16 lg:size-24 absolute -right-2 sm:-right-4 bottom-12 -rotate-12 opacity-20" />
                <IllustrationHeart className="hidden sm:block size-8 lg:size-10 absolute right-40 lg:right-80 bottom-8 rotate-30 opacity-35" />
                <IllustrationHeart className="size-5 sm:size-6 absolute right-12 sm:right-24 bottom-28 -rotate-35 opacity-25" />
                <IllustrationHeart className="hidden sm:block size-10 lg:size-16 absolute right-32 lg:right-64 bottom-[55%] rotate-6 opacity-15" />

                {/* Left side & edges */}
                <IllustrationHeart className="size-8 sm:size-10 md:size-12 absolute left-[15%] top-4 -rotate-25 opacity-20" />
                <IllustrationHeart className="size-5 sm:size-6 md:size-7 absolute left-[30%] bottom-10 rotate-40 opacity-15" />
                <IllustrationHeart className="size-8 sm:size-12 md:size-18 absolute left-[5%] bottom-[40%] rotate-10 opacity-10" />
                <IllustrationHeart className="size-4 sm:size-5 absolute left-[45%] top-10 -rotate-15 opacity-25" />
                <IllustrationHeart className="hidden sm:block size-7 md:size-9 absolute right-[45%] bottom-4 rotate-55 opacity-20" />
                <IllustrationHeart className="hidden md:block size-11 absolute right-28 top-[30%] -rotate-40 opacity-18" />
            </div>
        </section>
    )
}
