import {Controller, useFieldArray, useWatch, type UseFormReturn} from 'react-hook-form'
import type {TEmployeeFormData} from '../model/employee.types.ts'
import {useGetGroupsList} from '@/features/employee/groups/hooks/queries/useGetGroups.ts'
import {useGetRolesList} from '@/features/employee/roles/hooks/queries/useGetRoles.ts'
import {Field, FieldError, FieldGroup, FieldLabel} from '@/shadcn/components/ui/field.tsx'
import {Skeleton} from '@/shadcn/components/ui/skeleton.tsx'
import {Button} from '@/shadcn/components/ui/button.tsx'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shadcn/components/ui/select.tsx";
import {SelectMulti} from '@/shared/components/ui/inputs/SelectMulti.tsx'
import {Trash2} from 'lucide-react'

interface EmployeeFormMembershipsProps {
    form: UseFormReturn<TEmployeeFormData>
    isSubmitting: boolean
    disabled?: boolean
}

export function EmployeeFormMemberships({
    form,
    isSubmitting,
    disabled,
}: EmployeeFormMembershipsProps) {

    /**
     * Получение списка групп
     */
    const {options: optionsGroups, isLoading: isLoadingGroups} = useGetGroupsList()

    /**
     * Получение списка ролей
     */
    const {options: optionsRoles, isLoading: isLoadingRoles} = useGetRolesList()

    const {fields, append, remove} = useFieldArray({
        control: form.control,
        name: 'memberships',
    })

    const memberships = useWatch({
        control: form.control,
        name: 'memberships',
    })

    const selectedGroupIds = memberships
        ?.map((membership) => membership.groupId)
        .filter(Boolean) ?? []

    const canAddMembership = fields.length < optionsGroups.length

    const handleAdd = () => {
        if (!canAddMembership) {
            return
        }

        append({groupId: '', roleIds: []})
    }

    if (isLoadingGroups || isLoadingRoles) {
        return <Skeleton className="h-10 w-full"/>
    }

    return (
        <FieldGroup>
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-[1fr_1fr_auto] gap-4 items-start">
                        <Controller
                            name={`memberships.${index}.groupId`}
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    {index === 0 && (
                                        <FieldLabel htmlFor="status">Группа</FieldLabel>
                                    )}
                                    <Select
                                        key={String(field.value || 'empty')}
                                        value={field.value ?? ''}
                                        onValueChange={field.onChange}
                                        disabled={isSubmitting || disabled}
                                    >
                                        <SelectTrigger
                                            id={`memberships.${index}.groupId`}
                                            className="w-full"
                                            aria-invalid={fieldState.invalid}
                                        >
                                            <SelectValue placeholder="Выберите группу" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {optionsGroups
                                                .filter((option) => (
                                                    option.value === field.value
                                                    || !selectedGroupIds.includes(option.value)
                                                ))
                                                .map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name={`memberships.${index}.roleIds`}
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    {index === 0 && (
                                        <FieldLabel htmlFor="status">Роль</FieldLabel>
                                    )}

                                    <SelectMulti
                                        name={field.name}
                                        value={field.value ?? []}
                                        onValueChange={field.onChange}
                                        disabled={isSubmitting || disabled}
                                        options={optionsRoles}
                                        placeholder={'Выберите роли'}
                                        searchable={true}
                                        searchPlaceholder={'Поиск'}
                                        emptyText={"Ничего не найдено."}
                                        invalid={fieldState.invalid}
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {!disabled && (
                            <div>
                                {(index === 0 && <div className="h-8"/>)}
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    disabled={isSubmitting || !(fields.length > 1)}
                                    onClick={() => remove(index)}
                                >
                                    <Trash2/>
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {!disabled && (
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleAdd}
                    disabled={isSubmitting || !canAddMembership}
                >
                    Добавить
                </Button>
            )}
        </FieldGroup>
    )
}
