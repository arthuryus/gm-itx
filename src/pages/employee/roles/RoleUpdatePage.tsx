import { useNavigate, useParams } from 'react-router-dom'
import { useMetadata } from "@/shared/hooks/use-metadata.ts"
import { type UseFormReturn } from 'react-hook-form'
import type { TRoleFormData } from '@/features/employee/roles/model/role.types.ts'
import { ROLES_MUTATION_MESSAGES } from '@/features/employee/roles/lib/constants.ts'
import { PAGE_URLS } from '@/shared/config/page-routes.ts'
import { useUpdateRole } from '@/features/employee/roles/hooks/mutations/useUpdateRole.ts'
import { RoleForm } from '@/features/employee/roles/ui/RoleForm.tsx'
import { useGetRole } from '@/features/employee/roles/hooks/queries/useGetRole.ts'
import { handlerError } from "@/shared/api/error/handler-error.ts"
import { mapRoleFormToApi } from '@/features/employee/roles/model/role.mapper.ts'
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/components/ui/card.tsx'
import { toast } from 'sonner'

export default function RoleUpdatePage() {
    const { id } = useParams<{ id: string }>()
    const { h1 } = useMetadata()
    const navigate = useNavigate()
    const itemId = Number(id)

    const { data: item, isLoading: isLoading } = useGetRole(itemId)
    const updateMutation = useUpdateRole()

    const handleSubmit = async (data: TRoleFormData, form: UseFormReturn<TRoleFormData>) => {
        try {
            await updateMutation.mutateAsync({ id: itemId, data: mapRoleFormToApi(data) })

            toast.success(ROLES_MUTATION_MESSAGES.update)
            navigate(PAGE_URLS.employeeRoles.list())
        } catch (error) {
            handlerError(error, { form })
        }
    }

    const handleCancel = () => {
        navigate(PAGE_URLS.employeeRoles.list())
    }

    return (
        <Card className="max---w-2xl w-full">
            <CardHeader>
                <CardTitle>{h1}</CardTitle>
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
