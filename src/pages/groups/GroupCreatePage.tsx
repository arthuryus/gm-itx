import { useNavigate } from 'react-router-dom'
import type { UseFormReturn } from "react-hook-form";
import type { TGroupFormData } from '@/features/groups/model/group.types.ts'
import { GroupForm } from '@/features/groups/ui/GroupForm'
import { useCreateGroup } from '@/features/groups/hooks/mutations/useCreateGroup'
import { handlerError } from "@/shared/api/error/handler-error.ts";
import { Card, CardHeader, CardTitle, CardContent } from '@/shadcn/components/ui/card'
import { toast } from "sonner";

export default function GroupCreatePage() {
    const navigate = useNavigate()
    const createMutation = useCreateGroup()

    const handleSubmit = async (data: TGroupFormData, form: UseFormReturn<TGroupFormData>) => {
        try {
            await createMutation.mutateAsync(data)

            toast.success('Запись создана')
            navigate('/groups')
        } catch (error) {
            handlerError(error, { form })
        }
    }

    const handleCancel = () => {
        navigate('/groups')
    }

    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle>Создание группы</CardTitle>
            </CardHeader>
            <CardContent>
                <GroupForm
                    mode="create"
                    isLoading={createMutation.isPending}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </CardContent>
        </Card>
    )
}
