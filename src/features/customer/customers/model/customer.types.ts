//import { z } from 'zod'
//import { customerSchema } from './customer.schema.ts'
import { type TStatus } from "@/shared/constants/main.ts";
import type {TTableListParams} from "@/shared/helpers/table.helper.ts";

export interface TCustomerMembershipRole {
    id: string
    title: string
}
export interface TCustomerMembership {
    groupId: string
    groupName: string
    roles: TCustomerMembershipRole[]
}

export interface TCustomer {
    id: number
    firstName: string
    lastName: string
    middleName?: string
    email: string
    phone?: string
    status: TStatus
    createdDate: string
    //mustChangeCredentials: boolean,
    immutable: boolean,
    memberships: TCustomerMembership[]
}

export interface TCustomerFilter {
    id?: number
    firstName?: string
    lastName?: string
    middleName?: string
    email?: string
    phone?: string
    status?: TStatus
}

export interface TCustomerSort {
    field: string
    direction: 'asc' | 'desc'
}

export type TCustomersListParams = TTableListParams<TCustomerFilter>

export interface TCustomersListResponse {
    items: TCustomer[]
    meta: {
        currentPage: number
        perPage: number
        totalItems: number
        totalPages: number
        sort?: string[]
    }
}

export interface TCustomerMembershipFormData {
    groupId: string
    roleIds: string[]
}

//export type TCustomerFormData = Omit<z.infer<typeof customerSchema>, 'id'>
export interface TCustomerFormData {
    //id?: number
    firstName: string
    lastName: string
    middleName?: string
    email: string
    phone?: string
    status: TStatus
    memberships: TCustomerMembershipFormData[]
}

export type TCreateCustomerRequest = Omit<TCustomerFormData, 'id'>//Omit<TCustomer, 'id' | 'mustChangeCredentials' | 'immutable'>
export type TUpdateCustomerRequest = Omit<TCustomerFormData, 'id'>//Omit<TCustomer, 'id' | 'mustChangeCredentials' | 'immutable'>