import type { TEmployee, TEmployeesListResponse, TEmployeesListParams, TCreateEmployeeRequest, TUpdateEmployeeRequest } from '../model/employee.types.ts'

// List groups
//export interface TGetEmployeesRequest extends EmployeesListParams {}
export type TGetEmployeesRequest = TEmployeesListParams
export type TGetEmployeesResponse = TEmployeesListResponse

// Get single group
export interface TGetEmployeeRequest {
    id: number
}
export type TGetEmployeeResponse = TEmployee

// Create group
export type TCreateEmployeeRequestWithoutId = TCreateEmployeeRequest
export type TCreateEmployeeResponse = TEmployee

// Update group
export interface TUpdateEmployeeRequestWithId {
    id: number
    data: TUpdateEmployeeRequest
}
export type TUpdateEmployeeResponse = TEmployee

// Delete group
export interface TDeleteEmployeeRequest {
    id: number
}
export type TDeleteEmployeeResponse = void

// Close session
export interface TCloseSessionEmployeeRequest {
    id: number
}
export type TCloseSessionEmployeeResponse = void

// Send access
export interface TSendAccessEmployeeRequest {
    id: number
}
export type TSendAccessEmployeeResponse = void
