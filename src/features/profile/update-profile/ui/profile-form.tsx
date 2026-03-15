'use client'

import { User, Sparkles, Save } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Textarea } from '@/shared/ui/textarea'
import { Skeleton } from '@/shared/ui/skeleton'
import { Badge } from '@/shared/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { GenericCard } from '@/shared/components'
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
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
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
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        )
    }

    return (
        <>
            <form onSubmit={onSubmit} className="space-y-8">
                <GenericCard
                    cardTitle="Identity"
                    cardDescription="Your basic profile information."
                    cardContent={
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-slate-100">
                                    {profile?.avatarUrl ? (
                                        <img src={profile.avatarUrl} alt="" className="h-full w-full object-cover" />
                                    ) : (
                                        <User className="h-8 w-8 text-slate-400" />
                                    )}
                                </div>
                                <div>
                                    <p className="font-medium">{profile?.username}</p>
                                    <p className="text-sm text-muted-foreground">{profile?.email}</p>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" value={profile?.username ?? ''} disabled />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input id="fullName" {...form.register('fullName')} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" value={profile?.email ?? ''} disabled />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">About Me</Label>
                                <Textarea
                                    id="description"
                                    rows={4}
                                    {...form.register('description')}
                                    placeholder="Tell others about yourself..."
                                />
                            </div>
                        </div>
                    }
                />

                <GenericCard
                    cardTitle="Preferences"
                    cardDescription="Your physical attributes and preferences."
                    cardContent={
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                            {PREFERENCE_FIELDS.map(({ key, label }) => (
                                <div key={key} className="space-y-2">
                                    <Label htmlFor={key}>{label}</Label>
                                    <Input
                                        id={key}
                                        type="number"
                                        {...form.register(key, { valueAsNumber: true })}
                                    />
                                </div>
                            ))}
                        </div>
                    }
                />

                <div className="flex gap-3">
                    <Button type="submit" disabled={isSubmitting}>
                        <Save className="mr-2 h-4 w-4" />
                        {isSubmitting ? 'Saving...' : 'Save Profile'}
                    </Button>
                    <Button type="button" variant="outline" disabled={isAnalyzing} onClick={onAnalyze}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        {isAnalyzing ? 'Analyzing...' : 'AI Analysis'}
                    </Button>
                </div>
            </form>

            <Dialog open={showAnalysis} onOpenChange={setShowAnalysis}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Profile Analysis</DialogTitle>
                    </DialogHeader>
                    {analysis && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-bold">{analysis.score}%</span>
                                <span className="text-sm text-muted-foreground">profile score</span>
                            </div>
                            <p className="text-sm">{analysis.summary}</p>
                            {analysis.checklist.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium">Recommendations</h4>
                                    {analysis.checklist.map((item, i) => (
                                        <div key={i} className="rounded-lg border p-3">
                                            <div className="mb-1 flex items-center gap-2">
                                                <Badge
                                                    variant="secondary"
                                                    className={PRIORITY_COLORS[item.priority] ?? ''}
                                                >
                                                    {item.priority}
                                                </Badge>
                                                <span className="text-xs capitalize text-muted-foreground">
                                                    {item.category}
                                                </span>
                                            </div>
                                            <p className="text-sm">{item.reason}</p>
                                            <p className="mt-1 text-xs text-muted-foreground">{item.action}</p>
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
