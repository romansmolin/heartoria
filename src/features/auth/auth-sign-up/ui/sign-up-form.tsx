'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { useSignUpMutation } from '../api/client/endpoints'
import { SignUpDto, signUpSchema } from '@/features/auth/auth-sign-up/contracts/sign-up.dto'
import { normalizeError } from '@/shared/api/client/error-normalizer'
import { Alert } from '@/shared/ui/alert'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

export function SignUpForm() {
    const router = useRouter()
    const [signUp, { isLoading }] = useSignUpMutation()
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpDto>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            consent: false,
        },
    })

    const onSubmit = async (data: SignUpDto) => {
        try {
            setError(null)
            await signUp(data).unwrap()
            router.push('/dashboard')
        } catch (err) {
            const normalized = normalizeError(err)
            setError(normalized.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" data-testid="sign-up-form">
            {error && (
                <Alert variant="destructive" data-testid="error-message">
                    {error}
                </Alert>
            )}

            <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    type="text"
                    placeholder="johndoe123"
                    {...register('username')}
                    data-testid="username-input"
                />
                {errors.username && (
                    <p className="text-sm text-destructive" data-testid="username-error">
                        {errors.username.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register('email')}
                    data-testid="email-input"
                />
                {errors.email && (
                    <p className="text-sm text-destructive" data-testid="email-error">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register('password')}
                    data-testid="password-input"
                />
                {errors.password && (
                    <p className="text-sm text-destructive" data-testid="password-error">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <select
                    id="gender"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    {...register('gender')}
                    data-testid="gender-select"
                >
                    <option value="">Select gender</option>
                    <option value="man">Man</option>
                    <option value="woman">Woman</option>
                    <option value="non_binary">Non-binary</option>
                    <option value="other">Other</option>
                </select>
                {errors.gender && (
                    <p className="text-sm text-destructive" data-testid="gender-error">
                        {errors.gender.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="lookingFor">Looking for</Label>
                <select
                    id="lookingFor"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    {...register('lookingFor')}
                    data-testid="looking-for-select"
                >
                    <option value="">Select preference</option>
                    <option value="man">Man</option>
                    <option value="women">Women</option>
                    <option value="couple">Couple</option>
                </select>
                {errors.lookingFor && (
                    <p className="text-sm text-destructive" data-testid="looking-for-error">
                        {errors.lookingFor.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of birth</Label>
                <Input
                    id="dateOfBirth"
                    type="date"
                    {...register('dateOfBirth')}
                    data-testid="date-of-birth-input"
                />
                {errors.dateOfBirth && (
                    <p className="text-sm text-destructive" data-testid="date-of-birth-error">
                        {errors.dateOfBirth.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="city">City (optional)</Label>
                <Input
                    id="city"
                    type="text"
                    placeholder="Your city"
                    {...register('city')}
                    data-testid="city-input"
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-start gap-2">
                    <input
                        id="consent"
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                        {...register('consent')}
                        data-testid="sign-up-consent-checkbox"
                    />
                    <Label
                        htmlFor="consent"
                        className="text-sm font-normal leading-snug text-slate-600"
                    >
                        I agree to the{' '}
                        <a
                            href="/terms-of-service"
                            target="_blank"
                            rel="noreferrer"
                            className="underline hover:text-slate-900"
                            data-testid="sign-up-terms-link"
                        >
                            Terms of Service
                        </a>
                        ,{' '}
                        <a
                            href="/privacy-policy"
                            target="_blank"
                            rel="noreferrer"
                            className="underline hover:text-slate-900"
                            data-testid="sign-up-privacy-link"
                        >
                            Privacy Policy
                        </a>
                        , and{' '}
                        <a
                            href="/return-policy"
                            target="_blank"
                            rel="noreferrer"
                            className="underline hover:text-slate-900"
                            data-testid="sign-up-return-link"
                        >
                            Return Policy
                        </a>
                        .
                    </Label>
                </div>
                {errors.consent && (
                    <p className="text-sm text-destructive" data-testid="sign-up-consent-error">
                        {errors.consent.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                data-testid="submit-button"
            >
                {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
        </form>
    )
}
