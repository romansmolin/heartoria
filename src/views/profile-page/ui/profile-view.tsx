'use client'

import { ProfileForm } from '@/features/profile/update-profile'
import { PhotoGallery } from '@/features/profile/photo-management'
import { useGetUserProfileQuery } from '@/entities/user/api/client/endpoints'
import { GenericCard } from '@/shared/components'

export function ProfileView() {
    const { data: profile } = useGetUserProfileQuery()

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto w-full max-w-3xl space-y-8 px-4 pb-16 pt-10">
                <header className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Profile</p>
                    <h1 className="text-3xl font-semibold text-slate-900">Your Profile</h1>
                    <p className="text-sm text-slate-600">
                        Update your personal info and preferences.
                    </p>
                </header>

                <GenericCard
                    cardTitle="Photo Gallery"
                    cardDescription="Manage your profile photos."
                    cardContent={
                        <PhotoGallery initialPhotos={profile?.photos ?? []} />
                    }
                />

                <ProfileForm />
            </div>
        </div>
    )
}
