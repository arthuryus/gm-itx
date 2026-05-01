import { useEffect } from 'react'
import { Controller, useForm, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { roleSchema, roleDefaultValues } from '../model/role.schema.ts'
import type {TRoleDetail, TRoleFormData} from '../model/role.types.ts'
import { mapRoleApiToForm } from '../model/role.mapper.ts'
import { RoleFormPermissionsTree } from './RoleFormPermissionsTree.tsx'
import { Card, CardContent, CardHeader } from "@/shadcn/components/ui/card.tsx"
import { Skeleton } from "@/shadcn/components/ui/skeleton.tsx"
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shadcn/components/ui/field'
import { InputGroup, InputGroupInput } from '@/shadcn/components/ui/input-group'
import { Button } from '@/shadcn/components/ui/button'
import { Spinner } from '@/shadcn/components/ui/spinner'

interface RoleFormProps {
    mode: 'create' | 'update'
    isLoading: boolean
    initialData?: TRoleDetail
    onSubmit: (data: TRoleFormData, form:  UseFormReturn<TRoleFormData>) => void
    isSubmitting: boolean
    onCancel: () => void
    disabled?: boolean
}

export function RoleForm({
    mode,
    isLoading,
    initialData,
    onSubmit,
    isSubmitting,
    onCancel,
    disabled = false,
}: RoleFormProps) {
    const isModeCreate = mode === 'create'

    const form = useForm<TRoleFormData>({
        resolver: zodResolver(roleSchema),
        defaultValues: roleDefaultValues,
        mode: 'onBlur',
    })

    useEffect(() => {
        if (initialData) {
            form.reset(mapRoleApiToForm(initialData))
        }
    }, [form, initialData])

    const handleSubmit = form.handleSubmit((data) => {
        onSubmit(data, form)
    })

    if (isLoading) {
        return (
            <Card className="max---w-2xl w-full">
                <CardHeader>
                    <Skeleton className="h-10 w-32" />
                </CardHeader>
                <CardContent>
                    <FieldGroup>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <Skeleton className="h-50 w-full" />
                            <Skeleton className="h-50 w-full" />
                            <Skeleton className="h-50 w-full" />
                            <Skeleton className="h-50 w-full" />
                        </div>
                        <div className="flex justify-end items-center gap-4">
                            <Skeleton className="h-10 w-24"/>
                            <Skeleton className="h-10 w-24"/>
                        </div>
                    </FieldGroup>
                </CardContent>
            </Card>
        )
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Controller
                        name="title"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="title">Название</FieldLabel>
                                <InputGroup>
                                    <InputGroupInput
                                        {...field}
                                        id="title"
                                        type="text"
                                        placeholder="Введите название"
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
                        name="code"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="code">Идентификатор</FieldLabel>
                                <InputGroup>
                                    <InputGroupInput
                                        {...field}
                                        id="code"
                                        type="text"
                                        placeholder="Введите идентификатор"
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
                        name="description"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="description">Описание</FieldLabel>
                                <InputGroup>
                                    <InputGroupInput
                                        {...field}
                                        id="description"
                                        type="text"
                                        placeholder="Введите описание"
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
                </div>

                <RoleFormPermissionsTree
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
