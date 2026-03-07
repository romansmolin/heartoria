import { ReactNode } from 'react'

import { SidebarProvider, SidebarInset } from '@/shared/ui/sidebar'
import { SidebarVariant01 } from './variants/variant-01'

const SIDEBAR_VARIANTS = ['variant-1'] as const
type SidebarVariant = (typeof SIDEBAR_VARIANTS)[number]

const isSidebarVariant = (value: unknown): value is SidebarVariant =>
    typeof value === 'string' && (SIDEBAR_VARIANTS as readonly string[]).includes(value)

const SidebarByVariant: Record<SidebarVariant, ReactNode> = {
    'variant-1': <SidebarVariant01 />,
}

export default function SidebarLayout({
    variant = 'variant-1',
    children,
}: {
    variant?: string
    children: ReactNode
}) {
    const safeVariant: SidebarVariant = isSidebarVariant(variant) ? variant : 'variant-1'

    return (
        <SidebarProvider>
            {SidebarByVariant[safeVariant]}
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    )
}
