import { api } from "@/shared/api/client.ts"

export const cameraApi = {
    cameras: () =>
        api.post("/cameras/cameras-list.php")
}