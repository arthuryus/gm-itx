import { useState, useEffect } from 'react'
import { InputGroup, InputGroupInput } from '@/shadcn/components/ui/input-group'
import { Input } from '@/shadcn/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shadcn/components/ui/select'
import type { GroupFilter, GroupStatus } from '@/features/groups/model/group.types.ts'

interface GroupsTableFiltersProps {
    filters: GroupFilter
    onFiltersChange: (filters: GroupFilter) => void
}

export function GroupsTableFilters({ filters, onFiltersChange }: GroupsTableFiltersProps) {
    const [localFilters, setLocalFilters] = useState<GroupFilter>(filters)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onFiltersChange(localFilters)
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [localFilters, onFiltersChange])

    const handleIdChange = (value: string) => {
        const numValue = value === '' ? undefined : parseInt(value, 10)
        setLocalFilters((prev) => ({ ...prev, id: numValue }))
    }

    const handleNameChange = (value: string) => {
        setLocalFilters((prev) => ({ ...prev, name: value || undefined }))
    }

    const handleDescriptionChange = (value: string) => {
        setLocalFilters((prev) => ({ ...prev, description: value || undefined }))
    }

    const handleStatusChange = (value: GroupStatus | 'all') => {
        setLocalFilters((prev) => ({
            ...prev,
            status: value === 'all' ? undefined : value,
        }))
    }

    const handlePriorityChange = (value: string) => {
        const numValue = value === '' ? undefined : parseInt(value, 10)
        setLocalFilters((prev) => ({ ...prev, priority: numValue }))
    }


/*
    const handleChangeText = (name: string, value: string) => {
        setLocalFilters((prev) => ({ ...prev, [name]: value || undefined }))
    }

    const handleChangeNumber = (name: string, value: string) => {
        const numValue = value === '' ? undefined : parseInt(value, 10)
        setLocalFilters((prev) => ({ ...prev, [name]: numValue }))
    }

    const handleChangeSelect = (name: string, value: GroupStatus | 'all') => {
        setLocalFilters((prev) => ({
            ...prev,
            [name]: value === 'all' ? undefined : value,
        }))
    }

    const handleChange = (type: 'text' | 'number' | 'select', name: string, value: string) => {
        switch (type)
        {
            case "number":
                handleChangeNumber(name, value)
                break;
            case "text":
                handleChangeText(name, value)
                break;
            case "select":
                handleChangeSelect(name, value)
                break;
        }
    }
*/

    return (
        <div className="flex flex-wrap items-end gap-4 p-4">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Название</label>
                    <Input
                        type="number"
                        min={0}
                        placeholder="Поиск по ID"
                        value={localFilters.id || ''}
                        onChange={(e) => handleIdChange(e.target.value)}
                    />

            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Название</label>
                <InputGroup className="w-[200px]">
                    <InputGroupInput
                        placeholder="Поиск по названию..."
                        value={localFilters.name || ''}
                        onChange={(e) => handleNameChange(e.target.value)}
                    />
                </InputGroup>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Описание</label>
                <InputGroup className="w-[200px]">
                    <InputGroupInput
                        placeholder="Поиск по описанию..."
                        value={localFilters.description || ''}
                        onChange={(e) => handleDescriptionChange(e.target.value)}
                    />
                </InputGroup>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Статус</label>
                <Select
                    value={localFilters.status || 'all'}
                    onValueChange={(value) => handleStatusChange(value as GroupStatus | 'all')}
                >
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Все статусы" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="ACTIVE">Активна</SelectItem>
                        <SelectItem value="INACTIVE">Неактивна</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Приоритет</label>
                <InputGroup className="w-[120px]">
                    <InputGroupInput
                        type="number"
                        min={0}
                        placeholder="Приоритет"
                        value={localFilters.priority?.toString() || ''}
                        onChange={(e) => handlePriorityChange(e.target.value)}
                    />
                </InputGroup>
            </div>
        </div>
    )
}

/*const FilterNumber = (name: string) => { //localFilters[name] || ''
    return (
        <Input
            type="number"
            min={0}
            placeholder="Поиск по ID"
            value={localFilters[name] || ''}
            onChange={(e) => handleChangeNumber(name, e.target.value)}//handleIdChange(e.target.value)}
        />
    )
}*/
