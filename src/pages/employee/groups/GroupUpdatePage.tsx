import { useNavigate, useParams } from 'react-router-dom'
import { useMetadata } from "@/shared/config/metadata.ts"
import { type UseFormReturn } from 'react-hook-form'
import type { TGroupFormData } from '@/features/employee/groups/model/group.types.ts'
import { GROUPS_MUTATION_MESSAGES } from '@/features/employee/groups/lib/constants.ts'
import { PAGE_URLS } from '@/shared/config/page-routes.ts'
import { useUpdateGroup } from '@/features/employee/groups/hooks/mutations/useUpdateGroup.ts'
import { GroupForm } from '@/features/employee/groups/ui/GroupForm.tsx'
import { useGetGroup } from '@/features/employee/groups/hooks/queries/useGetGroup.ts'
import { handlerError } from "@/shared/api/error/handler-error.ts";
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/components/ui/card.tsx'
import { FieldGroup } from '@/shadcn/components/ui/field.tsx'
import { Skeleton } from '@/shadcn/components/ui/skeleton.tsx'
import { toast } from 'sonner'

export default function GroupUpdatePage() {
    const { id } = useParams<{ id: string }>()
    const { h1 } = useMetadata()
    const navigate = useNavigate()
    const itemId = Number(id)

    const { data: item, isLoading: isLoadingGroup } = useGetGroup(itemId)
    const updateMutation = useUpdateGroup()

    const handleSubmit = async (data: TGroupFormData, form: UseFormReturn<TGroupFormData>) => {
        try {
            await updateMutation.mutateAsync({ id: itemId, data })

            toast.success(GROUPS_MUTATION_MESSAGES.update)
            navigate(PAGE_URLS.employeeGroups.list())
        } catch (error) {
            handlerError(error, { form })
        }
    }

    const handleCancel = () => {
        navigate(PAGE_URLS.employeeGroups.list())
    }

    if (isLoadingGroup) {
        return (
            <Card className="max-w-2xl">
                <CardHeader>
                    <Skeleton className="h-10 w-32" />
                </CardHeader>
                <CardContent>
                    <FieldGroup>
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <div className="flex justify-end items-center gap-4">
                            <Skeleton className="h-10 w-24"/>
                            <Skeleton className="h-10 w-24"/>
                        </div>
                    </FieldGroup>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle>{h1}</CardTitle>
            </CardHeader>
            <CardContent>
                <GroupForm
                    mode="update"
                    initialData={item}
                    isLoading={updateMutation.isPending}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </CardContent>
        </Card>
    )
}
