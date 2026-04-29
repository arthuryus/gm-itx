import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/shadcn/components/ui/alert-dialog'
import { Button } from '@/shadcn/components/ui/button'
import { Spinner } from '@/shadcn/components/ui/spinner'

export function DeleteDialogBase({
    isOpen,
    onClose,
    onConfirm,
    isLoading,
}: {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    isLoading: boolean
}) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Удалить запись?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Вы уверены, что хотите удалить запись?
                        <br />
                        Это действие нельзя отменить.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Отмена
                    </AlertDialogCancel>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading && <Spinner className="mr-2 size-4" />}
                        Удалить
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
