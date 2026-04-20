import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/shadcn/components/ui/button.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/components/ui/card.tsx'
import { Skeleton } from '@/shadcn/components/ui/skeleton.tsx'
import { useMetadata } from '@/shared/hooks/use-metadata.ts'
import { CompanyForm } from '@/features/companies/ui/CompanyForm.tsx'
import { useCompanyQuery } from '@/features/companies/hooks/use-company-query.ts'
import { useUpdateCompanyMutation } from '@/features/companies/hooks/use-update-company-mutation.ts'
import { mapCompanyToFormValues } from '@/features/companies/lib/map-company-to-form.ts'
import type { CompanyFormValues } from '@/features/companies/model/company.types.ts'

export default function CompanyUpdatePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const h1 = useMetadata().h1

  const companyId = id ? parseInt(id, 10) : null
  const { data: company, isLoading, isError } = useCompanyQuery(companyId)
  const updateMutation = useUpdateCompanyMutation()

  const handleSubmit = (data: CompanyFormValues) => {
    if (companyId) {
      updateMutation.mutate({ id: companyId, data })
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/companies')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Skeleton className="h-8 w-48" />
        </div>
        <Card className="max-w-2xl">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isError || !company) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/companies')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{h1}</h1>
        </div>
        <div className="rounded-md border p-8 text-center">
          <p className="text-destructive">Failed to load company</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate('/companies')}
          >
            Back to Companies
          </Button>
        </div>
      </div>
    )
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
          <CardTitle>Edit Company</CardTitle>
        </CardHeader>
        <CardContent>
          <CompanyForm
            defaultValues={mapCompanyToFormValues(company)}
            onSubmit={handleSubmit}
            isPending={updateMutation.isPending}
            submitLabel="Update Company"
            onCancel={() => navigate(`/companies/${company.id}`)}
          />
        </CardContent>
      </Card>
    </div>
  )
}
