import { z } from 'zod'
import { groupSchema } from './group.schema.ts'
import { type TStatus } from "@/shared/constants/main.ts";


export interface TGroup {
    id: number
    name: string
    description: string
    status: TStatus
    priority: number
}

export interface TGroupFilter {
    id?: number
    name?: string
    description?: string
    status?: TStatus
    priority?: number
}

export interface TGroupSort {
    field: string
    direction: 'asc' | 'desc'
}

export interface TGroupsListParams {
    page?: number
    perPage?: number
    sort?: string[]
    filter?: TGroupFilter
}

export interface TGroupsListResponse {
    items: TGroup[]
    meta: {
        currentPage: number
        perPage: number
        totalItems: number
        totalPages: number
        sort?: string[]
    }
}

export type TGroupFormData = z.infer<typeof groupSchema>
/*export interface TGroupFormData {
    name: string
    description: string
    status: TStatus
    priority: number
}*/

export type TCreateGroupRequest = Omit<TGroup, 'id'>
export type TUpdateGroupRequest = Omit<TGroup, 'id'>
