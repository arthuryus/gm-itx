import { Outlet } from "react-router-dom"

export default function EmptyLayout() {
    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-background bg---gray-50">
            <Outlet />
        </div>
    )
}