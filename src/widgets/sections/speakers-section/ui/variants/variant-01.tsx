import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { cn } from '@/shared/lib/css/utils'
import type { SpeakersSectionProps } from '../../model/types'
import { defaultSpeakers } from '../../lib/speakers-section.mock'

export function SpeakersVariant01({
    title = 'People on Heartoria',
    subtitle = 'Real people looking for real connections. Here are some of the amazing singles on the platform.',
    speakers = defaultSpeakers,
    className,
}: SpeakersSectionProps) {
    return (
        <section className={cn('px-4 py-16 md:py-24', className)}>
            <div className="mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        {title}
                    </h2>
                    <p className="mx-auto max-w-2xl text-muted-foreground">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {speakers.map((person, index) => (
                        <div
                            key={index}
                            className="group overflow-hidden rounded-2xl border border-border bg-card/30 transition-colors hover:border-primary/30 hover:bg-card"
                        >
                            <div className="relative h-64 w-full overflow-hidden">
                                {person.image ? (
                                    <Image
                                        src={person.image}
                                        alt={person.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center bg-muted">
                                        <span className="text-4xl font-bold text-foreground/20">
                                            {person.name[0]}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="p-5">
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {person.name}
                                    </h3>
                                    {person.age && (
                                        <span className="text-sm text-muted-foreground">
                                            {person.age}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-primary">{person.role}</p>
                                {person.location && (
                                    <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                                        <MapPin className="h-3 w-3" />
                                        {person.location}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
