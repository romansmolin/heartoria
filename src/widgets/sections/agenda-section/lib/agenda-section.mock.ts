import type { AgendaDay } from '../model/types'

export const defaultAgendaDays: AgendaDay[] = [
    {
        day: 'Day 1',
        date: 'June 15, 2026',
        sessions: [
            {
                time: '09:00 AM',
                title: 'Opening Keynote: The Future of AI',
                speaker: 'Dr. Sarah Chen',
                description: 'A vision for the next decade of artificial intelligence.',
            },
            {
                time: '10:30 AM',
                title: 'Building Responsible AI Systems',
                speaker: 'Marcus Johnson',
                description: 'Ethics and governance in production AI.',
            },
            {
                time: '01:00 PM',
                title: 'Hands-on Workshop: LLM Fine-Tuning',
                speaker: 'Priya Patel',
                description: 'Practical techniques for customizing large language models.',
            },
            {
                time: '03:30 PM',
                title: 'Panel: AI in Healthcare',
                description: 'Industry leaders discuss transformative applications.',
            },
        ],
    },
    {
        day: 'Day 2',
        date: 'June 16, 2026',
        sessions: [
            {
                time: '09:00 AM',
                title: 'Keynote: Multimodal AI Revolution',
                speaker: 'Dr. Alex Rivera',
                description: 'How multimodal models are reshaping industries.',
            },
            {
                time: '11:00 AM',
                title: 'Workshop: Computer Vision at Scale',
                speaker: 'Lena Müller',
                description: 'Deploying vision models in production environments.',
            },
            {
                time: '02:00 PM',
                title: 'Startup Showcase & Demo Day',
                description: '20 AI startups present their innovations.',
            },
            {
                time: '04:00 PM',
                title: 'Networking Reception',
                description: 'Connect with speakers and fellow attendees.',
            },
        ],
    },
    {
        day: 'Day 3',
        date: 'June 17, 2026',
        sessions: [
            {
                time: '09:00 AM',
                title: 'Keynote: AI-Powered Creativity',
                speaker: 'Jordan Blake',
                description: 'Exploring the intersection of AI and creative expression.',
            },
            {
                time: '11:00 AM',
                title: 'Workshop: Building AI Agents',
                speaker: 'Tomoko Sato',
                description: 'From concept to deployment with autonomous agents.',
            },
            {
                time: '02:00 PM',
                title: 'Panel: The Business of AI',
                description: 'Executives share strategies for AI monetization.',
            },
            {
                time: '04:00 PM',
                title: 'Closing Keynote & Awards',
                speaker: 'Dr. Sarah Chen',
                description: 'Reflecting on the summit and announcing award winners.',
            },
        ],
    },
]
