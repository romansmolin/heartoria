import type { CtaButton } from '../model/types'

export const defaultBadge = 'Get started'

export const defaultTitle = 'Try our platform today!'

export const defaultDescription =
    'Managing a growing business today is already tough. Avoid further complications by ditching outdated, tedious methods. Our goal is to streamline your workflow, making it easier and faster than ever.'

export const defaultPrimaryButton: CtaButton = {
    label: 'Sign up here',
    href: '/signup',
    variant: 'default',
}

export const defaultSecondaryButton: CtaButton = {
    label: 'Contact sales',
    href: '/contact',
    variant: 'outline',
}
