import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shadcn/components/ui/alert-dialog'
import { Loader2, Trash2 } from 'lucide-react'
import { useCrudDelete } from '../hooks/useCrudDelete'
import type { CrudDeleteDialogProps } from '../types'

export function CrudDeleteDialog<TId>({
  entityName,
  id,
  itemName,
  api,
  queryKey,
  isOpen,
  onClose,
  onSuccess,
  confirmLabel = 'Удалить',
  cancelLabel = 'Отмена',
}: CrudDeleteDialogProps<TId>) {
  const { isDeleting, deleteError, handleDelete } = useCrudDelete<TId>({
    api,
    queryKey,
    onSuccess,
    onClose,
  })

  const displayName = itemName || (typeof id === 'string' || typeof id === 'number' ? `#${id}` : '')

  const onConfirm = () => {
    if (id !== undefined && id !== null) {
      handleDelete(id)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Подтверждение удаления
          </AlertDialogTitle>
          <AlertDialogDescription>
            Вы уверены, что хотите удалить <strong>{entityName}</strong>{' '}
            {displayName && <strong>{displayName}</strong>}?
            <br />
            Это действие необратимо.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {deleteError && (
          <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
            Ошибка: {deleteError.message}
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
