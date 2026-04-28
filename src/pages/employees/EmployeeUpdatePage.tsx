import { useNavigate, useParams } from 'react-router-dom'
import { type UseFormReturn } from 'react-hook-form'
import type { TEmployeeFormData } from '@/features/employees/model/employee.types.ts'
import { useUpdateEmployee } from '@/features/employees/hooks/mutations/useUpdateEmployee'
import { useCloseSessionEmployee } from '@/features/employees/hooks/mutations/useCloseSessionEmployee'
import { useSendAccessEmployee } from '@/features/employees/hooks/mutations/useSendAccessEmployee'
import { useGetEmployee } from '@/features/employees/hooks/queries/useGetEmployee.ts'
import { EmployeeForm } from '@/features/employees/ui/EmployeeForm'
import { handlerError } from "@/shared/api/error/handler-error.ts"
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/components/ui/card'
import { FieldGroup } from '@/shadcn/components/ui/field'
import { Skeleton } from '@/shadcn/components/ui/skeleton'
import { toast } from 'sonner'

export default function EmployeeUpdatePage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const itemId = Number(id)

    const { data: item, isLoading: isLoadingGroup } = useGetEmployee(itemId)
    const updateMutation = useUpdateEmployee()
    const closeSessionMutation = useCloseSessionEmployee()
    const sendAccessMutation = useSendAccessEmployee()

    const handleSubmit = async (data: TEmployeeFormData, form: UseFormReturn<TEmployeeFormData>) => {
        try {
            await updateMutation.mutateAsync({ id: itemId, data })

            toast.success('Группа обновлена')
            navigate(`/employees`)// /${groupId}
        } catch (error) {
            handlerError(error, { form })
        }
    }

    const handleCancel = () => {
        navigate(`/employees`) // /${groupId}
    }

    const handleCloseSession = async () => {
        try {
            await closeSessionMutation.mutateAsync({ id: itemId })

            toast.success('Сессия закрыта')
        } catch (error) {
            handlerError(error, {navigate})
        }
    }

    const handleSendAccess = async () => {
        try {
            await sendAccessMutation.mutateAsync({ id: itemId })

            toast.success('Доступ отправлен')
        } catch (error) {
            handlerError(error, {navigate})
        }
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
                <CardTitle>Редактирование группы</CardTitle>
            </CardHeader>
            <CardContent>
                <EmployeeForm
                    mode="update"
                    initialData={item}
                    isLoading={updateMutation.isPending}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    onCloseSession={handleCloseSession}
                    onSendAccess={handleSendAccess}
                />
            </CardContent>
        </Card>
    )
}
