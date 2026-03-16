'use client'

import { Camera, Settings, User } from 'lucide-react'
import { ProfileForm } from '@/features/profile/update-profile'
import { PhotoGallery } from '@/features/profile/photo-management'
import { useGetUserProfileQuery } from '@/entities/user/api/client/endpoints'

export function ProfileView() {
    const { data: profile } = useGetUserProfileQuery()

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
            <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-primary/5 blur-[100px]" />

            <div className="relative mx-auto w-full max-w-4xl px-4 pb-16 pt-8">
                {/* Profile hero header */}
                <header className="mb-8">
                    <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/5 via-card to-card p-6 sm:p-8">
                        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-[60px]" />
                        <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border-2 border-primary/20 bg-muted shadow-lg shadow-primary/5 sm:h-24 sm:w-24">
                                    {profile?.avatarUrl ? (
                                        <img
                                            src={profile.avatarUrl}
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <User className="h-10 w-10 text-muted-foreground/40" />
                                    )}
                                </div>
                                <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md">
                                    <Camera className="h-3.5 w-3.5" />
                                </div>
                            </div>

                            {/* Profile info */}
                            <div className="text-center sm:text-left">
                                <h1 className="text-2xl font-bold tracking-tight">
                                    {profile?.username || 'Your Profile'}
                                </h1>
                                {profile?.email && (
                                    <p className="mt-0.5 text-sm text-muted-foreground">
                                        {profile.email}
                                    </p>
                                )}
                                <p className="mt-2 text-xs text-muted-foreground">
                                    Manage your photos, personal info, and preferences
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content sections */}
                <div className="space-y-6">
                    {/* Photo Gallery section */}
                    <section className="rounded-2xl border bg-card/50 backdrop-blur-sm">
                        <div className="flex items-center gap-2.5 border-b px-6 py-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                <Camera className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold">Photo Gallery</h2>
                                <p className="text-xs text-muted-foreground">
                                    Add photos to get more matches
                                </p>
                            </div>
                        </div>
                        <div className="p-6">
                            <PhotoGallery initialPhotos={profile?.photos ?? []} />
                        </div>
                    </section>

                    {/* Profile form section */}
                    <section className="rounded-2xl border bg-card/50 backdrop-blur-sm">
                        <div className="flex items-center gap-2.5 border-b px-6 py-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                <Settings className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold">Profile Details</h2>
                                <p className="text-xs text-muted-foreground">
                                    Your info and preferences
                                </p>
                            </div>
                        </div>
                        <div className="p-6">
                            <ProfileForm />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
