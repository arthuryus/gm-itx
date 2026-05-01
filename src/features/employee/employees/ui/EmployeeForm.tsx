import { useEffect } from 'react'
import { Controller, useForm, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { employeeSchema, employeeDefaultValues } from '../model/employee.schema.ts'
import type { TEmployee, TEmployeeFormData } from '../model/employee.types.ts'
import { type TStatus, STATUS_SELECT } from '@/shared/constants/main.ts'
import { mapEmployeeApiToForm } from '../model/employee.mapper.ts'
import { EmployeeFormMemberships } from './EmployeeFormMemberships.tsx'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shadcn/components/ui/field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/components/ui/select'
import { InputGroup, InputGroupInput } from '@/shadcn/components/ui/input-group'
import { Button } from '@/shadcn/components/ui/button'
import { Spinner } from '@/shadcn/components/ui/spinner'


interface EmployeeFormProps {
    mode: 'create' | 'update'
    initialData?: TEmployee
    isSubmitting: boolean
    onSubmit: (data: TEmployeeFormData, form:  UseFormReturn<TEmployeeFormData>) => void
    onCancel: () => void
    disabled?: boolean
}

export function EmployeeForm({
    mode,
    initialData,
    isSubmitting,
    onSubmit,
    onCancel,
    disabled = false,
}: EmployeeFormProps) {
    const isModeCreate = mode === 'create'

    const form = useForm<TEmployeeFormData>({
        resolver: zodResolver(employeeSchema),
        defaultValues: employeeDefaultValues,
        mode: 'onBlur',
    })

    useEffect(() => {
        if (initialData && !isModeCreate) {
            form.reset(mapEmployeeApiToForm(initialData))
        }
    }, [form, initialData, isModeCreate])

    const handleSubmit = form.handleSubmit((data) => {
        onSubmit(data, form)
    })

    return (
        <form onSubmit={handleSubmit} noValidate>
            <FieldGroup>
                <Controller
                    name="firstName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="firstName">Имя</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    {...field}
                                    id="firstName"
                                    type="text"
                                    placeholder="Введите имя"
                                    aria-invalid={fieldState.invalid}
                                    disabled={isSubmitting || disabled}
                                />
                            </InputGroup>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="lastName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="lastName">Фамилия</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    {...field}
                                    id="lastName"
                                    type="text"
                                    placeholder="Введите фамилию"
                                    aria-invalid={fieldState.invalid}
                                    disabled={isSubmitting || disabled}
                                />
                            </InputGroup>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="middleName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="middleName">Отчество</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    {...field}
                                    id="middleName"
                                    type="text"
                                    placeholder="Введите отчество"
                                    aria-invalid={fieldState.invalid}
                                    disabled={isSubmitting || disabled}
                                />
                            </InputGroup>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    {...field}
                                    id="email"
                                    type="text"
                                    placeholder="Введите email"
                                    aria-invalid={fieldState.invalid}
                                    disabled={isSubmitting || disabled}
                                />
                            </InputGroup>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="phone">Телефон</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    {...field}
                                    id="phone"
                                    type="text"
                                    placeholder="Введите номер телефона"
                                    aria-invalid={fieldState.invalid}
                                    disabled={isSubmitting || disabled}
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
                                disabled={isSubmitting || disabled}
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

                <EmployeeFormMemberships
                    form={form}
                    isSubmitting={isSubmitting}
                    disabled={disabled}
                />

                <div className="flex justify-end items-center gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        Отмена
                    </Button>
                    {!disabled && (
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting && <Spinner className="size-3" />}
                            {isModeCreate ? 'Создать' : 'Сохранить'}
                        </Button>
                    )}
                </div>
            </FieldGroup>
        </form>
    )
}
