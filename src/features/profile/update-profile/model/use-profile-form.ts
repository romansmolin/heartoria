import { useEffect, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useAnalyzeUserProfileMutation,
} from '@/entities/user/api/client/endpoints'
import type { UpdateProfileRequest, AnalyzeProfileResponse } from '@/entities/user/model/types'

export function useProfileForm() {
    const { data: profile, isLoading: profileLoading } = useGetUserProfileQuery()
    const [updateProfile, { isLoading: isSubmitting }] = useUpdateUserProfileMutation()
    const [analyzeProfile, { isLoading: isAnalyzing }] = useAnalyzeUserProfileMutation()

    const [analysis, setAnalysis] = useState<AnalyzeProfileResponse | null>(null)
    const [showAnalysis, setShowAnalysis] = useState(false)

    const form = useForm<UpdateProfileRequest>({
        defaultValues: {
            fullName: '',
            description: '',
            height: undefined,
            weight: undefined,
            eyeColor: undefined,
            hairColor: undefined,
            bodyType: undefined,
            ethnicity: undefined,
            smoking: undefined,
            drinking: undefined,
            education: undefined,
            occupation: undefined,
            income: undefined,
            relationshipStatus: undefined,
            lookingFor: undefined,
            interests: undefined,
        },
    })

    useEffect(() => {
        if (profile) {
            form.reset({
                fullName: profile.fullName ?? '',
                description: profile.description ?? '',
                height: profile.height ?? undefined,
                weight: profile.weight ?? undefined,
                eyeColor: profile.eyeColor ?? undefined,
                hairColor: profile.hairColor ?? undefined,
                bodyType: profile.bodyType ?? undefined,
                ethnicity: profile.ethnicity ?? undefined,
                smoking: profile.smoking ?? undefined,
                drinking: profile.drinking ?? undefined,
                education: profile.education ?? undefined,
                occupation: profile.occupation ?? undefined,
                income: profile.income ?? undefined,
                relationshipStatus: profile.relationshipStatus ?? undefined,
                lookingFor: profile.lookingFor ?? undefined,
                interests: profile.interests ?? undefined,
            })
        }
    }, [profile, form])

    const onSubmit = useCallback(
        async (data: UpdateProfileRequest) => {
            try {
                await updateProfile(data).unwrap()
                toast.success('Profile updated successfully!')
            } catch {
                toast.error('Failed to update profile.')
            }
        },
        [updateProfile],
    )

    const onAnalyze = useCallback(async () => {
        try {
            const result = await analyzeProfile({ profileId: profile?.id }).unwrap()
            setAnalysis(result)
            setShowAnalysis(true)
        } catch {
            toast.error('Failed to analyze profile.')
        }
    }, [analyzeProfile, profile?.id])

    return {
        form,
        profile,
        profileLoading,
        isSubmitting,
        isAnalyzing,
        analysis,
        showAnalysis,
        setShowAnalysis,
        onSubmit: form.handleSubmit(onSubmit),
        onAnalyze,
    }
}
