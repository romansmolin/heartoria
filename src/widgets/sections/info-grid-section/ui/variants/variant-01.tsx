import { cn } from '@/shared/lib/css/utils'
import type { InfoGridSectionProps } from '../../model/types'
import { defaultInfoGridCards } from '../../lib/info-grid-section.mock'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/shared/ui/button'

const defaultUserAvatars = [
    'https://api.dicebear.com/7.x/avataaars/png?seed=User1',
    'https://api.dicebear.com/7.x/avataaars/png?seed=User2',
    'https://api.dicebear.com/7.x/avataaars/png?seed=User3',
    'https://api.dicebear.com/7.x/avataaars/png?seed=User4',
]

export function InfoGridVariant01({
    title = 'Why Heartoria?',
    subtitle = 'Everything you need to find meaningful connections — powered by smart technology and genuine intention.',
    cards = defaultInfoGridCards,
    className,
}: InfoGridSectionProps) {
    return (
        <section className={cn('px-4 py-16 md:py-24', className)}>
            <div className="mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                        {title}
                    </h2>
                    <p className="mx-auto max-w-2xl text-muted-foreground">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2">
                    <div className="bg-primary md:col-span-2 md:row-span-2 rounded-2xl p-10 flex flex-col gap-10">
                        <h2 className="font-bold text-4xl">Smart Matching</h2>

                        <div className="flex items-center gap-5">
                            <div className="rounded-full bg-white text-primary flex items-center justify-center size-12 p-1">
                                <ArrowRight className="size-10 -rotate-45" />
                            </div>

                            <p>
                                Our AI analyzes compatibility across values, lifestyle, and
                                interests to suggest people who truly fit your life.
                            </p>
                        </div>

                        <div className="flex justify-between items-center flex-1">
                            <div className="flex flex-1 -space-x-3">
                                {defaultUserAvatars.map((avatar, idx) => (
                                    <div
                                        key={idx}
                                        className="h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-slate-100 sm:h-10 sm:w-10"
                                    >
                                        <Image
                                            width={200}
                                            height={200}
                                            src={avatar}
                                            alt={`User ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                            unoptimized={avatar.endsWith('.svg')}
                                        />
                                    </div>
                                ))}
                            </div>

                            <Button className="size-14 flex gap-4 items-center text-lg border w-50 border-white! bg-transparent">
                                Join Now
                                <ArrowRight className="size-8 -rotate-45" />
                            </Button>
                        </div>
                    </div>

                    <div className="bg-primary md:col-span-2 md:row-span-1 rounded-2xl p-10 flex flex-col gap-5">
                        <h2 className="font-bold text-4xl">Virtual Gifts</h2>
                        <p>
                            Show someone you care with thoughtful virtual gifts. Browse the catalog,
                            surprise your matches, and spark conversations that matter.
                        </p>
                    </div>
                    <div className="bg-white border-2 border-dashed border-primary text-primary md:col-span-2 md:row-span-1 rounded-2xl p-10  flex flex-col gap-5">
                        <h2 className="font-bold text-4xl">Real-Time Chat</h2>
                        <p>
                            Connect instantly with your matches through real-time messaging. See who
                            is online, track unread messages, and keep the conversation flowing.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
