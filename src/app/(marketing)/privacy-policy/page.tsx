import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Heartoria — Privacy Policy',
    description: 'Learn how Heartoria collects, uses, and protects your data.',
}

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
                <p className="mt-4 text-sm text-muted-foreground">
                    Last Updated: March 15, 2026
                </p>

                <section className="mt-8 space-y-4 text-muted-foreground">
                    <p>
                        This Privacy Policy explains how Heartoria (&quot;we&quot;,
                        &quot;us&quot;, &quot;our&quot;) collects, uses, and protects your
                        information when you use our dating and compatibility matching service
                        (the &quot;Service&quot;). By using Heartoria, you consent to the
                        practices described in this policy.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        1. Information We Collect
                    </h2>
                    <h3 className="text-lg font-medium text-foreground">
                        Information You Provide
                    </h3>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>
                            <strong className="text-foreground">Account information:</strong>{' '}
                            Name, email address, username, date of birth, gender, and password
                            when you register.
                        </li>
                        <li>
                            <strong className="text-foreground">Profile information:</strong>{' '}
                            Photos, physical attributes, location, biography, interests,
                            preferences, and other details you choose to share.
                        </li>
                        <li>
                            <strong className="text-foreground">Payment information:</strong>{' '}
                            Payment details processed securely by our third-party payment
                            provider. We do not store your full payment card details.
                        </li>
                        <li>
                            <strong className="text-foreground">Communications:</strong>{' '}
                            Messages you send to other users, support requests, and feedback.
                        </li>
                    </ul>
                    <h3 className="text-lg font-medium text-foreground">
                        Information Collected Automatically
                    </h3>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>Usage data including pages visited, features used, and actions taken.</li>
                        <li>Device information such as browser type, operating system, and IP address.</li>
                        <li>Cookies and similar tracking technologies for session management and analytics.</li>
                    </ul>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        2. How We Use Your Data
                    </h2>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>Provide, maintain, and improve the Service.</li>
                        <li>Generate AI-powered compatibility matches and profile insights.</li>
                        <li>Process credit purchases and manage your wallet.</li>
                        <li>Communicate important updates, security alerts, and support messages.</li>
                        <li>Enforce our Terms of Service and protect against fraud and abuse.</li>
                        <li>Comply with legal obligations.</li>
                    </ul>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        3. How We Share Your Data
                    </h2>
                    <p className="text-muted-foreground">
                        We do not sell your personal data. We may share your information in the
                        following circumstances:
                    </p>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>
                            <strong className="text-foreground">With other users:</strong> Your
                            profile information (name, photos, bio, preferences) is visible to
                            other users as part of the matching experience.
                        </li>
                        <li>
                            <strong className="text-foreground">Service providers:</strong> We
                            work with trusted third-party providers for payment processing,
                            hosting, analytics, and AI services.
                        </li>
                        <li>
                            <strong className="text-foreground">Legal requirements:</strong> We
                            may disclose information if required by law, regulation, or legal
                            process.
                        </li>
                        <li>
                            <strong className="text-foreground">Safety:</strong> We may share
                            information to protect the safety and security of our users and the
                            public.
                        </li>
                    </ul>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        4. Data Retention
                    </h2>
                    <p className="text-muted-foreground">
                        We retain your data for as long as your account is active or as needed to
                        provide the Service. When you delete your account, we will delete or
                        anonymize your personal information within 30 days, except where we are
                        required to retain it for legal or regulatory purposes.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        5. Your Rights and Choices
                    </h2>
                    <p className="text-muted-foreground">
                        Depending on your jurisdiction, you may have the following rights:
                    </p>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>Access, correct, or delete your personal information.</li>
                        <li>Object to or restrict certain processing of your data.</li>
                        <li>Request portability of your data.</li>
                        <li>Withdraw consent at any time (where consent is the legal basis).</li>
                    </ul>
                    <p className="text-muted-foreground">
                        You can update your account information through your profile settings or
                        request deletion by contacting support.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        6. Security
                    </h2>
                    <p className="text-muted-foreground">
                        We implement appropriate technical and organizational measures to protect
                        your personal information against unauthorized access, alteration,
                        disclosure, or destruction. However, no method of transmission over the
                        Internet or electronic storage is 100% secure.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        7. Cookies
                    </h2>
                    <p className="text-muted-foreground">
                        We use cookies and similar technologies to maintain your session, remember
                        your preferences, and understand how you use the Service. You can manage
                        cookie preferences through your browser settings.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        8. Changes to This Policy
                    </h2>
                    <p className="text-muted-foreground">
                        We may update this Privacy Policy from time to time. If we make material
                        changes, we will notify you by email or by posting a notice on the
                        Service prior to the changes taking effect. We encourage you to review
                        this policy periodically.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">9. Contact Us</h2>
                    <p className="text-muted-foreground">
                        If you have questions about this Privacy Policy, you can contact us at:
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
