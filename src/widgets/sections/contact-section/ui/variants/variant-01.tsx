'use client'

import { Heart, ShieldCheck, Users } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { cn } from '@/shared/lib/css/utils'
import type { ContactSectionProps } from '../../model/types'

export function ContactVariant01({
    title = 'Create Your Account',
    subtitle = 'Join Heartoria today — it only takes a minute to start finding meaningful connections.',
    className,
}: ContactSectionProps) {
    return (
        <section className={cn('px-4 py-16 md:py-24', className)}>
            <div className="mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        {title}
                    </h2>
                    <p className="mx-auto max-w-2xl text-muted-foreground">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                <Heart className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">
                                    AI-Powered Matching
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Our compatibility algorithm finds people who share your values
                                    and interests.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Safe & Private</h3>
                                <p className="text-sm text-muted-foreground">
                                    Your data is encrypted and your profile is only visible to
                                    verified members.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                <Users className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">
                                    Real People, Real Profiles
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    No bots, no fakes. Every profile goes through our verification
                                    process.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 rounded-2xl border border-border bg-card/30 p-5">
                            <p className="text-sm italic text-muted-foreground">
                                &quot;I signed up on a whim and met my partner within two weeks.
                                Heartoria just gets it.&quot;
                            </p>
                            <p className="mt-2 text-xs font-medium text-foreground">
                                — Rachel, 28
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <form className="space-y-5 rounded-2xl border border-border bg-card/30 p-6 md:p-8">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="signup-username" className="text-foreground">
                                        Username
                                    </Label>
                                    <Input
                                        id="signup-username"
                                        placeholder="Choose a username"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-email" className="text-foreground">
                                        Email
                                    </Label>
                                    <Input
                                        id="signup-email"
                                        type="email"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="signup-password" className="text-foreground">
                                    Password
                                </Label>
                                <Input
                                    id="signup-password"
                                    type="password"
                                    placeholder="Create a strong password"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="signup-dob" className="text-foreground">
                                        Date of Birth
                                    </Label>
                                    <Input id="signup-dob" type="date" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-gender" className="text-foreground">
                                        I am a
                                    </Label>
                                    <select
                                        id="signup-gender"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Man</option>
                                        <option value="female">Woman</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-looking" className="text-foreground">
                                        Looking for
                                    </Label>
                                    <select
                                        id="signup-looking"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Men</option>
                                        <option value="female">Women</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <input
                                    id="signup-consent"
                                    type="checkbox"
                                    className="mt-1 h-4 w-4 rounded border-border accent-primary"
                                />
                                <Label
                                    htmlFor="signup-consent"
                                    className="text-xs text-muted-foreground"
                                >
                                    I agree to the Terms of Service and Privacy Policy. I confirm I
                                    am at least 18 years old.
                                </Label>
                            </div>

                            <Button type="submit" className="w-full" size="lg">
                                Create My Profile
                            </Button>

                            <p className="text-center text-xs text-muted-foreground">
                                Already have an account?{' '}
                                <a href="/auth" className="text-primary hover:underline">
                                    Sign in
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
