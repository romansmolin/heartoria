import type { AboutSectionDefaults } from '../model/types'

const OFFICE_HERO_IMAGE =
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'

export const defaultAboutContent: AboutSectionDefaults = {
    badge: 'What is Alliatus?',
    title: 'Not Your Typical Networking Group.',
    subtitle:
        'Alliatus is a curated mastermind platform that brings together motivated people in small groups for honest feedback and collective accountability.',
    image: {
        src: OFFICE_HERO_IMAGE,
        alt: 'Members collaborating in a modern office',
    },
    cards: [
        {
            title: 'We Are Here To Help',
            description:
                'Alliatus is a curated mastermind platform that brings together motivated individuals in small groups for deep conversation, honest feedback, and collective accountability.',
            variant: 'outline',
        },
        {
            title: 'Small, Handpicked Circles',
            description:
                'You are matched with 5-6 people who are aligned with your stage, goals, and mindset.',
            variant: 'filled',
        },
        {
            title: 'Real Conversations',
            description:
                'No fluff. Get feedback, ask for help, and brainstorm challenges in structured calls.',
            variant: 'filled',
        },
        {
            title: 'Consistent Growth',
            description:
                'Ongoing sessions to help you stay accountable, make bold moves, and reach goals faster.',
            variant: 'filled',
        },
    ],
}
