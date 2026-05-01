import { useNavigate } from 'react-router-dom'
import { useMetadata } from "@/shared/hooks/use-metadata.ts"
import type { UseFormReturn } from "react-hook-form"
import type { TCustomerFormData } from '@/features/customer/customers/model/customer.types.ts'
import { CUSTOMERS_MUTATION_MESSAGES } from '@/features/customer/customers/lib/constants.ts'
import { PAGE_URLS } from '@/shared/config/page-routes.ts'
import { CustomerForm } from '@/features/customer/customers/ui/CustomerForm.tsx'
import { useCreateCustomer } from '@/features/customer/customers/hooks/mutations/useCreateCustomer.ts'
import { handlerError } from "@/shared/api/error/handler-error.ts"
import { Card, CardHeader, CardTitle, CardContent } from '@/shadcn/components/ui/card.tsx'
import { toast } from "sonner"

export default function CustomerCreatePage() {
    const { h1 } = useMetadata()
    const navigate = useNavigate()
    const createMutation = useCreateCustomer()

    const handleSubmit = async (data: TCustomerFormData, form: UseFormReturn<TCustomerFormData>) => {
        try {
            await createMutation.mutateAsync(data)

            toast.success(CUSTOMERS_MUTATION_MESSAGES.create)
            navigate(PAGE_URLS.customers.list())
        } catch (error) {
            handlerError(error, { form })
        }
    }

    const handleCancel = () => {
        navigate(PAGE_URLS.customers.list())
    }

    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle>{h1}</CardTitle>
            </CardHeader>
            <CardContent>
                <CustomerForm
                    mode="create"
                    isSubmitting={createMutation.isPending}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </CardContent>
        </Card>
    )
}
