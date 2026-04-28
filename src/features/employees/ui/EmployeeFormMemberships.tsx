import {useMemo} from 'react'
import {Controller, useFieldArray, type UseFormReturn} from 'react-hook-form'
import type {TEmployeeFormData} from '@/features/employees/model/employee.types.ts'
import {useGetGroups} from '@/features/groups/hooks/queries/useGetGroups.ts'
import {useGetRoles} from '@/features/roles/hooks/queries/useGetRoles.ts'
import {Field, FieldError, FieldGroup, FieldLabel} from '@/shadcn/components/ui/field.tsx'
import {Skeleton} from '@/shadcn/components/ui/skeleton.tsx'
import {Button} from '@/shadcn/components/ui/button.tsx'
import {Trash2} from 'lucide-react'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shadcn/components/ui/select.tsx";
import {SelectMulti} from '@/shared/components/ui/selects/SelectMulti.tsx'

export function EmployeeMembershipsForm({
    form,
    isSubmitting,
}:{
    form: UseFormReturn<TEmployeeFormData>
    isSubmitting: boolean
}) {

    /**
     * Получение списка групп
     */
    const {data: dataGroups, isLoading: isLoadingGroups} = useGetGroups({
        page: 1,
        perPage: 100,
        sort: [],
        filter: undefined,
    })

    /**
     * Обработка списка групп
     */
    const optionsGroups = useMemo(() => {
        if (!dataGroups) return []

        return dataGroups.items.map((group) => ({
            value: String(group.id),
            label: group.name,
        }))
    }, [dataGroups])


    /**
     * Получение списка ролей
     */
    const {data: dataRoles, isLoading: isLoadingRoles} = useGetRoles({
        page: 1,
        perPage: 100,
        sort: [],
        filter: undefined,
    })

    /**
     * Обработка списка ролей
     */
    const optionsRoles = useMemo(() => {
        if (!dataRoles) return []

        return dataRoles.items.map((role) => ({
            value: role.id,
            label: role.title,
        }))
    }, [dataRoles])

    const {fields, append, remove} = useFieldArray({
        control: form.control,
        name: 'memberships',
    })

    const handleAdd = () => {
        append({groupId: '', roleIds: []})
    }

    if (isLoadingGroups || isLoadingRoles) {//isLoading ||
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
                                        onValueChange={(value) =>
                                            field.onChange(value)
                                        }
                                        disabled={isSubmitting}
                                    >
                                        <SelectTrigger
                                            id={`memberships.${index}.groupId`}
                                            className="w-full"
                                            aria-invalid={fieldState.invalid}
                                        >
                                            <SelectValue placeholder="Выберите группу" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {optionsGroups.map((option) => (
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
                    </div>
                ))}
            </div>
            <Button type="button" variant="outline" disabled={isSubmitting} onClick={handleAdd}>
                Добавить
            </Button>
        </FieldGroup>
    )
}