export interface Employee {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  department?: string
  position?: string
  hireDate?: string
  salary?: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface EmployeeFilter {
  id?: number
  firstName?: string
  lastName?: string
  email?: string
  department?: string
  position?: string
  isActive?: boolean
}

export interface EmployeeFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  department?: string
  position?: string
  hireDate?: string
  salary?: number
  isActive: boolean
}
