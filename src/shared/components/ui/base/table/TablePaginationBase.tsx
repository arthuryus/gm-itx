import { PER_PAGE_OPTIONS } from "@/shared/constants/main.ts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/components/ui/select.tsx"
import { Button } from "@/shadcn/components/ui/button.tsx"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

function getPageNumbers(page: number, totalPages: number) {
    const pages: (number | "...")[] = []

    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    pages.push(1)

    if (page > 4) {
        pages.push("...")
    }

    const start = Math.max(2, page - 1)
    const end = Math.min(totalPages - 1, page + 1)

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    if (page < totalPages - 3) {
        pages.push("...")
    }

    pages.push(totalPages)

    return pages
}

export function TablePaginationBase({
    page,
    perPage,
    totalItems,
    totalPages,
    onPageChange,
    onPerPageChange,
}: {
    page: number
    perPage: number
    totalItems: number
    totalPages: number
    onPageChange: (page: number) => void
    onPerPageChange: (perPage: number) => void
}) {
    const safeTotalPages = totalPages || 1
    const pageNumbers = getPageNumbers(page, safeTotalPages)

    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Всего: {totalItems}</span>
                <span className="hidden sm:inline">|</span>
                <span className="hidden sm:inline">
                    Страница {page} из {safeTotalPages}
                </span>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        На странице:
                    </span>

                    <Select
                        value={perPage.toString()}
                        onValueChange={(value) => onPerPageChange(Number(value))}
                    >
                        <SelectTrigger className="h-8 w-[80px]">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            {PER_PAGE_OPTIONS.map((option) => (
                                <SelectItem
                                    key={option}
                                    value={option.toString()}
                                >
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

                    <div className="hidden items-center gap-1 sm:flex">
                        {pageNumbers.map((pageNumber, index) =>
                            pageNumber === "..." ? (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="px-2 text-sm text-muted-foreground"
                                >
                                    ...
                                </span>
                            ) : (
                                <Button
                                    key={pageNumber}
                                    variant={
                                        pageNumber === page
                                            ? "default"
                                            : "outline"
                                    }
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => onPageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </Button>
                            )
                        )}
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onPageChange(page + 1)}
                        disabled={page >= safeTotalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        className="hidden h-8 w-8 lg:flex"
                        onClick={() => onPageChange(safeTotalPages)}
                        disabled={page >= safeTotalPages}
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

/*import { PER_PAGE_OPTIONS } from "@/shared/constants/main.ts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/components/ui/select.tsx"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from "@/shadcn/components/ui/pagination.tsx"
import { Button } from "@/shadcn/components/ui/button.tsx"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

function getPageNumbers(page: number, totalPages: number) {
    const pages: (number | "...")[] = []

    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    pages.push(1)

    if (page > 4) {
        pages.push("...")
    }

    const start = Math.max(2, page - 1)
    const end = Math.min(totalPages - 1, page + 1)

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    if (page < totalPages - 3) {
        pages.push("...")
    }

    pages.push(totalPages)

    return pages
}

export function TablePaginationBase({
    page,
    perPage,
    totalItems,
    totalPages,
    onPageChange,
    onPerPageChange,
}: {
    page: number
    perPage: number
    totalItems: number
    totalPages: number
    onPageChange: (page: number) => void
    onPerPageChange: (perPage: number) => void
}) {
    const safeTotalPages = totalPages || 1
    const pageNumbers = getPageNumbers(page, safeTotalPages)

    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Всего: {totalItems}</span>
                <span className="hidden sm:inline">|</span>
                <span className="hidden sm:inline">
                    Страница {page} из {safeTotalPages}
                </span>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        На странице:
                    </span>

                    <Select
                        value={perPage.toString()}
                        onValueChange={(value) => onPerPageChange(Number(value))}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            {PER_PAGE_OPTIONS.map((option) => (
                                <SelectItem
                                    key={option}
                                    value={option.toString()}
                                >
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Pagination className="mx-0 w-auto">
                    <PaginationContent>
                        <PaginationItem className="hidden lg:block">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => onPageChange(1)}
                                disabled={page <= 1}
                            >
                                <ChevronsLeft className="h-4 w-4" />
                            </Button>
                        </PaginationItem>

                        <PaginationItem>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => onPageChange(page - 1)}
                                disabled={page <= 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                        </PaginationItem>

                        <div className="hidden items-center gap-1 sm:flex">
                            {pageNumbers.map((pageNumber, index) => (
                                <PaginationItem key={`${pageNumber}-${index}`}>
                                    {pageNumber === "..." ? (
                                        <PaginationEllipsis />
                                    ) : (
                                        <PaginationLink
                                            href="#"
                                            isActive={pageNumber === page}
                                            className="h-8 w-8 cursor-pointer"
                                            onClick={(event) => {
                                                event.preventDefault()
                                                onPageChange(pageNumber)
                                            }}
                                        >
                                            {pageNumber}
                                        </PaginationLink>
                                    )}
                                </PaginationItem>
                            ))}
                        </div>

                        <PaginationItem>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => onPageChange(page + 1)}
                                disabled={page >= safeTotalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </PaginationItem>

                        <PaginationItem className="hidden lg:block">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => onPageChange(safeTotalPages)}
                                disabled={page >= safeTotalPages}
                            >
                                <ChevronsRight className="h-4 w-4" />
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}*/