import { useNavigate } from 'react-router-dom'
import { CrudCreate } from '@/widgets/crud-form'
import { employeesApi } from '../api/employees-api'
import { employeeFormConfig } from '../config/formConfig'
import { employeeSchema } from '../model/employee.schema'
import type { EmployeeFormData } from '../model/employee.types'

export function EmployeeCreate() {
  const navigate = useNavigate()

  const handleSuccess = () => {
    navigate('/employees')
  }

  const handleCancel = () => {
    navigate('/employees')
  }

  return (
    <CrudCreate<EmployeeFormData, unknown>
      entityName="Сотрудник"
      fieldsConfig={employeeFormConfig}
      schema={employeeSchema}
      api={employeesApi.create}
      queryKey="employees"
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  )
}
