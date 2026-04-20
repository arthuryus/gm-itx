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
import { Button } from '@/shadcn/components/ui/button'
import { Spinner } from '@/shadcn/components/ui/spinner'
import type { Group } from '@/features/groups/model/group.types.ts'

interface GroupDeleteDialogProps {
    group: Group | null
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    isLoading: boolean
}

export function GroupDeleteDialog({
    group,
    isOpen,
    onClose,
    onConfirm,
    isLoading,
}: GroupDeleteDialogProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Удалить группу?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Вы уверены, что хотите удалить группу <strong>"{group?.name}"</strong>?
                        <br />
                        Это действие нельзя отменить.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose} disabled={isLoading}>
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
