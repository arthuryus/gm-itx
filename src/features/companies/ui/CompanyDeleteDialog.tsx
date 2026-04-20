import { AlertTriangle } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shadcn/components/ui/alert-dialog.tsx'
import { useDeleteCompanyMutation } from '@/features/companies/hooks/use-delete-company-mutation.ts'
import type { Company } from '@/features/companies/model/company.types.ts'

interface CompanyDeleteDialogProps {
  company: Company
  isOpen: boolean
  onClose: () => void
}

export const CompanyDeleteDialog = ({
  company,
  isOpen,
  onClose,
}: CompanyDeleteDialogProps) => {
  const deleteMutation = useDeleteCompanyMutation()

  const handleConfirm = () => {
    deleteMutation.mutate(company.id, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Delete Company
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{company.name}</strong>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose} disabled={deleteMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={deleteMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
