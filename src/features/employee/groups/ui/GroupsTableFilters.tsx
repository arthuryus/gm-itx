import { useState, useEffect } from 'react'
import type { TGroupFilter } from '../model/group.types.ts'
import { type TStatus, STATUS_SELECT } from '@/shared/constants/main.ts'
import { InputGroup, InputGroupInput } from '@/shadcn/components/ui/input-group'
import { Input } from '@/shadcn/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/components/ui/select'

interface GroupsTableFiltersProps {
    filters: TGroupFilter
    onFiltersChange: (filters: TGroupFilter) => void
}

export function GroupsTableFilters({ filters, onFiltersChange }: GroupsTableFiltersProps) {
    const [localFilters, setLocalFilters] = useState<TGroupFilter>(filters)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onFiltersChange(localFilters)
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [localFilters, onFiltersChange])

    const handleStringChange = (name: keyof TGroupFilter, value: string) => {
        setLocalFilters((prev) => ({ ...prev, [name]: value || undefined }))
    }

    const handleNumberChange = (name: keyof TGroupFilter, value: string) => {
        const numValue = value === '' ? undefined : parseInt(value, 10)
        setLocalFilters((prev) => ({ ...prev, [name]: numValue }))
    }

    const handleStatusChange = (name: keyof TGroupFilter, value: TStatus | '_all_') => {
        setLocalFilters((prev) => ({ ...prev, [name]: value === '_all_' ? undefined : value, }))
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
                <label className="text-sm font-medium">Название</label>
                <InputGroup className="w-[200px]">
                    <InputGroupInput
                        placeholder="Поиск по названию..."
                        value={localFilters.name || ''}
                        onChange={(e) => handleStringChange('name', e.target.value)}
                    />
                </InputGroup>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Описание</label>
                <InputGroup className="w-[200px]">
                    <InputGroupInput
                        placeholder="Поиск по описанию..."
                        value={localFilters.description || ''}
                        onChange={(e) => handleStringChange('description', e.target.value)}
                    />
                </InputGroup>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Статус</label>
                <Select
                    value={localFilters.status || '_all_'}
                    onValueChange={(value) => handleStatusChange('status', value as TStatus | '_all_')}
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

            {/*<div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Приоритет</label>
                <InputGroup className="w-[120px]">
                    <InputGroupInput
                        type="number"
                        min={0}
                        placeholder="Приоритет"
                        value={localFilters.priority?.toString() || ''}
                        onChange={(e) => handleNumberChange('priority', e.target.value)}
                    />
                </InputGroup>
            </div>*/}
        </div>
    )
}
