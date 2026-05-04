import type {SortingState} from "@tanstack/react-table";

export interface TTableListParams<TFilter = unknown> {
    page?: number
    perPage?: number
    sort?: string[]
    filter?: TFilter
}

export function buildTableFilterQueryParams(params: TTableListParams): string {
    const searchParams = new URLSearchParams()

    if (params.page !== undefined) {
        searchParams.append('page', String(params.page))
    }
    if (params.perPage !== undefined) {
        searchParams.append('perPage', String(params.perPage))
    }

    if (params.sort && params.sort.length > 0) {
        params.sort.forEach((sortItem) => {
            searchParams.append('sort', sortItem)//'sort[]'
        })
    }

    if (params.filter) {
        Object.entries(params.filter).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                searchParams.append(`${key}`, String(value))//(`filter[${key}]`, String(value))
            }
        })
    }

    return searchParams.toString()
}

export function mapTableSortApiToSortingState(sort?: string[]): SortingState {
    return (sort ?? []).map((field) => {
        const desc = field.startsWith('-')

        return {
            id: desc ? field.slice(1) : field,
            desc,
        }
    })
}

export function mapTableSortSortingStateToApi(sorting: SortingState): string[] {
    return sorting.map((item) =>
        item.desc ? `-${item.id}` : item.id
    )
}