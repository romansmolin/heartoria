import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Heartoria — Return Policy',
    description: 'Review refund eligibility and the Heartoria return policy.',
}

export default function ReturnPolicyPage() {
    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight">Return Policy</h1>
                <p className="mt-4 text-sm text-muted-foreground">
                    Last Updated: March 15, 2026
                </p>

                <section className="mt-8 space-y-4 text-muted-foreground">
                    <p>
                        This Return Policy describes the circumstances under which you may
                        request a refund for credits purchased on Heartoria. By making a
                        purchase, you agree to the terms outlined below.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        1. General Policy
                    </h2>
                    <p className="text-muted-foreground">
                        Credits purchased on Heartoria are generally non-refundable. Because
                        credits are digital goods that can be used immediately upon purchase, the
                        right of withdrawal may be limited under applicable consumer protection
                        laws. By completing a purchase and checking the consent box, you
                        acknowledge that credits become available for use immediately.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        2. Eligible Refunds
                    </h2>
                    <p className="text-muted-foreground">
                        We will consider refund requests in the following cases:
                    </p>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>
                            <strong className="text-foreground">Duplicate charges:</strong>{' '}
                            You were charged more than once for the same purchase.
                        </li>
                        <li>
                            <strong className="text-foreground">Billing errors:</strong>{' '}
                            An incorrect amount was charged, as confirmed by our support team.
                        </li>
                        <li>
                            <strong className="text-foreground">Service unavailability:</strong>{' '}
                            A significant service outage materially prevented you from using
                            purchased credits.
                        </li>
                        <li>
                            <strong className="text-foreground">Unauthorized transactions:</strong>{' '}
                            A purchase was made without your authorization (subject to
                            verification).
                        </li>
                    </ul>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        3. Non-Refundable Items
                    </h2>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>Credits that have already been spent on features, matches, or gifts.</li>
                        <li>Accounts terminated for violation of our Terms of Service.</li>
                        <li>
                            Purchases where the 14-day refund request window has expired (unless
                            otherwise required by law).
                        </li>
                    </ul>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        4. How to Request a Refund
                    </h2>
                    <p className="text-muted-foreground">
                        To request a refund, contact our support team with the following
                        information:
                    </p>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>Your Heartoria username or email address.</li>
                        <li>The date and amount of the purchase.</li>
                        <li>A brief description of the reason for the refund request.</li>
                    </ul>
                    <p className="text-muted-foreground">
                        Refund requests must be submitted within 14 days of the original purchase
                        date. We will review your request and respond within 5 business days.
                        Approved refunds are processed to the original payment method within
                        5-10 business days.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        5. Consumer Rights
                    </h2>
                    <p className="text-muted-foreground">
                        Nothing in this Return Policy affects your statutory consumer rights
                        under applicable law, including the EU Consumer Rights Directive. If you
                        are a consumer in the European Union, you may have additional rights
                        that cannot be waived by contract.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">6. Contact Us</h2>
                    <p className="text-muted-foreground">
                        For refund requests or questions about this policy, contact us at:
                    </p>
                    <div className="text-muted-foreground space-y-1">
                        <p className="font-medium text-foreground">Heartoria Support</p>
                        <p>Email: support@heartoria.com</p>
                        <p className="mt-3 font-medium text-foreground">SYNEXGEN Sp. z o.o.</p>
                        <p>Aleja Jana Pawla II, nr 27</p>
                        <p>Warszawa, 00-867, Polska</p>
                    </div>
                </section>
            </div>
        </main>
    )
}
