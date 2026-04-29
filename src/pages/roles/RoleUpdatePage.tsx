import { useNavigate, useParams } from 'react-router-dom'
import { type UseFormReturn } from 'react-hook-form'
import type { TRoleFormData } from '@/features/roles/model/role.types.ts'
import { useUpdateRole } from '@/features/roles/hooks/mutations/useUpdateRole'
import { RoleForm } from '@/features/roles/ui/RoleForm'
import { useGetRole } from '@/features/roles/hooks/queries/useGetRole.ts'
import { handlerError } from "@/shared/api/error/handler-error.ts";
import { mapRoleFormToApi } from '@/features/roles/model/role.mapper.ts'
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/components/ui/card'
import { toast } from 'sonner'

export default function RoleUpdatePage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const itemId = Number(id)

    const { data: item, isLoading: isLoading } = useGetRole(itemId)
    const updateMutation = useUpdateRole()

    const handleSubmit = async (data: TRoleFormData, form: UseFormReturn<TRoleFormData>) => {
        try {
            await updateMutation.mutateAsync({ id: itemId, data: mapRoleFormToApi(data) })

            toast.success('Роль обновлена')
            navigate(`/roles`)
        } catch (error) {
            handlerError(error, { form })
        }
    }

    const handleCancel = () => {
        navigate(`/roles`)
    }

    return (
        <Card className="max---w-2xl w-full">
            <CardHeader>
                <CardTitle>Редактирование роли {item?.role?.immutable ? 'true' : 'false'}</CardTitle>
            </CardHeader>
            <CardContent>
                <RoleForm
                    mode="update"
                    isLoading={isLoading}
                    initialData={item}
                    isSubmitting={updateMutation.isPending}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    disabled={!!item?.role?.immutable}
                />
            </CardContent>
        </Card>
    )
}
