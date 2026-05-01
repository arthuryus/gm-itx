//import { z } from 'zod'
//import { employeeSchema } from './employee.schema.ts'
import { type TStatus } from "@/shared/constants/main.ts";
import type {TTableListParams} from "@/shared/helpers/table.helper.ts";

export interface TEmployeeMembershipRole {
    id: string
    title: string
}
export interface TEmployeeMembership {
    groupId: string
    groupName: string
    roles: TEmployeeMembershipRole[]
}

export interface TEmployee {
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
    memberships: TEmployeeMembership[]
}

export interface TEmployeeFilter {
    id?: number
    firstName?: string
    lastName?: string
    middleName?: string
    email?: string
    phone?: string
    status?: TStatus
}

export interface TEmployeeSort {
    field: string
    direction: 'asc' | 'desc'
}

export type TEmployeesListParams = TTableListParams<TEmployeeFilter>

export interface TEmployeesListResponse {
    items: TEmployee[]
    meta: {
        currentPage: number
        perPage: number
        totalItems: number
        totalPages: number
        sort?: string[]
    }
}

export interface TEmployeeMembershipFormData {
    groupId: string
    roleIds: string[]
}

//export type TEmployeeFormData = Omit<z.infer<typeof employeeSchema>, 'id'>
export interface TEmployeeFormData {
    //id?: number
    firstName: string
    lastName: string
    middleName?: string
    email: string
    phone?: string
    status: TStatus
    memberships: TEmployeeMembershipFormData[]
}

export type TCreateEmployeeRequest = Omit<TEmployeeFormData, 'id'>//Omit<TEmployee, 'id' | 'mustChangeCredentials' | 'immutable'>
export type TUpdateEmployeeRequest = Omit<TEmployeeFormData, 'id'>//Omit<TEmployee, 'id' | 'mustChangeCredentials' | 'immutable'>
export type TEmployeeRequest = TCreateEmployeeRequest | TUpdateEmployeeRequest