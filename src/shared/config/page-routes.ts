export type TPagePaths = typeof PAGE_PATHS
export const PAGE_PATHS = {
    home: '/',
    dashboard: '/dashboard',

    badRequest: '/400',
    forbidden: '/403',
    notFound: '/404',

    setup: '/setup',
    login: '/login',
    logout: '/logout',
    passwordReset: '/password-reset',
    passwordResetConfirm: '/password-reset-confirm',

    profile: '/profile',
    settings: '/settings',

    employees: {
        list: '/employees',
        create: '/employees/create',
        update: '/employees/update/:id',
        view: '/employees/:id',
    },
    employeeGroups: {
        list: '/employee-groups',
        create: '/employee-groups/create',
        update: '/employee-groups/update/:id',
        view: '/employee-groups/:id',
    },
    employeeRoles: {
        list: '/employee-roles',
        create: '/employee-roles/create',
        update: '/employee-roles/update/:id',
        view: '/employee-roles/:id',
    },

    customers: {
        list: '/customers',
        create: '/customers/create',
        update: '/customers/update/:id',
        view: '/customers/:id',
    },
    customerGroups: {
        list: '/customer-groups',
        create: '/customer-groups/create',
        update: '/customer-groups/update/:id',
        view: '/customer-groups/:id',
    },
    customerRoles: {
        list: '/customer-roles',
        create: '/customer-roles/create',
        update: '/customer-roles/update/:id',
        view: '/customer-roles/:id',
    },
} as const


export type TPageUrls = typeof PAGE_URLS
export const PAGE_URLS = {
    home: () => PAGE_PATHS.home,
    dashboard: () => PAGE_PATHS.dashboard,

    badRequest: () => PAGE_PATHS.badRequest,
    forbidden: () => PAGE_PATHS.forbidden,
    notFound: () => PAGE_PATHS.notFound,

    setup: () => PAGE_PATHS.setup,
    login: () => PAGE_PATHS.login,
    logout: () => PAGE_PATHS.logout,
    passwordReset: () => PAGE_PATHS.passwordReset,
    passwordResetConfirm: () => PAGE_PATHS.passwordResetConfirm,

    profile: () => PAGE_PATHS.profile,
    settings: () => PAGE_PATHS.settings,

    employees: createCrudUrls(PAGE_PATHS.employees),
    employeeGroups: createCrudUrls(PAGE_PATHS.employeeGroups),
    employeeRoles: createCrudUrls(PAGE_PATHS.employeeRoles),

    customers: createCrudUrls(PAGE_PATHS.customers),
    customerGroups: createCrudUrls(PAGE_PATHS.customerGroups),
    customerRoles: createCrudUrls(PAGE_PATHS.customerRoles),
} as const


export type TPagePath = {
    list: string
    create: string
    update: string
    view: string
}
function createCrudUrls<T extends TPagePath>(paths: T) {
    return {
        list: () => paths.list,
        create: () => paths.create,
        update: (id: string | number) => paths.update.replace(':id', String(id)),
        view: (id: string | number) => paths.view.replace(':id', String(id)),
    }
}
/* Custom example
employeeRoles: {
    ...createCrudUrls(PAGE_PATHS.employeeRoles),
    someAction: (id: string | number) => PAGE_PATHS.employeeRoles.someAction.replace(':id', String(id)),
},*/
