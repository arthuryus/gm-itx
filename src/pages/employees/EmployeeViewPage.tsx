import { useParams } from 'react-router-dom'
import { EmployeeView } from '@/features/employees/ui/EmployeeView'

export default function EmployeeViewPage() {
  const { id } = useParams<{ id: string }>()
  const employeeId = id ? parseInt(id, 10) : 0

  if (!employeeId) {
    return <div>Invalid employee ID</div>
  }

  return (
    <div className="container mx-auto py-6">
      <EmployeeView id={employeeId} />
    </div>
  )
}
