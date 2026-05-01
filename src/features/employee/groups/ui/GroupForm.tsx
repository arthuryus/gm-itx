import { useEffect } from 'react'
import { Controller, useForm, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { groupSchema, groupDefaultValues } from '../model/group.schema.ts'
import type { TGroup, TGroupFormData } from '../model/group.types.ts'
import { type TStatus, STATUS_SELECT } from '@/shared/constants/main.ts'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shadcn/components/ui/field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/components/ui/select'
import { InputGroup, InputGroupInput, InputGroupTextarea } from '@/shadcn/components/ui/input-group'
import { Button } from '@/shadcn/components/ui/button'
import { Spinner } from '@/shadcn/components/ui/spinner'

interface GroupFormProps {
    mode: 'create' | 'update'
    initialData?: TGroup
    onSubmit: (data: TGroupFormData, form:  UseFormReturn<TGroupFormData>) => void
    isLoading: boolean
    onCancel: () => void
}

export function GroupForm({
    mode,
    initialData,
    onSubmit,
    isLoading,
    onCancel,
}: GroupFormProps) {
    const isModeCreate = mode === 'create'

    const form = useForm<TGroupFormData>({
        resolver: zodResolver(groupSchema),
        defaultValues: groupDefaultValues,
        mode: 'onBlur',
    })

    useEffect(() => {
        if (initialData && !isModeCreate) {
            form.reset(initialData)
        }
    }, [form, initialData, isModeCreate])

    const handleSubmit = form.handleSubmit((data) => {
        onSubmit(data, form)
    })

    return (
        <form onSubmit={handleSubmit} noValidate>
            <FieldGroup>
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="name">Название</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    {...field}
                                    id="name"
                                    type="text"
                                    placeholder="Введите название"
                                    aria-invalid={fieldState.invalid}
                                    disabled={isLoading}
                                />
                            </InputGroup>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="description">Описание</FieldLabel>
                            <InputGroup>
                                <InputGroupTextarea
                                    {...field}
                                    id="description"
                                    placeholder="Введите описание"
                                    aria-invalid={fieldState.invalid}
                                    disabled={isLoading}
                                    rows={4}
                                />
                            </InputGroup>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="status"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="status">Статус</FieldLabel>
                            <Select
                                key={String(field.value || 'empty')}
                                value={field.value}
                                onValueChange={(value) =>
                                    field.onChange(value as TStatus)
                                }
                                disabled={isLoading}
                            >
                                <SelectTrigger
                                    id="status"
                                    className="w-full"
                                    aria-invalid={fieldState.invalid}
                                >
                                    <SelectValue placeholder="Выберите статус" />
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUS_SELECT.map((option) => (
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
                    name="priority"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="priority">Приоритет</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    {...field}
                                    id="priority"
                                    type="number"
                                    min={0}
                                    placeholder="0"
                                    aria-invalid={fieldState.invalid}
                                    disabled={isLoading}
                                    onChange={(e) => {
                                        const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10)
                                        field.onChange(isNaN(value) ? 0 : value)
                                    }}
                                />
                            </InputGroup>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <div className="flex justify-end items-center gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Отмена
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading && <Spinner className="size-3" />}
                        {isModeCreate ? 'Создать' : 'Сохранить'}
                    </Button>
                </div>
            </FieldGroup>
        </form>
    )
}
