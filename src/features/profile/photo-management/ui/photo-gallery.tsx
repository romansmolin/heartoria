'use client'

import { useRef } from 'react'
import { ImagePlus, Trash2, Loader2, Plus } from 'lucide-react'
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
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {photos.map((photo) => (
                    <div
                        key={photo.id}
                        className="group relative aspect-square overflow-hidden rounded-xl border bg-muted transition-shadow hover:shadow-lg hover:shadow-primary/5"
                    >
                        <img
                            src={photo.url}
                            alt="Profile photo"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                        {photo.isPrimary && (
                            <span className="absolute left-2 top-2 rounded-md bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground shadow-sm">
                                Main
                            </span>
                        )}
                        <Button
                            variant="destructive"
                            size="sm"
                            className="absolute right-2 top-2 h-8 w-8 rounded-lg p-0 opacity-0 shadow-lg transition-all group-hover:opacity-100"
                            onClick={() => deletePhoto(photo.id)}
                            disabled={deletingId === photo.id}
                        >
                            {deletingId === photo.id ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                                <Trash2 className="h-3.5 w-3.5" />
                            )}
                        </Button>
                    </div>
                ))}

                {/* Upload tile */}
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 text-primary transition-all hover:border-primary/40 hover:bg-primary/10 disabled:opacity-50"
                >
                    {isUploading ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                        <>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                <Plus className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-medium">Add Photo</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}
