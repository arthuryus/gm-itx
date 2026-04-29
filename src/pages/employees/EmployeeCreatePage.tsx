import { useNavigate } from 'react-router-dom'
import type { UseFormReturn } from "react-hook-form";
import type { TEmployeeFormData } from '@/features/employees/model/employee.types.ts'
import { EmployeeForm } from '@/features/employees/ui/EmployeeForm'
import { useCreateEmployee } from '@/features/employees/hooks/mutations/useCreateEmployee'
import { handlerError } from "@/shared/api/error/handler-error.ts"
import { Card, CardHeader, CardTitle, CardContent } from '@/shadcn/components/ui/card'
import { toast } from "sonner";

export default function EmployeeCreatePage() {
    const navigate = useNavigate()
    const createMutation = useCreateEmployee()

    const handleSubmit = async (data: TEmployeeFormData, form: UseFormReturn<TEmployeeFormData>) => {
        try {
            await createMutation.mutateAsync(data)

            toast.success('Запись создана')
            navigate('/employees')
        } catch (error) {
            handlerError(error, { form })
        }
    }

    const handleCancel = () => {
        navigate('/employees')
    }

    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle>Создание группы</CardTitle>
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
