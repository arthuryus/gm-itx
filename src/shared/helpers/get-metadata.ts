import { METADATA } from "@/shared/config/metadata.ts"

export function getMetadata(pathname: string) {
    return METADATA[pathname] || {}
    //return METADATA[pathname as keyof typeof METADATA]?.h1 || ""
}

/*export function getMetadata(pathname: string) {
    const match = Object.keys(METADATA).find(path =>
        pathname.startsWith(path)
    )

    return (match && METADATA[match])// || DEFAULT_METADATA
}*/