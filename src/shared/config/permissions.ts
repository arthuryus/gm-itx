export const PERMISSIONS = {
    // Employee permissions
    PERMISSION_EMPLOYEES: 'permission_employees',
    PERMISSION_EMPLOYEES_CREATE: 'permission_employees_create',
    PERMISSION_EMPLOYEES_EDIT: 'permission_employees_edit',
    PERMISSION_EMPLOYEES_DELETE: 'permission_employees_delete',
    PERMISSION_EMPLOYEES_VIEW: 'permission_employees_view',

    // Employee Group permissions
    PERMISSION_EMPLOYEE_GROUPS: 'permission_employee_groups',
    PERMISSION_EMPLOYEE_GROUPS_CREATE: 'permission_employee_groups_create',
    PERMISSION_EMPLOYEE_GROUPS_EDIT: 'permission_employee_groups_edit',
    PERMISSION_EMPLOYEE_GROUPS_DELETE: 'permission_employee_groups_delete',
    PERMISSION_EMPLOYEE_GROUPS_VIEW: 'permission_employee_groups_view',

    // Employee Role permissions
    PERMISSION_EMPLOYEE_ROLES: 'permission_employee_roles',
    PERMISSION_EMPLOYEE_ROLES_CREATE: 'permission_employee_roles_create',
    PERMISSION_EMPLOYEE_ROLES_EDIT: 'permission_employee_roles_edit',
    PERMISSION_EMPLOYEE_ROLES_DELETE: 'permission_employee_roles_delete',
    PERMISSION_EMPLOYEE_ROLES_VIEW: 'permission_employee_roles_view',

    // Customer permissions
    PERMISSION_CUSTOMERS: 'permission_customers',
    PERMISSION_CUSTOMERS_CREATE: 'permission_customers_create',
    PERMISSION_CUSTOMERS_EDIT: 'permission_customers_edit',
    PERMISSION_CUSTOMERS_DELETE: 'permission_customers_delete',
    PERMISSION_CUSTOMERS_VIEW: 'permission_customers_view',

    // Customer Group permissions
    PERMISSION_CUSTOMER_GROUPS: 'permission_customer_groups',
    PERMISSION_CUSTOMER_GROUPS_CREATE: 'permission_customer_groups_create',
    PERMISSION_CUSTOMER_GROUPS_EDIT: 'permission_customer_groups_edit',
    PERMISSION_CUSTOMER_GROUPS_DELETE: 'permission_customer_groups_delete',
    PERMISSION_CUSTOMER_GROUPS_VIEW: 'permission_customer_groups_view',

    // Customer Role permissions
    PERMISSION_CUSTOMER_ROLES: 'permission_customer_roles',
    PERMISSION_CUSTOMER_ROLES_CREATE: 'permission_customer_roles_create',
    PERMISSION_CUSTOMER_ROLES_EDIT: 'permission_customer_roles_edit',
    PERMISSION_CUSTOMER_ROLES_DELETE: 'permission_customer_roles_delete',
    PERMISSION_CUSTOMER_ROLES_VIEW: 'permission_customer_roles_view',


    /*
    // User management permissions
    PERMISSION_USERS: 'permission_users',
    PERMISSION_USERS_CREATE: 'permission_users_create',
    PERMISSION_USERS_EDIT: 'permission_users_edit',
    PERMISSION_USERS_DELETE: 'permission_users_delete',
    PERMISSION_USERS_VIEW: 'permission_users_view',

    // System permissions
    PERMISSION_SYSTEM_SETTINGS: 'permission_system_settings',
    PERMISSION_SYSTEM_LOGS: 'permission_system_logs',
    PERMISSION_SYSTEM_BACKUP: 'permission_system_backup',

    // Analytics permissions
    PERMISSION_ANALYTICS: 'permission_analytics',
    PERMISSION_ANALYTICS_VIEW: 'permission_analytics_view',
    PERMISSION_ANALYTICS_EXPORT: 'permission_analytics_export',

    // Reports permissions
    PERMISSION_REPORTS: 'permission_reports',
    PERMISSION_REPORTS_CREATE: 'permission_reports_create',
    PERMISSION_REPORTS_VIEW: 'permission_reports_view',
    PERMISSION_REPORTS_EXPORT: 'permission_reports_export',
    */
} as const

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS]


export const ROLES = {
    SUPER_ADMIN: 'EMP_ROLE_SUPER_ADMIN',
    DEVELOPER: 'EMP_ROLE_DEVELOPER',
    TESTER: 'EMP_ROLE_TESTER',

    /*ADMIN: 'Admin',
    MANAGER: 'Manager',
    OPERATOR: 'Operator',
    USER: 'User',
    VIEWER: 'Viewer',*/
} as const

export type Role = typeof ROLES[keyof typeof ROLES]
/*
// Permission groups for easier checking
export const PERMISSION_GROUPS = {
    EMPLOYEES: [
        PERMISSIONS.PERMISSION_EMPLOYEES,
        PERMISSIONS.PERMISSION_EMPLOYEES_CREATE,
        PERMISSIONS.PERMISSION_EMPLOYEES_EDIT,
        PERMISSIONS.PERMISSION_EMPLOYEES_DELETE,
        PERMISSIONS.PERMISSION_EMPLOYEES_VIEW,
    ],
    EMPLOYEE_GROUPS: [
        PERMISSIONS.PERMISSION_EMPLOYEE_GROUPS,
        PERMISSIONS.PERMISSION_EMPLOYEE_GROUPS_CREATE,
        PERMISSIONS.PERMISSION_EMPLOYEE_GROUPS_EDIT,
        PERMISSIONS.PERMISSION_EMPLOYEE_GROUPS_DELETE,
        PERMISSIONS.PERMISSION_EMPLOYEE_GROUPS_VIEW,
    ],
    EMPLOYEE_ROLES: [
        PERMISSIONS.PERMISSION_EMPLOYEE_ROLES,
        PERMISSIONS.PERMISSION_EMPLOYEE_ROLES_CREATE,
        PERMISSIONS.PERMISSION_EMPLOYEE_ROLES_EDIT,
        PERMISSIONS.PERMISSION_EMPLOYEE_ROLES_DELETE,
        PERMISSIONS.PERMISSION_EMPLOYEE_ROLES_VIEW,
    ],


    USERS: [
        PERMISSIONS.PERMISSION_USERS,
        PERMISSIONS.PERMISSION_USERS_CREATE,
        PERMISSIONS.PERMISSION_USERS_EDIT,
        PERMISSIONS.PERMISSION_USERS_DELETE,
        PERMISSIONS.PERMISSION_USERS_VIEW,
    ],
    SYSTEM: [
        PERMISSIONS.PERMISSION_SYSTEM_SETTINGS,
        PERMISSIONS.PERMISSION_SYSTEM_LOGS,
        PERMISSIONS.PERMISSION_SYSTEM_BACKUP,
    ],
    ANALYTICS: [
        PERMISSIONS.PERMISSION_ANALYTICS,
        PERMISSIONS.PERMISSION_ANALYTICS_VIEW,
        PERMISSIONS.PERMISSION_ANALYTICS_EXPORT,
    ],
    REPORTS: [
        PERMISSIONS.PERMISSION_REPORTS,
        PERMISSIONS.PERMISSION_REPORTS_CREATE,
        PERMISSIONS.PERMISSION_REPORTS_VIEW,
        PERMISSIONS.PERMISSION_REPORTS_EXPORT,
    ],
} as const
*/