import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/shadcn/components/ui/button.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/components/ui/card.tsx'
import { Skeleton } from '@/shadcn/components/ui/skeleton.tsx'
import { useMetadata } from '@/shared/hooks/use-metadata.ts'
import { useCompanyQuery } from '@/features/companies/hooks/use-company-query.ts'
import { CompanyStatusBadge } from '@/features/companies/ui/CompanyStatusBadge.tsx'
import { CompanyDeleteDialog } from '@/features/companies/ui/CompanyDeleteDialog.tsx'
import { PERMISSIONS } from '@/shared/config/permissions.ts'
import { usePermissions } from '@/features/access/hooks/use-permissions.ts'
import { useState } from 'react'

export default function CompanyViewPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const h1 = useMetadata().h1
  const { hasPermission } = usePermissions()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const companyId = id ? parseInt(id, 10) : null
  const { data: company, isLoading, isError } = useCompanyQuery(companyId)

  const canEdit = hasPermission(PERMISSIONS.PERMISSION_COMPANIES_EDIT)
  const canDelete = hasPermission(PERMISSIONS.PERMISSION_COMPANIES_DELETE)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/companies')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Skeleton className="h-8 w-48" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/companies')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{company.name}</h1>
        </div>
        <div className="flex gap-2">
          {canEdit && (
            <Button
              variant="outline"
              onClick={() => navigate(`/companies/update/${company.id}`)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
          {canDelete && (
            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">ID</p>
              <p className="font-medium">{company.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <div className="mt-1">
                <CompanyStatusBadge status={company.status} />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Priority</p>
              <p className="font-medium">{company.priority}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="font-medium">{company.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <CompanyDeleteDialog
        company={company}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  )
}
