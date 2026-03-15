'use client'

import { useRef } from 'react'
import { ImagePlus, Trash2, Loader2, User } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { usePhotoManagement } from '../model/use-photo-management'
import type { UserProfilePhoto } from '@/entities/user/model/types'

interface PhotoGalleryProps {
    initialPhotos: UserProfilePhoto[]
}

export function PhotoGallery({ initialPhotos }: PhotoGalleryProps) {
    const { photos, isUploading, deletingId, uploadPhoto, deletePhoto } = usePhotoManagement(initialPhotos)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            uploadPhoto(file)
            e.target.value = ''
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Photos</h3>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                >
                    {isUploading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <ImagePlus className="mr-2 h-4 w-4" />
                    )}
                    Upload
                </Button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

            {photos.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
                    <User className="mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No photos yet. Upload your first photo!</p>
                </div>
            )}

            <div className="grid grid-cols-3 gap-3">
                {photos.map((photo) => (
                    <div
                        key={photo.id}
                        className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
                    >
                        <img
                            src={photo.url}
                            alt="Profile photo"
                            className="h-full w-full object-cover"
                        />
                        {photo.isPrimary && (
                            <span className="absolute left-1 top-1 rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                                Main
                            </span>
                        )}
                        <Button
                            variant="destructive"
                            size="sm"
                            className="absolute right-1 top-1 h-7 w-7 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={() => deletePhoto(photo.id)}
                            disabled={deletingId === photo.id}
                        >
                            {deletingId === photo.id ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                                <Trash2 className="h-3 w-3" />
                            )}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}
