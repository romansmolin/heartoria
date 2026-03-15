'use client'

import { useState, useCallback } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import type { DiscoverMatchesParams } from '@/entities/match'

interface SearchFiltersProps {
    onApply: (params: DiscoverMatchesParams) => void
    isLoading?: boolean
}

export function SearchFilters({ onApply, isLoading }: SearchFiltersProps) {
    const [minAge, setMinAge] = useState('')
    const [maxAge, setMaxAge] = useState('')
    const [gender, setGender] = useState('')
    const [location, setLocation] = useState('')
    const [hasPhoto, setHasPhoto] = useState(false)
    const [isOnline, setIsOnline] = useState(false)

    const handleApply = useCallback(() => {
        const params: DiscoverMatchesParams = {
            page: 1,
            perPage: 20,
        }
        if (minAge) params.minAge = Number(minAge)
        if (maxAge) params.maxAge = Number(maxAge)
        if (gender) params.gender = Number(gender)
        if (location) params.location = location
        if (hasPhoto) params.hasPhoto = 1
        if (isOnline) params.isOnline = 1
        onApply(params)
    }, [minAge, maxAge, gender, location, hasPhoto, isOnline, onApply])

    return (
        <div className="rounded-lg border bg-card p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                <Search className="h-4 w-4" />
                Search Filters
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label className="text-xs">Min Age</Label>
                    <Input
                        type="number"
                        placeholder="18"
                        value={minAge}
                        onChange={(e) => setMinAge(e.target.value)}
                    />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs">Max Age</Label>
                    <Input
                        type="number"
                        placeholder="99"
                        value={maxAge}
                        onChange={(e) => setMaxAge(e.target.value)}
                    />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs">Gender</Label>
                    <select
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Any</option>
                        <option value="1">Man</option>
                        <option value="2">Woman</option>
                        <option value="3">Couple</option>
                    </select>
                </div>
                <div className="space-y-1">
                    <Label className="text-xs">Location</Label>
                    <Input
                        type="text"
                        placeholder="City"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
            </div>
            <div className="mt-3 flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs">
                    <input
                        type="checkbox"
                        checked={hasPhoto}
                        onChange={(e) => setHasPhoto(e.target.checked)}
                        className="rounded border-input"
                    />
                    Has photo
                </label>
                <label className="flex items-center gap-2 text-xs">
                    <input
                        type="checkbox"
                        checked={isOnline}
                        onChange={(e) => setIsOnline(e.target.checked)}
                        className="rounded border-input"
                    />
                    Online now
                </label>
            </div>
            <Button
                size="sm"
                className="mt-3 w-full"
                onClick={handleApply}
                disabled={isLoading}
            >
                Apply Filters
            </Button>
        </div>
    )
}
