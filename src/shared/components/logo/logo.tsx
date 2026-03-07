import { cn } from '@/shared/lib/css/utils'
import React from 'react'

type LogoProps = React.SVGProps<SVGSVGElement>

export const Logo = ({ className, width = 24, height = 24, ...props }: LogoProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            focusable="false"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(className, 'size-12 rounded-2xl bg-primary p-2')}
            {...props}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="white"
            >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        </svg>
    )
}
