import { useParams } from 'react-router-dom'
import { EmployeeUpdate } from '@/features/employees/ui/EmployeeUpdate'

export default function EmployeeUpdatePage() {
  const { id } = useParams<{ id: string }>()
  const employeeId = id ? parseInt(id, 10) : 0

  if (!employeeId) {
    return <div>Invalid employee ID</div>
  }

  return (
    <div className="container mx-auto py-6">
      <EmployeeUpdate id={employeeId} />
    </div>
  )
}
