import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/shadcn/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/components/ui/card'
import { Skeleton } from '@/shadcn/components/ui/skeleton'
import { GroupForm } from '@/features/groups/ui/GroupForm'
import { useGroup } from '@/features/groups/hooks/queries/useGroup'
import { useUpdateGroup } from '@/features/groups/hooks/mutations/useUpdateGroup'
import type { GroupFormData } from '@/features/groups/model/group.schema.ts'

export default function GroupUpdatePage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const groupId = id ? parseInt(id, 10) : null

    const { data: group, isLoading: isLoadingGroup, error } = useGroup(groupId)
    const updateGroupMutation = useUpdateGroup()

    const handleSubmit = (data: GroupFormData) => {
        if (groupId) {
            updateGroupMutation.mutate(
                { id: groupId, data },
                {
                    onSuccess: () => {
                        navigate(`/groups/${groupId}`)
                    },
                }
            )
        }
    }

    const handleCancel = () => {
        if (groupId) {
            navigate(`/groups/${groupId}`)
        } else {
            navigate('/groups')
        }
    }

    if (isLoadingGroup) {
        return (
            <div className="space-y-6 p-6">
                <Skeleton className="h-8 w-48" />
                <Card className="max-w-2xl">
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-10 w-[150px]" />
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (error || !group) {
        return (
            <div className="p-6">
                <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
                    {error ? `Ошибка: ${error.message}` : 'Группа не найдена'}
                </div>
                <Button asChild className="mt-4" variant="outline">
                    <Link to="/groups">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Назад к списку
                    </Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCancel}
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl font-bold">Редактирование группы</h1>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>{group.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <GroupForm
                        mode="update"
                        initialData={group}
                        onSubmit={handleSubmit}
                        isLoading={updateGroupMutation.isPending}
                        onCancel={handleCancel}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
