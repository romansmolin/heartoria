'use client'

import { useState } from 'react'
import { cn } from '@/shared/lib/css/utils'
import { Separator } from '@/shared/ui/separator'
import type { AgendaSectionProps } from '../../model/types'
import { defaultAgendaDays } from '../../lib/agenda-section.mock'

export function AgendaVariant01({
    title = 'Event Agenda',
    subtitle = 'Three days packed with keynotes, workshops, and networking.',
    days = defaultAgendaDays,
    className,
}: AgendaSectionProps) {
    const [activeDay, setActiveDay] = useState(0)

    return (
        <section className={cn('px-4 py-16 md:py-24', className)}>
            <div className="mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        {title}
                    </h2>
                    <p className="mx-auto max-w-2xl text-muted-foreground">{subtitle}</p>
                </div>

                <div className="mb-8 flex justify-center gap-2">
                    {days.map((day, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveDay(index)}
                            className={cn(
                                'rounded-full px-6 py-2 text-sm font-medium transition-colors',
                                activeDay === index
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-card/30 text-muted-foreground hover:bg-card hover:text-foreground'
                            )}
                        >
                            {day.day}
                            <span className="ml-2 hidden text-xs opacity-70 sm:inline">
                                {day.date}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="rounded-2xl border border-border bg-card/30 p-6 md:p-8">
                    <div className="space-y-0">
                        {days[activeDay]?.sessions.map((session, index) => (
                            <div key={index}>
                                {index > 0 && <Separator className="my-6 bg-border" />}
                                <div className="flex flex-col gap-4 md:flex-row md:items-start">
                                    <div className="w-28 shrink-0">
                                        <span className="text-sm font-medium text-primary">
                                            {session.time}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">
                                            {session.title}
                                        </h3>
                                        {session.speaker && (
                                            <p className="mt-1 text-sm font-medium text-primary/80">
                                                {session.speaker}
                                            </p>
                                        )}
                                        {session.description && (
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {session.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
