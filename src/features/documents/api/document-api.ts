import { api } from "@/shared/api/client.ts"

export const documentApi = {
    documents: () =>
        api.post("/documents/documents-list.php"),
}