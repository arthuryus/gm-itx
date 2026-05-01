import {PAGE_PATHS, type TPagePath} from "@/shared/config/page-routes.ts";

type Metadata = {
    h1: string
    title?: string
    description?: string
    keywords?: string
}

export const defaultMetadata = {
    h1: "",
    title: "",
    description: "",
    keywords: "",
}

export const METADATA: Record<string, Metadata> = {
    [PAGE_PATHS.home]: {
        h1: "Рабочий стол",
    },
    [PAGE_PATHS.dashboard]: {
        h1: "Рабочий стол",
    },

    ...createCrudMetadata(PAGE_PATHS.employees, {
        list: {
            h1: "Сотрудники",
        },
        create: {
            h1: "Создать сотрудника",
        },
        update: {
            h1: "Редактировать сотрудника",
        },
        view: {
            h1: "Карточка сотрудника",
        },
    }),
    ...createCrudMetadata(PAGE_PATHS.employeeGroups, {
        list: {
            h1: "Группы сотрудников",
        },
        create: {
            h1: "Создать группу сотрудников",
        },
        update: {
            h1: "Редактировать группу сотрудников",
        },
        view: {
            h1: "Карточка группы сотрудников",
        },
    }),
    ...createCrudMetadata(PAGE_PATHS.employeeRoles, {
        list: {
            h1: "Роли сотрудников",
        },
        create: {
            h1: "Создать роль сотрудников",
        },
        update: {
            h1: "Редактировать роль сотрудников",
        },
        view: {
            h1: "Карточка роли сотрудников",
        },
    }),

    ...createCrudMetadata(PAGE_PATHS.customers, {
        list: {
            h1: "Пользователи",
        },
        create: {
            h1: "Создать пользователя",
        },
        update: {
            h1: "Редактировать пользователя",
        },
        view: {
            h1: "Карточка пользователя",
        },
    }),
    ...createCrudMetadata(PAGE_PATHS.customerGroups, {
        list: {
            h1: "Группы пользователей",
        },
        create: {
            h1: "Создать группу пользователей",
        },
        update: {
            h1: "Редактировать группу пользователей",
        },
        view: {
            h1: "Карточка группы пользователей",
        },
    }),
    ...createCrudMetadata(PAGE_PATHS.customerRoles, {
        list: {
            h1: "Роли пользователей",
        },
        create: {
            h1: "Создать роль пользователей",
        },
        update: {
            h1: "Редактировать роль пользователей",
        },
        view: {
            h1: "Карточка роли пользователей",
        },
    }),

    /*[PAGE_PATHS.employeeGroups.someAction]: {
        h1: "Специальное действие",
    },*/

    "/info": {
        h1: "Info",
    },
} as const

function createCrudMetadata<T extends TPagePath>(
    paths: T,
    metadata: {
        list: Metadata
        create: Metadata
        update: Metadata
        view: Metadata
    }
) {
    return {
        [paths.list]: metadata.list,
        [paths.create]: metadata.create,
        [paths.update]: metadata.update,
        [paths.view]: metadata.view,
    } satisfies Record<string, Metadata>
}

export function getMetadata(pathname: string): Metadata {
    const match = Object.keys(METADATA).find((path) => {
        if (path === pathname) return true

        const regex = new RegExp(
            "^" + path.replace(/:\w+/g, "[^/]+") + "$"
        )

        return regex.test(pathname)
    })

    return match ? METADATA[match] : defaultMetadata
}