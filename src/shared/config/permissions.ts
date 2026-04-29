export const PERMISSIONS = {
    // Employee permissions
    PERMISSION_EMPLOYEES: 'permission_employees',
    PERMISSION_EMPLOYEES_CREATE: 'permission_employees_create',
    PERMISSION_EMPLOYEES_EDIT: 'permission_employees_edit',
    PERMISSION_EMPLOYEES_DELETE: 'permission_employees_delete',
    PERMISSION_EMPLOYEES_VIEW: 'permission_employees_view',

    // Group permissions
    PERMISSION_GROUPS: 'permission_groups',
    PERMISSION_GROUPS_CREATE: 'permission_groups_create',
    PERMISSION_GROUPS_EDIT: 'permission_groups_edit',
    PERMISSION_GROUPS_DELETE: 'permission_groups_delete',
    PERMISSION_GROUPS_VIEW: 'permission_groups_view',

    // Role permissions
    PERMISSION_ROLES: 'permission_roles',
    PERMISSION_ROLES_CREATE: 'permission_roles_create',
    PERMISSION_ROLES_EDIT: 'permission_roles_edit',
    PERMISSION_ROLES_DELETE: 'permission_roles_delete',
    PERMISSION_ROLES_VIEW: 'permission_roles_view',

    // Company permissions
    PERMISSION_COMPANIES: 'permission_companies',
    PERMISSION_COMPANIES_CREATE: 'permission_companies_create',
    PERMISSION_COMPANIES_EDIT: 'permission_companies_edit',
    PERMISSION_COMPANIES_DELETE: 'permission_companies_delete',
    PERMISSION_COMPANIES_VIEW: 'permission_companies_view',

    // Document permissions
    PERMISSION_DOCUMENTS: 'permission_documents',
    PERMISSION_DOCUMENTS_CREATE: 'permission_documents_create',
    PERMISSION_DOCUMENTS_EDIT: 'permission_documents_edit',
    PERMISSION_DOCUMENTS_DELETE: 'permission_documents_delete',
    PERMISSION_DOCUMENTS_VIEW: 'permission_documents_view',

    // Camera permissions
    PERMISSION_CAMERAS: 'permission_cameras',
    PERMISSION_CAMERAS_CREATE: 'permission_cameras_create',
    PERMISSION_CAMERAS_EDIT: 'permission_cameras_edit',
    PERMISSION_CAMERAS_DELETE: 'permission_cameras_delete',
    PERMISSION_CAMERAS_VIEW: 'permission_cameras_view',
    PERMISSION_CAMERAS_LIVE: 'permission_cameras_live',

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
} as const

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS]

export const ROLES = {
    ADMIN: 'Admin',
    MANAGER: 'Manager',
    OPERATOR: 'Operator',
    USER: 'User',
    VIEWER: 'Viewer',
} as const

export type Role = typeof ROLES[keyof typeof ROLES]

// Permission groups for easier checking
export const PERMISSION_GROUPS = {
    DOCUMENTS: [
        PERMISSIONS.PERMISSION_DOCUMENTS,
        PERMISSIONS.PERMISSION_DOCUMENTS_CREATE,
        PERMISSIONS.PERMISSION_DOCUMENTS_EDIT,
        PERMISSIONS.PERMISSION_DOCUMENTS_DELETE,
        PERMISSIONS.PERMISSION_DOCUMENTS_VIEW,
    ],
    CAMERAS: [
        PERMISSIONS.PERMISSION_CAMERAS,
        PERMISSIONS.PERMISSION_CAMERAS_CREATE,
        PERMISSIONS.PERMISSION_CAMERAS_EDIT,
        PERMISSIONS.PERMISSION_CAMERAS_DELETE,
        PERMISSIONS.PERMISSION_CAMERAS_VIEW,
        PERMISSIONS.PERMISSION_CAMERAS_LIVE,
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
