import { useNavigate } from 'react-router-dom'
import { useMetadata } from "@/shared/hooks/use-metadata.ts"
import type { UseFormReturn } from "react-hook-form"
import type { TEmployeeFormData } from '@/features/employee/employees/model/employee.types.ts'
import { EMPLOYEES_MUTATION_MESSAGES } from '@/features/employee/employees/lib/constants.ts'
import { PAGE_URLS } from '@/shared/config/page-routes.ts'
import { EmployeeForm } from '@/features/employee/employees/ui/EmployeeForm.tsx'
import { useCreateEmployee } from '@/features/employee/employees/hooks/mutations/useCreateEmployee.ts'
import { handlerError } from "@/shared/api/error/handler-error.ts"
import { Card, CardHeader, CardTitle, CardContent } from '@/shadcn/components/ui/card.tsx'
import { toast } from "sonner"

export default function EmployeeCreatePage() {
    const { h1 } = useMetadata()
    const navigate = useNavigate()
    const createMutation = useCreateEmployee()

    const handleSubmit = async (data: TEmployeeFormData, form: UseFormReturn<TEmployeeFormData>) => {
        try {
            await createMutation.mutateAsync(data)

            toast.success(EMPLOYEES_MUTATION_MESSAGES.create)
            navigate(PAGE_URLS.employees.list())
        } catch (error) {
            handlerError(error, { form })
        }
    }

    const handleCancel = () => {
        navigate(PAGE_URLS.employees.list())
    }

    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle>{h1}</CardTitle>
            </CardHeader>
            <CardContent>
                <EmployeeForm
                    mode="create"
                    isSubmitting={createMutation.isPending}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </CardContent>
        </Card>
    )
}
