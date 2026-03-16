'use client'

import { useState, useCallback } from 'react'
import { SlidersHorizontal } from 'lucide-react'
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
        <div className="sticky top-4 rounded-2xl border bg-card/50 p-5 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <SlidersHorizontal className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-semibold">Filters</span>
            </div>

            <div className="space-y-4">
                {/* Age range */}
                <div>
                    <Label className="mb-2 block text-xs font-medium text-muted-foreground">
                        Age Range
                    </Label>
                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            placeholder="18"
                            value={minAge}
                            onChange={(e) => setMinAge(e.target.value)}
                            className="h-9 rounded-lg"
                        />
                        <span className="text-xs text-muted-foreground">to</span>
                        <Input
                            type="number"
                            placeholder="99"
                            value={maxAge}
                            onChange={(e) => setMaxAge(e.target.value)}
                            className="h-9 rounded-lg"
                        />
                    </div>
                </div>

                {/* Gender */}
                <div>
                    <Label className="mb-2 block text-xs font-medium text-muted-foreground">
                        Looking for
                    </Label>
                    <select
                        className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Anyone</option>
                        <option value="1">Men</option>
                        <option value="2">Women</option>
                        <option value="3">Couples</option>
                    </select>
                </div>

                {/* Location */}
                <div>
                    <Label className="mb-2 block text-xs font-medium text-muted-foreground">
                        Location
                    </Label>
                    <Input
                        type="text"
                        placeholder="Enter city..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="h-9 rounded-lg"
                    />
                </div>

                {/* Toggle options */}
                <div className="space-y-2.5">
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted/50">
                        <input
                            type="checkbox"
                            checked={hasPhoto}
                            onChange={(e) => setHasPhoto(e.target.checked)}
                            className="h-4 w-4 rounded border-input accent-primary"
                        />
                        <span className="text-xs">With photos only</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted/50">
                        <input
                            type="checkbox"
                            checked={isOnline}
                            onChange={(e) => setIsOnline(e.target.checked)}
                            className="h-4 w-4 rounded border-input accent-primary"
                        />
                        <span className="text-xs">Online now</span>
                    </label>
                </div>
            </div>

            <Button
                size="sm"
                className="mt-5 w-full rounded-lg"
                onClick={handleApply}
                disabled={isLoading}
            >
                {isLoading ? 'Searching...' : 'Apply Filters'}
            </Button>
        </div>
    )
}
