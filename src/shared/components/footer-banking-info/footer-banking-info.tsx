interface FooterBankingInfoProps {
    className?: string
}

export const FooterBankingInfo = ({ className }: FooterBankingInfoProps) => {
    return (
        <div className={className}>
            <p className="text-xs text-muted-foreground text-center">
                Payments are securely processed. All transactions are encrypted and protected.
            </p>
        </div>
    )
}
