import type { AboutVariantProps } from '../../model/types'
import { cn } from '@/shared/lib/css/utils'
import { Badge } from '@/shared/ui/badge'
import Image from 'next/image'

export const AboutSectionVariant02 = ({
    title,
    subtitle,
    badge: _badge,
    image: _image,
    cards: _cards,
    className,
}: AboutVariantProps) => {
    const chipClassName =
        'rounded-2xl sm:rounded-full bg-white text-black border border-black py-2 px-3 sm:px-4 text-xs sm:text-sm leading-relaxed'

    return (
        <section
            className={cn(
                'mx-auto flex w-full max-w-6xl flex-col items-center px-4 sm:px-6 lg:px-8',
                className,
            )}
        >
            <Badge variant="outline" className="text-xs sm:text-sm">
                Who It’s For
            </Badge>

            <h2 className="mt-4 text-center font-serif text-3xl leading-tight sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl lg:leading-16">
                {title}
            </h2>
            <p className="mt-3 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base md:text-lg">
                {subtitle}
            </p>

            <div className="mt-8 grid w-full gap-5 sm:mt-10 sm:gap-6 lg:mt-12 lg:grid-cols-2 lg:gap-10">
                <div className="flex flex-col gap-5 rounded-2xl bg-primary p-4 sm:gap-6 sm:p-5 md:p-6">
                    <div className="text-2xl font-serif text-secondary sm:text-3xl">
                        This <span className="italic font-bold">Is for You</span> If...
                    </div>

                    <div className="flex flex-col gap-3 sm:gap-4">
                        <div className={chipClassName}>
                            You’re an <strong>entrepreneur</strong>,<strong> solopreneur</strong>,
                            or <strong>freelancer</strong>
                        </div>

                        <div className={chipClassName}>
                            You crave honest <strong>feedback</strong> and outside perspective
                        </div>

                        <div className={chipClassName}>
                            You want to <strong>help others </strong>while evolving yourself
                        </div>

                        <div className={chipClassName}>
                            You value <strong>real conversations</strong> over shallow networking{' '}
                        </div>
                    </div>

                    <Image
                        src={'/sections/illustration-1.png'}
                        height={500}
                        width={600}
                        alt="decor"
                        className="h-auto w-full"
                    />
                </div>
                <div className="flex flex-col gap-5 rounded-2xl border-2 border-dashed p-4 sm:gap-6 sm:p-5 md:p-6">
                    <div className="text-2xl font-serif text-foreground sm:text-3xl">
                        This Is <span className="italic font-bold">NOT for You</span> If...
                    </div>

                    <Image
                        src={'/sections/illustration-2.png'}
                        height={500}
                        width={600}
                        alt="decor"
                        className="h-auto w-full"
                    />

                    <div className="flex flex-col gap-3 sm:gap-4">
                        <div className={chipClassName}>
                            You’re an <strong>entrepreneur</strong>,<strong> solopreneur</strong>,
                            or <strong>freelancer</strong>
                        </div>

                        <div className={chipClassName}>
                            You crave honest <strong>feedback</strong> and outside perspective
                        </div>

                        <div className={chipClassName}>
                            You want to <strong>help others </strong>while evolving yourself
                        </div>

                        <div className={chipClassName}>
                            You value <strong>real conversations</strong> over shallow networking{' '}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
