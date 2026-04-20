import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/shadcn/components/ui/button.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shadcn/components/ui/dropdown-menu.tsx'
import { PERMISSIONS } from '@/shared/config/permissions.ts'
import { usePermissions } from '@/features/access/hooks/use-permissions.ts'
import type { Company } from '@/features/companies/model/company.types.ts'
import { CompanyDeleteDialog } from './CompanyDeleteDialog.tsx'

interface CompanyActionsProps {
  company: Company
}

export const CompanyActions = ({ company }: CompanyActionsProps) => {
  const navigate = useNavigate()
  const { hasPermission } = usePermissions()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const canView = hasPermission(PERMISSIONS.PERMISSION_COMPANIES_VIEW)
  const canEdit = hasPermission(PERMISSIONS.PERMISSION_COMPANIES_EDIT)
  const canDelete = hasPermission(PERMISSIONS.PERMISSION_COMPANIES_DELETE)

  const hasAnyAction = canView || canEdit || canDelete

  if (!hasAnyAction) return null

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {canView && (
            <DropdownMenuItem onClick={() => navigate(`/companies/${company.id}`)}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
          )}
          {canEdit && (
            <DropdownMenuItem onClick={() => navigate(`/companies/update/${company.id}`)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          )}
          {canDelete && (
            <DropdownMenuItem
              onClick={() => setIsDeleteDialogOpen(true)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <CompanyDeleteDialog
        company={company}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
    </>
  )
}
