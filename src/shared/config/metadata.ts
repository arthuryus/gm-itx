import {PAGE_PATHS} from "@/shared/config/page-routes.ts";

type Metadata = {
    h1: string
    title?: string
    description?: string
    keywords?: string
}

export const METADATA: Record<string, Metadata> = {
    [PAGE_PATHS.home]: {
        h1: "Рабочий стол",
    },
    [PAGE_PATHS.dashboard]: {
        h1: "Рабочий стол",
    },

    "/employees": {
        h1: "Companies",
    },
    "/employees/create": {
        h1: "Create Company",
    },
    "/employees/update/:id": {
        h1: "Edit Company",
    },
    "/employees/view/:id": {
        h1: "Edit Company",
    },

    "/info": {
        h1: "Info",
    },
} as const