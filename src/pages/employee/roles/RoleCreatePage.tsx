import { useNavigate } from 'react-router-dom'
import { useMetadata } from "@/shared/hooks/use-metadata.ts"
import type { UseFormReturn } from "react-hook-form";
import type { TRoleFormData } from '@/features/employee/roles/model/role.types.ts'
import { ROLES_MUTATION_MESSAGES } from '@/features/employee/roles/lib/constants.ts'
import { PAGE_URLS } from '@/shared/config/page-routes.ts'
import { RoleForm } from '@/features/employee/roles/ui/RoleForm.tsx'
import { useGetRolePermissions } from '@/features/employee/roles/hooks/queries/useGetRolePermissions.ts'
import { useCreateRole } from '@/features/employee/roles/hooks/mutations/useCreateRole.ts'
import { handlerError } from "@/shared/api/error/handler-error.ts"
import { mapRoleApiToDefaultValues, mapRoleFormToApi} from '@/features/employee/roles/model/role.mapper.ts'
import { Card, CardHeader, CardTitle, CardContent } from '@/shadcn/components/ui/card.tsx'
import { toast } from "sonner"

export default function RoleCreatePage() {
    const { h1 } = useMetadata()
    const navigate = useNavigate()

    const { data: groups, isLoading: isLoadingGroups } = useGetRolePermissions()
    const createMutation = useCreateRole()

    const item = mapRoleApiToDefaultValues(groups)

    const handleSubmit = async (data: TRoleFormData, form: UseFormReturn<TRoleFormData>) => {
        try {
            await createMutation.mutateAsync(mapRoleFormToApi(data))

            toast.success(ROLES_MUTATION_MESSAGES.create)
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
                    mode="create"
                    isLoading={isLoadingGroups}
                    initialData={item}
                    isSubmitting={createMutation.isPending}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </CardContent>
        </Card>
    )
}
