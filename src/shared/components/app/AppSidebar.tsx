import React from "react";
import { Link, useLocation } from "react-router-dom"
import { APP, SIDEBAR } from "@/shared/config/main.ts";
import { authApi } from "@/features/auth/api/auth-api.ts"
import { useAuthStore } from "@/features/auth/store/auth-store.ts";
import { PERMISSIONS } from "@/shared/config/permissions.ts";
import { PermissionGuard } from "@/features/access/ui/PermissionGuard.tsx";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar
} from "@/shadcn/components/ui/sidebar.tsx"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu.tsx"
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/components/ui/avatar.tsx"
import { Separator } from "@/shadcn/components/ui/separator.tsx"
import {
    ChevronUp,
    Home,
    Settings,
    HelpCircle,
    Search,
    MoreHorizontal,
    MoreVertical,
    Calendar,
    Package,
    Users,
    BarChart3,
    FolderOpen,
    FileText,
    MessageSquare,
    User,
    LogOut,
    Camera
} from "lucide-react"
import {handlerError} from "@/shared/api/error/handler-error.ts";
//import { toast } from "@/components/ui/use-toast"

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const location = useLocation()
    const user = useAuthStore((s) => s.user)
    const logout = useAuthStore((s) => s.logout)

    const handleLogout = async () => {
        try {
            await authApi.logout()
            logout()
        } catch (error) {
            console.log("Invalid refresh token", error)
            //handlerError(error)
        }
    }

    const doMe = async () => {
        await authApi.me()
    }

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link to="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Package className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{APP.NAME}</span>
                                    <span className="truncate text-xs">{APP.DESCRIPTION}</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <Separator />

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton isActive={["/", "/dashboard"].includes(location.pathname)} asChild>
                                    <Link to="/dashboard"><Home /> Dashboard</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <PermissionGuard permission={PERMISSIONS.PERMISSION_DOCUMENTS}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton isActive={location.pathname === "/documents"} asChild>
                                        <Link to="/documents"><FileText /> Documents</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </PermissionGuard>
                            <PermissionGuard permission={PERMISSIONS.PERMISSION_CAMERAS}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton isActive={location.pathname === "/cameras"} asChild>
                                        <Link to="/cameras"><Camera /> Cameras</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </PermissionGuard>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup className="mt-auto">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <Search />
                                Search
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <HelpCircle />
                                Get Help
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <Settings />
                                Settings
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <MoreHorizontal />
                            More
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={handleLogout}>
                            <LogOut />
                            Logout
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg">
                                    <div className="flex items-center justify-center size-8 aspect-square rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        {user?.avatar
                                            ?
                                            <Avatar className="rounded-lg">
                                                <AvatarImage
                                                    src={user?.avatar}
                                                    alt="User"
                                                    className="rounded-lg grayscale"
                                                />
                                                <AvatarFallback className="bg-primary text-primary-foreground rounded-lg">CN</AvatarFallback>
                                            </Avatar>
                                            : <User className="size-4" />
                                        }
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">{user?.firstName} {user?.lastName}</span>
                                        <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
                                    </div>
                                    <MoreVertical className="size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" sideOffset={-48} align="end" alignOffset={-256} className="w-64">

                                <DropdownMenuLabel className="flex items-center gap-2">
                                    <div className="flex items-center justify-center size-8 aspect-square rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        <Avatar className="rounded-lg" onClick={doMe}>
                                            <AvatarImage
                                                src={user?.avatar}
                                                alt="User"
                                                className="rounded-lg"
                                            />
                                            <AvatarFallback className="bg-primary text-primary-foreground rounded-lg">CN</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{user?.fio}</span>
                                        <span className="text-xs text-muted-foreground">{user?.email}</span>
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem>
                                    <Settings className="size-4" />
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="size-4" />
                                    Update Account
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="size-4" />
                                    Update Profile
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                    className="text-red-500 focus:text-red-500"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="size-4" />
                                    Logout
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
