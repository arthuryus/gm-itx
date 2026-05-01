import {useEffect} from "react";
import { useLocation } from "react-router-dom"
import {APP} from "@/shared/config/main.ts";
import {getMetadata} from "@/shared/config/metadata.ts";

export function useMetadata() {
    const location = useLocation()
    const metadata = getMetadata(location.pathname)

    useEffect(() => {
        const base = metadata.title || metadata.h1
        document.title = base ? `${base} — ${APP.NAME}` : APP.NAME
    }, [metadata])

    return metadata
}

/*<Route
    path="/employees"
    element={<EmployeesPage />}
    handle={{ h1: "Сотрудники" }}
/>
useMatches()
*/