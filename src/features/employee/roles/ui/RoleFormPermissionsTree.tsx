import type { UseFormReturn } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { Checkbox } from '@/shadcn/components/ui/checkbox'
import { Field, FieldError, FieldLabel } from '@/shadcn/components/ui/field'
import type { TRoleFormData } from '../model/role.types'

interface RolePermissionsTreeProps {
    form: UseFormReturn<TRoleFormData>
    isSubmitting: boolean
    disabled?: boolean
}

export function RoleFormPermissionsTree({
    form,
    isSubmitting,
    disabled
}: RolePermissionsTreeProps) {
    const groups = form.watch('groups')

    const toggleGroup = (groupIndex: number, checked: boolean) => {
        const nextGroups = [...groups]

        nextGroups[groupIndex] = {
            ...nextGroups[groupIndex],
            permissions: nextGroups[groupIndex].permissions.map((permission) => ({
                ...permission,
                selected: checked,
            })),
        }

        form.setValue('groups', nextGroups, {
            shouldDirty: true,
            shouldValidate: true,
        })
    }

    const togglePermission = (
        groupIndex: number,
        permissionIndex: number,
        checked: boolean
    ) => {
        const nextGroups = [...groups]

        nextGroups[groupIndex] = {
            ...nextGroups[groupIndex],
            permissions: nextGroups[groupIndex].permissions.map((permission, index) =>
                index === permissionIndex
                    ? { ...permission, selected: checked }
                    : permission
            ),
        }

        form.setValue('groups', nextGroups, {
            shouldDirty: true,
            shouldValidate: true,
        })
    }

    return (
        <Controller
            name="groups"
            control={form.control}
            render={({ fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Разрешения для сотрудников</FieldLabel>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {groups.map((group, groupIndex) => {
                            const selectedCount = group.permissions.filter(
                                (permission) => permission.selected
                            ).length

                            const groupChecked =
                                selectedCount === 0
                                    ? false
                                    : selectedCount === group.permissions.length
                                        ? true
                                        : 'indeterminate'

                            return (
                                <div key={group.id} className="space-y-2">
                                    <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                                        <Checkbox
                                            checked={groupChecked}
                                            disabled={isSubmitting || disabled}
                                            onCheckedChange={() => {
                                                toggleGroup(groupIndex, groupChecked !== true)
                                            }}
                                        />
                                        <span>{group.title}</span>
                                    </label>

                                    <div className="ml-[9px] space-y-2 border-l pl-4">
                                        {group.permissions.map((permission, permissionIndex) => (
                                            <label
                                                key={permission.id}
                                                className="relative flex cursor-pointer items-center gap-2 text-sm text-muted-foreground before:absolute before:-left-4 before:top-1/2 before:h-px before:w-3 before:bg-border"
                                            >
                                                <Checkbox
                                                    checked={permission.selected}
                                                    disabled={isSubmitting || disabled}
                                                    onCheckedChange={(checked) => {
                                                        togglePermission(
                                                            groupIndex,
                                                            permissionIndex,
                                                            checked === true
                                                        )
                                                    }}
                                                />

                                                <span>{permission.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    )
}