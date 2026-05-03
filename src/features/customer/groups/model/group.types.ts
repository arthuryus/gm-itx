import { z } from 'zod'
import { groupSchema } from './group.schema.ts'
import { type TStatus } from "@/shared/constants/main.ts";
import type {TTableListParams} from "@/shared/helpers/table.helper.ts";


export interface TGroup {
    id: number
    name: string
    description: string
    priority: number
    status: TStatus
    createdDate: string
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

export type TGroupsListParams = TTableListParams<TGroupFilter>
/*export interface TGroupsListParams {
    page?: number
    perPage?: number
    sort?: string[]
    filter?: TGroupFilter
}*/

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

export type TCreateGroupRequest = Omit<TGroup, 'id' | 'createdDate'>
export type TUpdateGroupRequest = Omit<TGroup, 'id' | 'createdDate'>
