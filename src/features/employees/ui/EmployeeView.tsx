import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CrudView } from '@/widgets/crud-view'
import { CrudDeleteDialog } from '@/widgets/crud-delete'
import { useAccess } from '@/features/access/hooks/use-access'
import { PERMISSIONS } from '@/shared/config/permissions'
import { employeesApi } from '../api/employees-api'
import { employeeViewConfig } from '../config/viewConfig'

interface EmployeeViewProps {
  id: number
}

export function EmployeeView({ id }: EmployeeViewProps) {
  const navigate = useNavigate()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  
  // Check permissions
  const canEdit = useAccess({ permission: PERMISSIONS.PERMISSION_EMPLOYEES_EDIT }, true)
  const canDelete = useAccess({ permission: PERMISSIONS.PERMISSION_EMPLOYEES_DELETE }, true)

  const handleEdit = () => {
    navigate(`/employees/${id}/edit`)
  }

  const handleDelete = () => {
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteSuccess = () => {
    navigate('/employees')
  }

  const handleCloseDelete = () => {
    setIsDeleteDialogOpen(false)
  }

  const handleBack = () => {
    navigate('/employees')
  }

  return (
    <>
      <CrudView<Employee, number>
        entityName="Сотрудник"
        id={id}
        api={{
          getById: employeesApi.getById,
        }}
        fieldsConfig={employeeViewConfig}
        queryKey="employees"
        onEdit={canEdit ? handleEdit : undefined}
        onDelete={canDelete ? handleDelete : undefined}
        onBack={handleBack}
      />

      <CrudDeleteDialog<number>
        entityName="Сотрудник"
        id={id}
        api={employeesApi.delete}
        queryKey="employees"
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDelete}
        onSuccess={handleDeleteSuccess}
      />
    </>
  )
}

// Type import for the generic
import type { Employee } from '../model/employee.types'
