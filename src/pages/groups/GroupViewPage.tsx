import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/shadcn/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/components/ui/card'
import { Badge } from '@/shadcn/components/ui/badge'
import { Skeleton } from '@/shadcn/components/ui/skeleton'
import { DeleteDialogBase } from '@/shared/components/ui/base/DeleteDialogBase'
import { useGetGroup } from '@/features/groups/hooks/queries/useGetGroup.ts'
import { useDeleteGroup } from '@/features/groups/hooks/mutations/useDeleteGroup'
import { PERMISSIONS } from '@/shared/config/permissions.ts'
import { useAccess } from '@/features/access/hooks/use-access.ts'
import { useState } from 'react'

export default function GroupViewPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const groupId = id ? parseInt(id, 10) : null

    const canEdit = useAccess({ permission: PERMISSIONS.PERMISSION_GROUPS_EDIT }, false)
    const canDelete = useAccess({ permission: PERMISSIONS.PERMISSION_GROUPS_DELETE }, false)

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const { data: group, isLoading, error } = useGetGroup(groupId)
    const deleteMutation = useDeleteGroup()

    const handleDelete = () => {
        if (group) {
            deleteMutation.mutate(
                { id: group.id },
                {
                    onSuccess: () => {
                        navigate('/groups')
                    },
                }
            )
        }
    }

    if (isLoading) {
        return (
            <div className="space-y-6 p-6">
                <Skeleton className="h-8 w-48" />
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
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
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button asChild variant="outline" size="icon">
                        <Link to="/groups">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">{group.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                    {canEdit && (
                        <Button asChild variant="outline">
                            <Link to={`/groups/update/${group.id}`}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Редактировать
                            </Link>
                        </Button>
                    )}
                    {canDelete && (
                        <Button
                            variant="destructive"
                            onClick={() => setDeleteDialogOpen(true)}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Удалить
                        </Button>
                    )}
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Информация о группе</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <div className="text-sm text-muted-foreground">ID</div>
                            <div className="font-medium">{group.id}</div>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">Статус</div>
                            <Badge variant={group.status === 'ACTIVE' ? 'default' : 'secondary'}>
                                {group.status === 'ACTIVE' ? 'Активный' : 'Неактивный'}
                            </Badge>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">Приоритет</div>
                            <div className="font-medium">{group.priority}</div>
                        </div>
                        <div className="md:col-span-2">
                            <div className="text-sm text-muted-foreground">Описание</div>
                            <div className="font-medium">{group.description}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <DeleteDialogBase
                isOpen={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleDelete}
                isLoading={deleteMutation.isPending}
            />
        </div>
    )
}
