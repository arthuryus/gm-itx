import { useNavigate } from 'react-router-dom'
import { CrudUpdate } from '@/widgets/crud-form'
import { employeesApi } from '../api/employees-api'
import { employeeFormConfig } from '../config/formConfig'
import { employeeSchema } from '../model/employee.schema'
import type { EmployeeFormData } from '../model/employee.types'

interface EmployeeUpdateProps {
  id: number
}

export function EmployeeUpdate({ id }: EmployeeUpdateProps) {
  const navigate = useNavigate()

  const handleSuccess = () => {
    navigate('/employees')
  }

  const handleCancel = () => {
    navigate('/employees')
  }

  return (
    <CrudUpdate<EmployeeFormData, number, unknown>
      entityName="Сотрудник"
      id={id}
      fieldsConfig={employeeFormConfig}
      schema={employeeSchema}
      api={{
        getById: employeesApi.getById,
        update: employeesApi.update,
      }}
      queryKey="employees"
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  )
}
