import * as React from "react"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"

import { cn } from "@/shadcn/lib/utils.ts"
import { Badge } from "@/shadcn/components/ui/badge.tsx"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/shadcn/components/ui/command.tsx"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shadcn/components/ui/popover.tsx"

export type SelectMultiOption = {
    value: string
    label: string
    disabled?: boolean
}

export type SelectMultiProps = {
    value?: string[]
    onValueChange?: (value: string[]) => void
    options: SelectMultiOption[]

    placeholder?: string
    searchPlaceholder?: string
    emptyText?: string

    disabled?: boolean
    invalid?: boolean
    searchable?: boolean

    size?: "sm" | "default"
    maxVisibleItems?: number

    name?: string
    className?: string
}

function normalizeValue(value: unknown): string[] {
    return Array.isArray(value) ? value : []
}

function toggle(values: string[], v: string) {
    return values.includes(v)
        ? values.filter((x) => x !== v)
        : [...values, v]
}

export const SelectMulti = React.forwardRef<
    HTMLButtonElement,
    SelectMultiProps
>(function SelectMulti(
    {
        value,
        onValueChange,
        options,

        placeholder = "Выберите",
        searchPlaceholder = "Поиск",
        emptyText = "Ничего не найдено.",

        disabled = false,
        invalid = false,
        searchable = false,

        size = "default",
        maxVisibleItems = 10,

        name,
        className,
    },
    ref
) {
    const [open, setOpen] = React.useState(false)

    const normalizedValue = normalizeValue(value)

    const optionsMap = React.useMemo(() => {
        return new Map(options.map((o) => [o.value, o]))
    }, [options])

    const selected = React.useMemo(() => {
        return normalizedValue
            .map((v) => optionsMap.get(v))
            .filter(Boolean) as SelectMultiOption[]
    }, [normalizedValue, optionsMap])

    const handleChange = React.useCallback(
        (next: string[]) => {
            onValueChange?.(next)
        },
        [onValueChange]
    )

    const handleSelect = (v: string) => {
        if (disabled) return
        handleChange(toggle(normalizedValue, v))
    }

    const handleRemove = (v: string) => {
        if (disabled) return
        handleChange(normalizedValue.filter((x) => x !== v))
    }

    const handleClear = (e?: React.SyntheticEvent) => {
        e?.preventDefault()
        e?.stopPropagation()

        if (disabled) return
        handleChange([])
    }

    const itemHeight = size === "sm" ? 32 : 36
    const maxHeight = itemHeight * maxVisibleItems

    return (
        <>
            {name && (
                <input
                    type="hidden"
                    name={name}
                    value={normalizedValue.join(",")}
                />
            )}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        ref={ref}
                        type="button"
                        role="combobox"
                        aria-expanded={open}
                        aria-invalid={invalid || undefined}
                        disabled={disabled}
                        className={cn(
                            "flex w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none transition",
                            "focus-visible:ring-2 focus-visible:ring-ring/50",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                            invalid && "border-destructive",

                            size === "default" && "min-h-9 py-2",
                            size === "sm" && "min-h-8 py-1.5",

                            className
                        )}
                    >
                        {/* LEFT */}
                        <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
                            {selected.length > 0 ? (
                                selected.map((opt) => (
                                    <Badge
                                        key={opt.value}
                                        variant="secondary"
                                        className="flex items-center gap-1 px-2 py-0.5"
                                    >
                                        <span className="truncate">{opt.label}</span>

                                        {/* REMOVE (FIX: no button inside button) */}
                                        <span
                                            role="button"
                                            tabIndex={0}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleRemove(opt.value)
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === " ") {
                                                    e.preventDefault()
                                                    handleRemove(opt.value)
                                                }
                                            }}
                                            className="cursor-pointer hover:opacity-70"
                                        >
                      <XIcon className="size-3" />
                    </span>
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-muted-foreground">
                  {placeholder}
                </span>
                            )}
                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center gap-1">
                            {normalizedValue.length > 0 && (
                                <span
                                    role="button"
                                    tabIndex={0}
                                    onClick={handleClear}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault()
                                            handleClear()
                                        }
                                    }}
                                    className="cursor-pointer text-muted-foreground hover:opacity-70"
                                >
                  <XIcon className="size-4" />
                </span>
                            )}

                            <ChevronDownIcon className="size-4 opacity-50" />
                        </div>
                    </button>
                </PopoverTrigger>

                <PopoverContent
                    align="start"
                    className="min-w-[var(--radix-popover-trigger-width)] w-auto p-0"
                >
                    <Command>
                        {searchable && (
                            <CommandInput placeholder={searchPlaceholder} />
                        )}

                        <CommandList style={{ maxHeight }}>
                            <CommandEmpty>{emptyText}</CommandEmpty>

                            <CommandGroup>
                                {options.map((opt) => {
                                    const isSelected = normalizedValue.includes(opt.value)

                                    return (
                                        <CommandItem
                                            key={opt.value}
                                            value={opt.label}
                                            disabled={opt.disabled}
                                            onSelect={() => handleSelect(opt.value)}
                                            className="flex items-center justify-between"
                                        >
                                            <span>{opt.label}</span>

                                            {isSelected && (
                                                <CheckIcon className="size-4" />
                                            )}
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    )
})