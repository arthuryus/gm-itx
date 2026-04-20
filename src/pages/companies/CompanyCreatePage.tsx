import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/shadcn/components/ui/button.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/components/ui/card.tsx'
import { useMetadata } from '@/shared/hooks/use-metadata.ts'
import { CompanyForm } from '@/features/companies/ui/CompanyForm.tsx'
import { useCreateCompanyMutation } from '@/features/companies/hooks/use-create-company-mutation.ts'
import type { CompanyFormValues } from '@/features/companies/model/company.types.ts'

export default function CompanyCreatePage() {
  const navigate = useNavigate()
  const h1 = useMetadata().h1
  const createMutation = useCreateCompanyMutation()

  const handleSubmit = (data: CompanyFormValues) => {
    createMutation.mutate(data)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/companies')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{h1}</h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Create New Company</CardTitle>
        </CardHeader>
        <CardContent>
          <CompanyForm
            onSubmit={handleSubmit}
            isPending={createMutation.isPending}
            submitLabel="Create Company"
            onCancel={() => navigate('/companies')}
          />
        </CardContent>
      </Card>
    </div>
  )
}
