import { useNavigate, useParams } from 'react-router-dom'
import { useMetadata } from "@/shared/hooks/use-metadata.ts"
import { type UseFormReturn } from 'react-hook-form'
import type { TEmployeeFormData } from '@/features/employee/employees/model/employee.types.ts'
import { EMPLOYEES_MUTATION_MESSAGES } from '@/features/employee/employees/lib/constants.ts'
import { PAGE_URLS } from '@/shared/config/page-routes.ts'
import { useUpdateEmployee } from '@/features/employee/employees/hooks/mutations/useUpdateEmployee.ts'
import { useCloseSessionEmployee } from '@/features/employee/employees/hooks/mutations/useCloseSessionEmployee.ts'
import { useSendAccessEmployee } from '@/features/employee/employees/hooks/mutations/useSendAccessEmployee.ts'
import { useGetEmployee } from '@/features/employee/employees/hooks/queries/useGetEmployee.ts'
import { EmployeeForm } from '@/features/employee/employees/ui/EmployeeForm.tsx'
import { handlerError } from "@/shared/api/error/handler-error.ts"
import { Card, CardContent, CardHeader, CardTitle, CardAction } from '@/shadcn/components/ui/card.tsx'
import { FieldGroup } from '@/shadcn/components/ui/field.tsx'
import { Skeleton } from '@/shadcn/components/ui/skeleton.tsx'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shadcn/components/ui/dropdown-menu"
import { Button } from "@/shadcn/components/ui/button"
import { toast } from 'sonner'
import { MoreVertical } from "lucide-react"

export default function EmployeeUpdatePage() {
    const { id } = useParams<{ id: string }>()
    const { h1 } = useMetadata()
    const navigate = useNavigate()
    const itemId = Number(id)

    const { data: item, isLoading: isLoadingGroup } = useGetEmployee(itemId)
    const updateMutation = useUpdateEmployee()
    const closeSessionMutation = useCloseSessionEmployee()
    const sendAccessMutation = useSendAccessEmployee()

    const handleSubmit = async (data: TEmployeeFormData, form: UseFormReturn<TEmployeeFormData>) => {
        try {
            await updateMutation.mutateAsync({ id: itemId, data })

            toast.success(EMPLOYEES_MUTATION_MESSAGES.update)
            navigate(PAGE_URLS.employees.list())
        } catch (error) {
            handlerError(error, { form })
        }
    }

    const handleCancel = () => {
        navigate(PAGE_URLS.employees.list())
    }

    const handleCloseSession = async () => {
        try {
            await closeSessionMutation.mutateAsync({ id: itemId })

            toast.success(EMPLOYEES_MUTATION_MESSAGES.closeSession)
        } catch (error) {
            handlerError(error, {navigate})
        }
    }

    const handleSendAccess = async () => {
        try {
            await sendAccessMutation.mutateAsync({ id: itemId })

            toast.success(EMPLOYEES_MUTATION_MESSAGES.sendAccess)
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

    const isSubmitting = updateMutation.isPending || closeSessionMutation.isPending || sendAccessMutation.isPending
    const disabled = !!item?.immutable

    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle>{h1}</CardTitle>
                {!disabled && (
                    <CardAction>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    variant="destructive"
                                    onClick={handleCloseSession}
                                    disabled={isSubmitting}
                                >
                                    Закрыть сессии
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={handleSendAccess}
                                    disabled={isSubmitting}
                                >
                                    Отправить доступ
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardAction>
                )}
            </CardHeader>
            <CardContent>
                <EmployeeForm
                    mode="update"
                    initialData={item}
                    isSubmitting={isSubmitting}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    disabled={disabled}
                />
            </CardContent>
        </Card>
    )
}
