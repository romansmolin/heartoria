import type { InfoGridCard } from '../model/types'

export const defaultInfoGridCards: InfoGridCard[] = [
    {
        title: 'World-Class Speakers',
        description:
            'Learn from 50+ industry leaders and AI pioneers sharing cutting-edge insights and real-world applications.',
        stat: '50+',
        statLabel: 'Speakers',
        className: 'md:col-span-2 md:row-span-2',
    },
    {
        title: 'Latest Technologies',
        description:
            'Explore hands-on demos of the newest AI tools, frameworks, and platforms shaping the future.',
        stat: '30+',
        statLabel: 'Live Demos',
    },
    {
        title: 'Networking',
        description:
            'Connect with 2,000+ professionals, founders, and researchers in curated networking sessions.',
        stat: '2000+',
        statLabel: 'Attendees',
    },
    {
        title: 'Workshops',
        description: 'Deep-dive into practical, hands-on workshops led by domain experts.',
        stat: '15+',
        statLabel: 'Workshops',
        className: 'md:col-span-2',
    },
]
