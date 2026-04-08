type Metadata = {
    h1: string
    title?: string
    description?: string
    keywords?: string
}

export const METADATA: Record<string, Metadata> = {
    "/": {
        h1: "Dashboard",
    },
    "/dashboard": {
        h1: "Dashboard",
    },
    "/documents": {
        h1: "Documents",
    },
    "/cameras": {
        h1: "Cameras",
    },
    "/info": {
        h1: "Info",
    },
} as const