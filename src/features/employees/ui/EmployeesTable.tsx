import { useNavigate } from 'react-router-dom'
import { CrudTable } from '@/widgets/crud-table'
import { useAccess } from '@/features/access/hooks/use-access'
import { PERMISSIONS } from '@/shared/config/permissions'
import { employeesApi } from '../api/employees-api'
import { employeeColumns } from '../config/columnsConfig'
import { employeeFilterConfig } from '../config/filterConfig'

export function EmployeesTable() {
  const navigate = useNavigate()
  
  // Check permissions
  const canCreate = useAccess({ permission: PERMISSIONS.PERMISSION_EMPLOYEES_CREATE }, true)
  const canEdit = useAccess({ permission: PERMISSIONS.PERMISSION_EMPLOYEES_EDIT }, true)
  const canDelete = useAccess({ permission: PERMISSIONS.PERMISSION_EMPLOYEES_DELETE }, true)
  const canView = useAccess({ permission: PERMISSIONS.PERMISSION_EMPLOYEES_VIEW }, true)

  const handleCreateClick = () => {
    navigate('/employees/create')
  }

  const handleViewClick = (id: number) => {
    navigate(`/employees/${id}`)
  }

  const handleEditClick = (id: number) => {
    navigate(`/employees/${id}/edit`)
  }

  const handleDeleteClick = (id: number) => {
    navigate(`/employees/${id}/delete`)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Сотрудники</h1>
      
      <CrudTable<Employee, EmployeeFilter>
        entityName="employees"
        queryKey="employees"
        api={employeesApi.getList}
        columns={employeeColumns}
        filterConfig={employeeFilterConfig}
        pageSize={10}
        pageSizeOptions={[1, 10, 25, 50]}
        showCreateButton={canCreate}
        onCreateClick={canCreate ? handleCreateClick : undefined}
        onViewClick={canView ? handleViewClick : undefined}
        onEditClick={canEdit ? handleEditClick : undefined}
        onDeleteClick={canDelete ? handleDeleteClick : undefined}
        showViewAction={canView}
        showEditAction={canEdit}
        showDeleteAction={canDelete}
      />
    </div>
  )
}

// Type imports for the generic
import type { Employee, EmployeeFilter } from '../model/employee.types'
