export type TPagePaths = typeof PAGE_PATHS
export const PAGE_PATHS = {
    employees: {
        list: '/employees',
        create: '/employees/create',
        update: '/employees/update/:id',
        view: '/employees/:id',
    },

    employeeGroups: {
        list: '/groups',
        create: '/groups/create',
        update: '/groups/update/:id',
        view: '/groups/:id',
    },

    employeeRoles: {
        list: '/roles',
        create: '/roles/create',
        update: '/roles/update/:id',
        view: '/roles/:id',
    },
} as const


export type TPageUrls = typeof PAGE_URLS
export const PAGE_URLS = {
    employees: {
        list: () => PAGE_PATHS.employees.list,
        create: () => PAGE_PATHS.employees.create,
        update: (id: string | number) => PAGE_PATHS.employees.update.replace(':id', String(id)),
        view: (id: string | number) => PAGE_PATHS.employees.view.replace(':id', String(id)),
    },

    employeeGroups: {
        list: () => PAGE_PATHS.employeeGroups.list,
        create: () => PAGE_PATHS.employeeGroups.create,
        update: (id: string | number) => PAGE_PATHS.employeeGroups.update.replace(':id', String(id)),
        view: (id: string | number) => PAGE_PATHS.employeeGroups.view.replace(':id', String(id)),
    },

    employeeRoles: {
        list: () => PAGE_PATHS.employeeRoles.list,
        create: () => PAGE_PATHS.employeeRoles.create,
        update: (id: string | number) => PAGE_PATHS.employeeRoles.update.replace(':id', String(id)),
        view: (id: string | number) => PAGE_PATHS.employeeRoles.view.replace(':id', String(id)),
    },
} as const
