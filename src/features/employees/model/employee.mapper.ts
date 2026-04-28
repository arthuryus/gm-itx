import type {TEmployee, TEmployeeFormData} from "./employee.types.ts";

export function mapEmployeeApiToForm(
    data: TEmployee,
): TEmployeeFormData {
    return {
        ...data,
        memberships: data.memberships.map((membership) => ({
            groupId: String(membership.groupId),
            roleIds: membership.roles.map((role) => role.id),
        }))
    }
}