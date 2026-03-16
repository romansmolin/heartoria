import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Heartoria — Terms of Service',
    description: 'Read the Heartoria terms of service and service agreement.',
}

export default function TermsOfServicePage() {
    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    Terms and Conditions and Service Agreement
                </h1>
                <p className="mt-4 text-sm text-muted-foreground">
                    Last Updated: March 15, 2026
                </p>

                <section className="mt-8 space-y-4 text-muted-foreground">
                    <p>
                        Welcome to Heartoria, a dating and compatibility matching service that
                        helps you discover meaningful connections through AI-powered matching. By
                        accessing or using Heartoria (the &quot;Service&quot;), you agree to be
                        bound by the following Terms and Conditions and Service Agreement
                        (&quot;Terms&quot;). If you do not agree with these Terms, please do not
                        use the Service.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        1. Accounts and Eligibility
                    </h2>
                    <h3 className="text-lg font-medium text-foreground">Account Registration</h3>
                    <p className="text-muted-foreground">
                        To use Heartoria, you must create an account with accurate and up-to-date
                        information. You are responsible for maintaining the confidentiality of
                        your account credentials and for all activities that occur under your
                        account. You must promptly notify us of any unauthorized use or security
                        breach of your account.
                    </p>
                    <h3 className="text-lg font-medium text-foreground">Eligibility</h3>
                    <p className="text-muted-foreground">
                        You must be at least 18 years old to use Heartoria. If you are using
                        Heartoria on behalf of an organization, you represent that you have
                        authority to bind that organization to these Terms. The Service is
                        available worldwide, but you are responsible for ensuring that your use
                        complies with local laws and regulations.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        2. Pricing and Credit Purchases
                    </h2>
                    <p className="text-muted-foreground">
                        Heartoria provides default features for every account. You can access
                        premium features by purchasing credits. Credits are one-time purchases and
                        do not renew automatically.
                    </p>
                    <h3 className="text-lg font-medium text-foreground">Fees and Charges</h3>
                    <p className="text-muted-foreground">
                        Some features of the Service require payment via credits. You will have
                        the opportunity to review and accept any fees before they are charged. All
                        fees are non-refundable, except as required by law or expressly allowed by
                        these Terms.
                    </p>
                    <h3 className="text-lg font-medium text-foreground">Published Pricing</h3>
                    <p className="text-muted-foreground">
                        Pricing is published on our website and summarized here for convenience
                        (all amounts in EUR):
                    </p>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>Credits are priced at &euro;0.02 per credit.</li>
                        <li>
                            Quick packs available: 100 credits (&euro;2.00), 200 credits
                            (&euro;4.00), 500 credits (&euro;10.00).
                        </li>
                        <li>
                            Custom amounts: You may purchase any amount between &euro;1.00 and
                            &euro;10,000.00 in &euro;0.02 increments.
                        </li>
                    </ul>
                    <h3 className="text-lg font-medium text-foreground">Pricing Changes</h3>
                    <p className="text-muted-foreground">
                        We reserve the right to modify pricing at any time. If we change pricing,
                        the new pricing applies to future purchases after it is posted on our
                        website.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        3. Use of the Service
                    </h2>
                    <h3 className="text-lg font-medium text-foreground">
                        Matching and Communication
                    </h3>
                    <p className="text-muted-foreground">
                        Heartoria allows you to create a profile, discover potential matches, and
                        communicate with other users. You retain ownership of all content you post
                        through our Service (&quot;User Content&quot;). By using Heartoria, you
                        grant us a limited license to access, process, display, and transmit your
                        content as necessary to provide the Service. This license is solely for
                        the purpose of operating or improving the Service, and we do not claim any
                        ownership over your content.
                    </p>
                    <h3 className="text-lg font-medium text-foreground">User Responsibilities</h3>
                    <p className="text-muted-foreground">
                        You agree to use Heartoria only for lawful purposes and in compliance with
                        these Terms and all applicable laws.
                    </p>
                    <h3 className="text-lg font-medium text-foreground">Prohibited Conduct</h3>
                    <p className="text-muted-foreground">
                        You must not use the Service to do any of the following:
                    </p>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>
                            <strong className="text-foreground">
                                Violations of Rights or Law:
                            </strong>{' '}
                            Post or share any content that infringes or violates someone
                            else&apos;s rights (including intellectual property rights, privacy,
                            or publicity rights) or that violates any law or regulation.
                        </li>
                        <li>
                            <strong className="text-foreground">
                                Offensive or Harmful Content:
                            </strong>{' '}
                            Post content that is defamatory, threatening, harassing, or hateful;
                            content that constitutes hate speech, encourages violence, or is
                            otherwise extremist in nature; content that is obscene, pornographic,
                            or exploitative (including content that sexually exploits minors).
                        </li>
                        <li>
                            <strong className="text-foreground">
                                Fraudulent or Misleading Activities:
                            </strong>{' '}
                            Use the Service to impersonate any person or entity, or submit content
                            that is intentionally false, misleading, or deceptive (including
                            catfishing, phishing, or scamming).
                        </li>
                        <li>
                            <strong className="text-foreground">
                                Spam and Unsolicited Messaging:
                            </strong>{' '}
                            Send unsolicited or bulk messages, spam, or engage in tactics that
                            violate applicable spam laws.
                        </li>
                        <li>
                            <strong className="text-foreground">Malware and Hacking:</strong>{' '}
                            Upload or transmit any viruses, worms, malware, or any other code that
                            is malicious or technologically harmful. Attempt to probe, scan, or
                            test the vulnerability of any system or network, or breach any
                            security or authentication measures of the Service.
                        </li>
                        <li>
                            <strong className="text-foreground">Circumventing Limits:</strong>{' '}
                            Use the Service in a manner that exceeds usage limits or quotas (e.g.,
                            creating multiple accounts to bypass restrictions). You also must not
                            attempt to reverse engineer, decompile, or otherwise tamper with the
                            Service&apos;s software or features.
                        </li>
                        <li>
                            <strong className="text-foreground">Harassment and Stalking:</strong>{' '}
                            Engage in any form of harassment, stalking, or intimidation of other
                            users. Repeatedly contacting someone who has indicated they do not
                            wish to communicate with you is strictly prohibited.
                        </li>
                    </ul>
                    <p className="text-muted-foreground">
                        Violation of any of the above may result in immediate suspension or
                        termination of your Heartoria account (see Termination below), and may
                        also expose you to legal consequences.
                    </p>

                    <h3 className="text-lg font-medium text-foreground">Photo Upload Guidelines</h3>
                    <p className="text-muted-foreground">
                        To maintain a safe and authentic community, every upload must respect the
                        following guidelines:
                    </p>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>
                            Supported image formats: PNG, JPG, JPEG, and WebP.
                        </li>
                        <li>
                            Maximum file size: 10 MB per individual photo.
                        </li>
                        <li>
                            All photos must be of you. Group photos, celebrity images, or
                            stock photos are not permitted as your primary profile photo.
                        </li>
                        <li>
                            You must have the right to use every image you upload, and the
                            files must not contain any material that violates the prohibited
                            conduct rules described above.
                        </li>
                    </ul>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        4. AI-Powered Features
                    </h2>
                    <p className="text-muted-foreground">
                        Heartoria uses artificial intelligence to provide compatibility matching,
                        profile analysis, and other features. AI-generated results are
                        suggestions only and should not be relied upon as definitive assessments
                        of compatibility. We do not guarantee the accuracy or completeness of
                        AI-powered recommendations.
                    </p>
                    <p className="text-muted-foreground">
                        By using AI features, you consent to the processing of your profile
                        information and activity data to generate matches and insights. This
                        processing is described in our{' '}
                        <Link
                            href="/privacy-policy"
                            className="text-primary underline hover:text-primary/80"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        5. Intellectual Property
                    </h2>
                    <h3 className="text-lg font-medium text-foreground">
                        Our Intellectual Property
                    </h3>
                    <p className="text-muted-foreground">
                        Heartoria (including our software, website, and all content we create,
                        such as text, graphics, logos, and compilations) is protected by
                        intellectual property laws. We grant you a limited, revocable,
                        non-exclusive, non-transferable license to use Heartoria for its intended
                        purpose, subject to these Terms. You may not copy, distribute, modify, or
                        create derivative works from our Service except as explicitly allowed by
                        us or by law.
                    </p>
                    <h3 className="text-lg font-medium text-foreground">
                        Your Intellectual Property
                    </h3>
                    <p className="text-muted-foreground">
                        You retain all rights to the content you create and upload to Heartoria.
                        Heartoria does not claim ownership of your User Content. By submitting
                        content through our Service, you grant Heartoria the right to store,
                        transmit, display, and otherwise use your content solely as needed to
                        provide the Service. This license is worldwide, non-exclusive, and
                        royalty-free, and it ends when you delete the content from our systems or
                        when you terminate your account.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">6. Privacy</h2>
                    <p className="text-muted-foreground">
                        Your privacy is very important to us. Our collection and use of personal
                        information through Heartoria is explained in our{' '}
                        <Link
                            href="/privacy-policy"
                            className="text-primary underline hover:text-primary/80"
                        >
                            Privacy Policy
                        </Link>
                        . By using the Service, you agree that we can collect and use your
                        information in accordance with the Privacy Policy. We do not sell personal
                        data, and we honor deletion requests.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        7. Disclaimers and Limitations of Liability
                    </h2>
                    <h3 className="text-lg font-medium text-foreground">
                        Service &quot;As Is&quot;
                    </h3>
                    <p className="text-muted-foreground">
                        Heartoria is provided on an &quot;as is&quot; and &quot;as available&quot;
                        basis. While we aim for high reliability and accuracy, we do not guarantee
                        that the Service will be uninterrupted, error-free, or meet all of your
                        expectations. We disclaim all warranties, express or implied, including
                        any implied warranties of merchantability, fitness for a particular
                        purpose, and non-infringement.
                    </p>
                    <h3 className="text-lg font-medium text-foreground">User Interactions</h3>
                    <p className="text-muted-foreground">
                        Heartoria is not responsible for the conduct of any user on or off the
                        Service. You agree to use caution in all interactions with other users,
                        particularly if you decide to communicate off the Service or meet in
                        person. You are solely responsible for your interactions with other users.
                        We do not conduct criminal background checks on users or verify their
                        identities.
                    </p>
                    <h3 className="text-lg font-medium text-foreground">
                        Limitation of Liability
                    </h3>
                    <p className="text-muted-foreground">
                        To the fullest extent permitted by law, in no event will Heartoria or its
                        parent company, affiliates, officers, employees, or agents be liable for
                        any indirect, incidental, special, consequential, or punitive damages, or
                        any loss of profits or revenues, whether incurred directly or indirectly,
                        or any loss of data, use, goodwill, or other intangible losses, resulting
                        from (a) your access to or use of or inability to access or use the
                        Service; (b) any conduct or content of any third party on or via the
                        Service; (c) any content obtained from the Service; or (d) unauthorized
                        access, use, or alteration of your transmissions or content. In no case
                        shall the aggregate liability of Heartoria to you exceed the amount that
                        you paid us (if any) for the Service in the six months immediately
                        preceding the event giving rise to the claim.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        8. Indemnification
                    </h2>
                    <p className="text-muted-foreground">
                        You agree to indemnify, defend, and hold harmless Heartoria and its
                        affiliates, and each of their respective officers, directors, agents, and
                        employees, from any and all claims, liabilities, damages, losses, and
                        expenses (including reasonable attorneys&apos; fees and costs) arising out
                        of or in any way connected with: (a) your access to or use of the
                        Service, including your User Content; (b) your violation of any of these
                        Terms; (c) your violation of any third-party right, including any
                        intellectual property, confidentiality, or privacy right; or (d) your
                        violation of any laws, rules, regulations, or policies in connection with
                        your use of Heartoria.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">9. Termination</h2>
                    <h3 className="text-lg font-medium text-foreground">By You</h3>
                    <p className="text-muted-foreground">
                        You may stop using Heartoria and/or close your account at any time. If
                        you wish to delete your account and all associated data, you can do so
                        through the account settings or by contacting customer support. Closing
                        your account will terminate your license to use the Service, but the Terms
                        related to Intellectual Property, Disclaimers, Limitation of Liability,
                        and Indemnification will survive termination.
                    </p>
                    <h3 className="text-lg font-medium text-foreground">By Us</h3>
                    <p className="text-muted-foreground">
                        We reserve the right to suspend or terminate your access to Heartoria at
                        any time, with or without notice, for any of the following reasons: (i)
                        if you breach these Terms or our Privacy Policy; (ii) if you engage in
                        prohibited conduct; (iii) if required by law enforcement or government
                        request; or (iv) for any other reason in our sole discretion. In most
                        cases of minor violations, we will attempt to provide a warning before
                        termination, but we are not obligated to do so.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        10. Changes to These Terms
                    </h2>
                    <p className="text-muted-foreground">
                        We may update or modify these Terms from time to time. If a revision is
                        material, we will provide at least 30 days&apos; notice via email or by
                        posting a notice on our site prior to the new terms taking effect. By
                        continuing to use Heartoria after any changes become effective, you agree
                        to be bound by the revised Terms. If you do not agree to the new Terms,
                        you must stop using the Service.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        11. Governing Law and Disputes
                    </h2>
                    <p className="text-muted-foreground">
                        These Terms are governed by and construed in accordance with the laws of
                        Poland, without regard to its conflict of laws principles. These Terms
                        constitute a legally binding agreement between you and SYNEXGEN Sp. z
                        o.o., a company incorporated and existing under the laws of Poland.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">12. Contact Us</h2>
                    <p className="text-muted-foreground">
                        If you have any questions or concerns about these Terms and Conditions,
                        you can contact us at:
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
