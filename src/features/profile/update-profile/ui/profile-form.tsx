'use client'

import { User, Sparkles, Save } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Textarea } from '@/shared/ui/textarea'
import { Skeleton } from '@/shared/ui/skeleton'
import { Badge } from '@/shared/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { useProfileForm } from '../model/use-profile-form'

const PREFERENCE_FIELDS = [
    { key: 'height', label: 'Height' },
    { key: 'weight', label: 'Weight' },
    { key: 'eyeColor', label: 'Eye Color' },
    { key: 'hairColor', label: 'Hair Color' },
    { key: 'bodyType', label: 'Body Type' },
    { key: 'ethnicity', label: 'Ethnicity' },
    { key: 'smoking', label: 'Smoking' },
    { key: 'drinking', label: 'Drinking' },
    { key: 'education', label: 'Education' },
    { key: 'occupation', label: 'Occupation' },
    { key: 'income', label: 'Income' },
    { key: 'relationshipStatus', label: 'Relationship Status' },
    { key: 'lookingFor', label: 'Looking For' },
    { key: 'interests', label: 'Interests' },
] as const

const PRIORITY_COLORS: Record<string, string> = {
    high: 'bg-red-500/10 text-red-500 border-red-500/20',
    medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    low: 'bg-green-500/10 text-green-500 border-green-500/20',
}

export function ProfileForm() {
    const {
        form,
        profile,
        profileLoading,
        isSubmitting,
        isAnalyzing,
        analysis,
        showAnalysis,
        setShowAnalysis,
        onSubmit,
        onAnalyze,
    } = useProfileForm()

    if (profileLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-48 rounded-lg" />
                <Skeleton className="h-64 w-full rounded-xl" />
                <Skeleton className="h-64 w-full rounded-xl" />
            </div>
        )
    }

    return (
        <>
            <form onSubmit={onSubmit} className="space-y-8">
                {/* Identity section */}
                <div className="space-y-5">
                    <div>
                        <h3 className="text-sm font-semibold">Basic Information</h3>
                        <p className="text-xs text-muted-foreground">Your public identity</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-xs font-medium text-muted-foreground">
                                Username
                            </Label>
                            <Input
                                id="username"
                                value={profile?.username ?? ''}
                                disabled
                                className="rounded-lg bg-muted/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-xs font-medium text-muted-foreground">
                                Full Name
                            </Label>
                            <Input id="fullName" {...form.register('fullName')} className="rounded-lg" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-medium text-muted-foreground">
                            Email
                        </Label>
                        <Input
                            id="email"
                            value={profile?.email ?? ''}
                            disabled
                            className="rounded-lg bg-muted/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-xs font-medium text-muted-foreground">
                            About Me
                        </Label>
                        <Textarea
                            id="description"
                            rows={4}
                            {...form.register('description')}
                            placeholder="Tell others about yourself..."
                            className="rounded-lg resize-none"
                        />
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t" />

                {/* Preferences section */}
                <div className="space-y-5">
                    <div>
                        <h3 className="text-sm font-semibold">Preferences</h3>
                        <p className="text-xs text-muted-foreground">
                            Physical attributes and lifestyle
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {PREFERENCE_FIELDS.map(({ key, label }) => (
                            <div key={key} className="space-y-2">
                                <Label htmlFor={key} className="text-xs font-medium text-muted-foreground">
                                    {label}
                                </Label>
                                <Input
                                    id={key}
                                    type="number"
                                    {...form.register(key, { valueAsNumber: true })}
                                    className="rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-lg"
                    >
                        <Save className="mr-2 h-4 w-4" />
                        {isSubmitting ? 'Saving...' : 'Save Profile'}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isAnalyzing}
                        onClick={onAnalyze}
                        className="rounded-lg border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
                    >
                        <Sparkles className="mr-2 h-4 w-4" />
                        {isAnalyzing ? 'Analyzing...' : 'AI Analysis'}
                    </Button>
                </div>
            </form>

            {/* Analysis dialog */}
            <Dialog open={showAnalysis} onOpenChange={setShowAnalysis}>
                <DialogContent className="max-w-lg rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary" />
                            Profile Analysis
                        </DialogTitle>
                    </DialogHeader>
                    {analysis && (
                        <div className="space-y-5">
                            {/* Score */}
                            <div className="flex items-center gap-4 rounded-xl bg-primary/5 p-4">
                                <span className="text-4xl font-bold text-primary">
                                    {analysis.score}%
                                </span>
                                <div>
                                    <p className="text-sm font-medium">Profile Score</p>
                                    <p className="text-xs text-muted-foreground">
                                        Based on completeness and quality
                                    </p>
                                </div>
                            </div>

                            <p className="text-sm leading-relaxed">{analysis.summary}</p>

                            {/* Recommendations */}
                            {analysis.checklist.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Recommendations
                                    </h4>
                                    {analysis.checklist.map((item, i) => (
                                        <div
                                            key={i}
                                            className="rounded-xl border bg-card/50 p-4"
                                        >
                                            <div className="mb-2 flex items-center gap-2">
                                                <Badge
                                                    variant="secondary"
                                                    className={`rounded-md text-[10px] ${PRIORITY_COLORS[item.priority] ?? ''}`}
                                                >
                                                    {item.priority}
                                                </Badge>
                                                <span className="text-xs capitalize text-muted-foreground">
                                                    {item.category}
                                                </span>
                                            </div>
                                            <p className="text-sm">{item.reason}</p>
                                            <p className="mt-1.5 text-xs text-muted-foreground">
                                                {item.action}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}
