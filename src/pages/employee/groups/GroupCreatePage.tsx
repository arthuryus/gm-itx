import { useNavigate } from 'react-router-dom'
import type { UseFormReturn } from "react-hook-form"
import { useMetadata } from "@/shared/hooks/use-metadata.ts"
import type { TGroupFormData } from '@/features/employee/groups/model/group.types.ts'
import { GROUPS_MUTATION_MESSAGES } from '@/features/employee/groups/lib/constants.ts'
import { PAGE_URLS } from '@/shared/config/page-routes.ts'
import { GroupForm } from '@/features/employee/groups/ui/GroupForm.tsx'
import { useCreateGroup } from '@/features/employee/groups/hooks/mutations/useCreateGroup.ts'
import { handlerError } from "@/shared/api/error/handler-error.ts";
import { Card, CardHeader, CardTitle, CardContent } from '@/shadcn/components/ui/card.tsx'
import { toast } from "sonner"

export default function GroupCreatePage() {
    const { h1 } = useMetadata()
    const navigate = useNavigate()
    const createMutation = useCreateGroup()

    const handleSubmit = async (data: TGroupFormData, form: UseFormReturn<TGroupFormData>) => {
        try {
            await createMutation.mutateAsync(data)

            toast.success(GROUPS_MUTATION_MESSAGES.create)
            navigate(PAGE_URLS.employeeGroups.list())
        } catch (error) {
            handlerError(error, { form })
        }
    }

    const handleCancel = () => {
        navigate(PAGE_URLS.employeeGroups.list())
    }

    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle>{h1}</CardTitle>
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
