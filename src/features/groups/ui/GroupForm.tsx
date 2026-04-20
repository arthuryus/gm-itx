import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shadcn/components/ui/button'
import { Spinner } from '@/shadcn/components/ui/spinner'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shadcn/components/ui/select'
import { InputGroup, InputGroupInput, InputGroupTextarea } from '@/shadcn/components/ui/input-group'
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/shadcn/components/ui/field'
import { groupSchema, type GroupFormData } from '@/features/groups/model/group.schema.ts'
import type { Group, GroupStatus } from '@/features/groups/model/group.types.ts'

interface GroupFormProps {
    mode: 'create' | 'update'
    initialData?: Group
    onSubmit: (data: GroupFormData) => void
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
    const form = useForm<GroupFormData>({
        resolver: zodResolver(groupSchema),
        defaultValues: {
            name: '',
            description: '',
            status: 'ACTIVE',
            priority: 0,
        },
    })

    useEffect(() => {
        if (initialData && mode === 'update') {
            form.reset({
                name: initialData.name,
                description: initialData.description,
                status: initialData.status,
                priority: initialData.priority,
            })
        }
    }, [initialData, mode, form])

    const handleSubmit = form.handleSubmit((data) => {
        onSubmit(data)
    })

    return (
        <form onSubmit={handleSubmit} noValidate>
            <FieldGroup className="gap-6">
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
                                    placeholder="Введите название группы"
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
                                    placeholder="Введите описание группы"
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
                                value={field.value}
                                onValueChange={(value) =>
                                    field.onChange(value as GroupStatus)
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
                                    <SelectItem value="ACTIVE">Активна</SelectItem>
                                    <SelectItem value="INACTIVE">Неактивна</SelectItem>
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
                            <InputGroup className="w-[150px]">
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

                <div className="flex justify-end items-center gap-4 pt-4">
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
                        //className="min-w-[120px]"
                    >
                        {isLoading && <Spinner className="mr-2 size-4" />}
                        {mode === 'create' ? 'Создать' : 'Сохранить'}
                    </Button>
                </div>
            </FieldGroup>
        </form>
    )
}
