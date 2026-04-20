export type CrudDeleteApi<TId> = (id: TId) => Promise<void>

export interface CrudDeleteDialogProps<TId> {
  entityName: string
  id: TId
  itemName?: string
  api: CrudDeleteApi<TId>
  queryKey: string
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  confirmLabel?: string
  cancelLabel?: string
}
