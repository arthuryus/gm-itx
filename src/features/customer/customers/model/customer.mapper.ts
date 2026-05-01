import type {TCustomer, TCustomerFormData} from "./customer.types.ts";

export function mapCustomerApiToForm(
    data: TCustomer,
): TCustomerFormData {
    return {
        ...data,
        memberships: data.memberships.map((membership) => ({
            groupId: String(membership.groupId),
            roleIds: membership.roles.map((role) => String(role.id)),
        }))
    }
}