import { useState, useEffect } from 'react'
import type { TEmployeeFilter } from '../model/employee.types.ts'
import { type TStatus, STATUS_SELECT } from '@/shared/constants/main.ts'
import { InputGroup, InputGroupInput } from '@/shadcn/components/ui/input-group'
import { Input } from '@/shadcn/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/components/ui/select'

interface EmployeesTableFiltersProps {
    filters: TEmployeeFilter
    onFiltersChange: (filters: TEmployeeFilter) => void
}

export function EmployeesTableFilters({ filters, onFiltersChange }: EmployeesTableFiltersProps) {
    const [localFilters, setLocalFilters] = useState<TEmployeeFilter>(filters)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onFiltersChange(localFilters)
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [localFilters, onFiltersChange])

    const handleStringChange = (name: string, value: string) => {
        setLocalFilters((prev) => ({ ...prev, [name]: value || undefined }))
    }

    const handleNumberChange = (name: string, value: string) => {
        const numValue = value === '' ? undefined : parseInt(value, 10)
        setLocalFilters((prev) => ({ ...prev, [name]: numValue }))
    }

    const handleStatusChange = (name: string, value: TStatus | 'all') => {
        setLocalFilters((prev) => ({ ...prev, [name]: value === 'all' ? undefined : value, }))
    }

    return (
        <div className="flex flex-wrap items-end gap-4 p---4">
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
                <label className="text-sm font-medium">Имя</label>
                <InputGroup className="w-[200px]">
                    <InputGroupInput
                        placeholder="Поиск по имени..."
                        value={localFilters.firstName || ''}
                        onChange={(e) => handleStringChange('firstName', e.target.value)}
                    />
                </InputGroup>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Фамилия</label>
                <InputGroup className="w-[200px]">
                    <InputGroupInput
                        placeholder="Поиск по фамилии..."
                        value={localFilters.lastName || ''}
                        onChange={(e) => handleStringChange('lastName', e.target.value)}
                    />
                </InputGroup>
            </div>

            {/*<div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Отчество</label>
                <InputGroup className="w-[200px]">
                    <InputGroupInput
                        placeholder="Поиск по отчеству..."
                        value={localFilters.middleName || ''}
                        onChange={(e) => handleStringChange('middleName', e.target.value)}
                    />
                </InputGroup>
            </div>*/}

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Email</label>
                <InputGroup className="w-[200px]">
                    <InputGroupInput
                        placeholder="Поиск по Email..."
                        value={localFilters.email || ''}
                        onChange={(e) => handleStringChange('email', e.target.value)}
                    />
                </InputGroup>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Телефон</label>
                <InputGroup className="w-[200px]">
                    <InputGroupInput
                        placeholder="Поиск по номеру телефона..."
                        value={localFilters.phone || ''}
                        onChange={(e) => handleStringChange('phone', e.target.value)}
                    />
                </InputGroup>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Статус</label>
                <Select
                    value={localFilters.status || 'all'}
                    onValueChange={(value) => handleStatusChange('status', value as TStatus | 'all')}
                >
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Все статусы" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
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
