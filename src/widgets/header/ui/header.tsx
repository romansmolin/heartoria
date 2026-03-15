import { HeaderProps } from '../model/types'
import { HeaderVariant01 } from './variants/variant-01'
import { HeaderVariant02 } from './variants/variant-02'

export function Header({ variant = 'variant-01', className, navigationData }: HeaderProps) {
    switch (variant) {
        case 'variant-02':
            return <HeaderVariant02 className={className} navigationData={navigationData} />
        case 'variant-01':
        default:
            return <HeaderVariant01 className={className} navigationData={navigationData} />
    }
}
