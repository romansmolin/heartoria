'use client'

import * as React from 'react'
import {
    Activity,
    Gift,
    Heart,
    LayoutDashboard,
    LifeBuoy,
    MessageCircle,
    Send,
    Settings2,
    User,
    Wallet,
} from 'lucide-react'
import {
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarContent,
    SidebarFooter,
    Sidebar,
} from '@/shared/ui/sidebar'
import { NavMain } from '../sidebar-nav-menu/sidebar-nav-menu'
import { Logo } from '@/shared/components/logo/logo'

const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: LayoutDashboard,
        },
        {
            title: 'Discover',
            url: '/match',
            icon: Heart,
        },
        {
            title: 'Chat',
            url: '/chat',
            icon: MessageCircle,
        },
        {
            title: 'Gifts',
            url: '/gifts',
            icon: Gift,
        },
        {
            title: 'Profile',
            url: '/profile',
            icon: User,
        },
        {
            title: 'Activity',
            url: '/activity',
            icon: Activity,
        },
        {
            title: 'Wallet',
            url: '/wallet',
            icon: Wallet,
        },
    ],
    navSecondary: [
        {
            title: 'Support',
            url: '#',
            icon: LifeBuoy,
        },
        {
            title: 'Feedback',
            url: '#',
            icon: Send,
        },
    ],
}

export function SidebarVariant01({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="rounded-[unset]" size="lg" asChild>
                            <div className="flex items-center gap-2 p-0!">
                                <div>
                                    <Logo aria-hidden="true" className="size-1" />
                                </div>
                                <h2 className="font-bold text-2xl">HeartOria</h2>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>

            <SidebarFooter></SidebarFooter>
        </Sidebar>
    )
}
