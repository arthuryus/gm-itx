import type { TCustomer, TCustomersListResponse, TCustomersListParams, TCreateCustomerRequest, TUpdateCustomerRequest } from '../model/customer.types.ts'

// List groups
//export interface TGetCustomersRequest extends TCustomersListParams {}
export type TGetCustomersRequest = TCustomersListParams
export type TGetCustomersResponse = TCustomersListResponse

// Get single group
export interface TGetCustomerRequest {
    id: number
}
export type TGetCustomerResponse = TCustomer

// Create group
export type TCreateCustomerRequestWithoutId = TCreateCustomerRequest
export type TCreateCustomerResponse = TCustomer

// Update group
export interface TUpdateCustomerRequestWithId {
    id: number
    data: TUpdateCustomerRequest
}
export type TUpdateCustomerResponse = TCustomer

// Delete group
export interface TDeleteCustomerRequest {
    id: number
}
export type TDeleteCustomerResponse = void

// Close session
export interface TCloseSessionCustomerRequest {
    id: number
}
export type TCloseSessionCustomerResponse = void

// Send access
export interface TSendAccessCustomerRequest {
    id: number
}
export type TSendAccessCustomerResponse = void
