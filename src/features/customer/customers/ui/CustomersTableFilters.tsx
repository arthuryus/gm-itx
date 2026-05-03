import { useState, useEffect } from 'react'
import type { TCustomerFilter } from '../model/customer.types.ts'
import { STATUS_SELECT } from '@/shared/constants/main.ts'
import { useGetRolesList } from '@/features/customer/roles/hooks/queries/useGetRoles.ts'
import { InputGroup, InputGroupInput } from '@/shadcn/components/ui/input-group'
import { Input } from '@/shadcn/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/components/ui/select'
import { SelectMulti } from "@/shared/components/ui/selects/SelectMulti.tsx";

interface CustomersTableFiltersProps {
    filters: TCustomerFilter
    onFiltersChange: (filters: TCustomerFilter) => void
}

export function CustomersTableFilters({ filters, onFiltersChange }: CustomersTableFiltersProps) {
    const {options: optionsRoles, isLoading: isLoadingRoles} = useGetRolesList()
    const [localFilters, setLocalFilters] = useState<TCustomerFilter>(filters)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onFiltersChange(localFilters)
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [localFilters, onFiltersChange])

    const handleStringChange = (name: keyof TCustomerFilter, value: string) => {
        setLocalFilters((prev) => ({ ...prev, [name]: value || undefined }))
    }

    const handleNumberChange = (name: keyof TCustomerFilter, value: string) => {
        const numValue = value === '' ? undefined : parseInt(value, 10)
        setLocalFilters((prev) => ({ ...prev, [name]: numValue }))
    }

    const handleSelectMultiChange = (name: keyof TCustomerFilter, value: string[]) => {
        setLocalFilters((prev) => ({ ...prev, [name]: value.length > 0 ? value : undefined }))
    }

    const handleSelectChange = (name: keyof TCustomerFilter, value: string | '_all_') => {
        setLocalFilters((prev) => ({ ...prev, [name]: value === '_all_' ? undefined : value, }))
    }

    return (
        <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">ID</label>
                    <Input
                        type="number"
                        min={0}
                        placeholder="Поиск по ID"
                        value={localFilters.id || ''}
                        onChange={(e) => handleNumberChange('id', e.target.value)}
                    />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">ФИО</label>
                <InputGroup className="w-[200px]">
                    <InputGroupInput
                        placeholder="Поиск по ФИО"
                        value={localFilters.name || ''}
                        onChange={(e) => handleStringChange('name', e.target.value)}
                    />
                </InputGroup>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Email</label>
                <InputGroup className="w-[200px]">
                    <InputGroupInput
                        placeholder="Поиск по Email"
                        value={localFilters.email || ''}
                        onChange={(e) => handleStringChange('email', e.target.value)}
                    />
                </InputGroup>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Телефон</label>
                <InputGroup className="w-[200px]">
                    <InputGroupInput
                        placeholder="Поиск по номеру телефона"
                        value={localFilters.phone || ''}
                        onChange={(e) => handleStringChange('phone', e.target.value)}
                    />
                </InputGroup>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Ролы</label>
                <SelectMulti
                    value={localFilters.roleIds}
                    onValueChange={(value) => handleSelectMultiChange('roleIds', value)}
                    options={optionsRoles}
                    placeholder={isLoadingRoles ? 'Загрузка' : 'Выберите роли'}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Статус</label>
                <Select
                    value={localFilters.status || '_all_'}
                    onValueChange={(value) => handleSelectChange('status', value as string | '_all_')}
                >
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Все статусы" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="_all_">Все</SelectItem>
                        {STATUS_SELECT.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
