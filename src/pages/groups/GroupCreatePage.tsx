import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/shadcn/components/ui/button'
import { Card, CardHeader, CardTitle, CardAction, CardContent } from '@/shadcn/components/ui/card'
import { GroupForm } from '@/features/groups/ui/GroupForm'
import { useCreateGroup } from '@/features/groups/hooks/mutations/useCreateGroup'
import type { GroupFormData } from '@/features/groups/model/group.schema.ts'

export default function GroupCreatePage() {
    const navigate = useNavigate()
    const createGroupMutation = useCreateGroup()

    const handleSubmit = (data: GroupFormData) => {
        createGroupMutation.mutate(data, {
            onSuccess: () => {
                navigate('/groups')
            },
        })
    }

    const handleCancel = () => {
        navigate('/groups')
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={handleCancel}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl font-bold">Создание группы</h1>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>
                        Новая группа
                    </CardTitle>

                </CardHeader>
                <CardContent>
                    <GroupForm
                        mode="create"
                        onSubmit={handleSubmit}
                        isLoading={createGroupMutation.isPending}
                        onCancel={handleCancel}
                    />
                </CardContent>
            </Card>
        </div>
    )

    /*return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle>Создание группы</CardTitle>
            </CardHeader>
            <CardContent>
                <GroupForm
                    mode="create"
                    onSubmit={handleSubmit}
                    isLoading={createGroupMutation.isPending}
                    onCancel={handleCancel}
                />
            </CardContent>
        </Card>
    )*/
}
