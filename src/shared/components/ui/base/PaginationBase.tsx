import {PER_PAGE_OPTIONS} from "@/shared/constants/main.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shadcn/components/ui/select.tsx";
import {Button} from "@/shadcn/components/ui/button.tsx";
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight} from "lucide-react";

export function PaginationBase({
    page,
    perPage,
    totalItems,
    totalPages,
    onPageChange,
    onPerPageChange,
}: {
    page: number
    perPage: number
    totalItems: number,
    totalPages: number,
    onPageChange: (page: number) => void
    onPerPageChange: (perPage: number) => void
}) {
    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Всего: {totalItems}</span>
                <span className="hidden sm:inline">|</span>
                <span className="hidden sm:inline">
                        Страница {page} из {totalPages || 1}
                    </span>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">На странице:</span>
                    <Select
                        value={perPage.toString()}
                        onValueChange={(value) => onPerPageChange(Number(value))}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {PER_PAGE_OPTIONS.map((option) => (
                                <SelectItem key={option} value={option.toString()}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="hidden h-8 w-8 lg:flex"
                        onClick={() => onPageChange(1)}
                        disabled={page <= 1}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onPageChange(page - 1)}
                        disabled={page <= 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onPageChange(page + 1)}
                        disabled={page >= totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="hidden h-8 w-8 lg:flex"
                        onClick={() => onPageChange(totalPages)}
                        disabled={page >= totalPages}
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}