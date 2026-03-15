import { useState, useCallback } from 'react'
import { apiClient } from '@/shared/api/client/axios.config'
import { toast } from 'sonner'
import type { UserProfilePhoto } from '@/entities/user/model/types'

export function usePhotoManagement(initialPhotos: UserProfilePhoto[]) {
    const [photos, setPhotos] = useState<UserProfilePhoto[]>(initialPhotos)
    const [isUploading, setIsUploading] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const fetchPhotos = useCallback(async () => {
        try {
            const response = await apiClient.get<{ data: UserProfilePhoto[] }>('/api/user/photos')
            setPhotos(response.data.data)
        } catch {
            toast.error('Failed to load photos')
        }
    }, [])

    const uploadPhoto = useCallback(async (file: File) => {
        setIsUploading(true)
        try {
            const formData = new FormData()
            formData.append('photo', file)
            await apiClient.post('/api/user/photos', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            toast.success('Photo uploaded!')
            await fetchPhotos()
        } catch {
            toast.error('Failed to upload photo')
        } finally {
            setIsUploading(false)
        }
    }, [fetchPhotos])

    const deletePhoto = useCallback(async (photoId: string) => {
        setDeletingId(photoId)
        try {
            await apiClient.delete(`/api/user/photos?photoId=${photoId}`)
            setPhotos((prev) => prev.filter((p) => p.id !== photoId))
            toast.success('Photo deleted')
        } catch {
            toast.error('Failed to delete photo')
        } finally {
            setDeletingId(null)
        }
    }, [])

    return {
        photos,
        isUploading,
        deletingId,
        uploadPhoto,
        deletePhoto,
        fetchPhotos,
    }
}
