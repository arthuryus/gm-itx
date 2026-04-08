//import axios from "axios"
import { apiRefresh } from "@/shared/api/client.ts"

export const csrfApi = {
    csrf: () =>
        apiRefresh.get("/csrf-token"),
    /*csrf: () =>
        axios.get("/api/client/csrf-token", {
            withCredentials: true,
        }),*/
}