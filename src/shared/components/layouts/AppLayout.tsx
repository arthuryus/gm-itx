import React from "react"
import { Outlet } from "react-router-dom"
import Cookies from "js-cookie"
import { SIDEBAR } from "@/shared/config/main.ts"
import { SidebarProvider, SidebarInset } from "@/shadcn/components/ui/sidebar.tsx"
import AppSidebar from "@/shared/components/app/AppSidebar.tsx"
import AppHeader from "@/shared/components/app/AppHeader.tsx"

export default function AppLayout() {
    const defaultOpen = Cookies.get(SIDEBAR.COOKIE_NAME) !== "false"
    
    return (
        <SidebarProvider
            defaultOpen={defaultOpen}
            style={
                {
                    "--sidebar-width": SIDEBAR.WIDTH,
                    "--sidebar-width-mobile": SIDEBAR.WIDTH_MOBILE,
                    "--sidebar-width-icon": SIDEBAR.WIDTH_ICON,
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" collapsible="icon" />
            <SidebarInset>
                <AppHeader />
                <div className="f---lex flex---1 flex---col c---ontainer mx---auto p-4 pt-0">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
