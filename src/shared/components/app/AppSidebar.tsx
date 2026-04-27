import React from "react";
import { Link, useLocation } from "react-router-dom"
import { APP, SIDEBAR } from "@/shared/config/main.ts";
import { authApi } from "@/features/auth/api/auth-api.ts"
import { useAuthStore } from "@/features/auth/store/auth-store.ts";
import { PERMISSIONS } from "@/shared/config/permissions.ts";
import { AccessGuard } from "@/features/access/ui/AccessGuard.tsx";
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
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/shadcn/components/ui/collapsible';
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
    LayoutDashboard,
    Camera,
    Video,
    Bell,
    Building2,
    FileText,
    Activity,
    Search,
    ShieldCheck,
    VolumeX,
    //Settings,
    Users,

    Home,
    //Building2,
    //Camera,
    HelpCircle,
    //Search,
    MoreHorizontal,
    MoreVertical,
    Package,
    //FileText,

    User,
    Settings,
    Shield,
    LogOut,

    ChevronRight
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

    const userFullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ")

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
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton isActive={["/", "/dashboard"].includes(location.pathname)} asChild>
                                    <Link to="/dashboard"><LayoutDashboard /> Рабочий стол</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {/*<SidebarMenuItem>
                                <SidebarMenuButton isActive={location.pathname.startsWith("/events")} asChild>
                                    <Link to="/events"><Bell /> События</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton isActive={location.pathname.startsWith("/objects")} asChild>
                                    <Link to="/objects"><Building2 /> Объекты</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>*/}
                            <AccessGuard permissions={[PERMISSIONS.PERMISSION_EMPLOYEES, PERMISSIONS.PERMISSION_GROUPS]}>
                                <Collapsible
                                    defaultOpen={location.pathname.startsWith("/employees") || location.pathname.startsWith("/groups")}
                                    className="group/collapsible"
                                    asChild
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton isActive={location.pathname.startsWith("/employees") || location.pathname.startsWith("/groups")}>
                                                <Users />
                                                <span>Сотрудники</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                <AccessGuard permission={PERMISSIONS.PERMISSION_EMPLOYEES}>
                                                    <SidebarMenuSubItem>
                                                        <SidebarMenuSubButton isActive={location.pathname.startsWith("/employees")} asChild>
                                                            <Link to="/employees"><Users /> Сотрудники</Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                </AccessGuard>
                                                <AccessGuard permission={PERMISSIONS.PERMISSION_GROUPS}>
                                                    <SidebarMenuSubItem>
                                                        <SidebarMenuSubButton isActive={location.pathname.startsWith("/groups")} asChild>
                                                            <Link to="/groups"><Users /> Группы</Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                </AccessGuard>
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            </AccessGuard>

                            {/*<AccessGuard permission={PERMISSIONS.PERMISSION_DOCUMENTS}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton isActive={location.pathname === "/documents"} asChild>
                                        <Link to="/documents"><FileText /> Documents</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </AccessGuard>
                            <AccessGuard permission={PERMISSIONS.PERMISSION_CAMERAS}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton isActive={location.pathname === "/cameras"} asChild>
                                        <Link to="/cameras"><Camera /> Cameras</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </AccessGuard>
                            <AccessGuard permission={PERMISSIONS.PERMISSION_COMPANIES}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton isActive={location.pathname.startsWith("/companies")} asChild>
                                        <Link to="/companies"><Building2 /> Companies</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </AccessGuard>*/}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup className="mt-auto">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton isActive={location.pathname.startsWith("/settings")} asChild>
                                <Link to="/settings"><Settings /> Настройки</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg" className="cursor-pointer">
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
                                        <span className="truncate font-medium">{userFullName}</span>
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
                                        <span className="text-sm font-medium">{userFullName}</span>
                                        <span className="text-xs text-muted-foreground">{user?.email}</span>
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem asChild>
                                    <Link to="/profile"><User className="size-4" /> Мой профиль</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/settings"><Settings className="size-4" /> Настройки</Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={handleLogout}>
                                    <LogOut className="size-4" />
                                    Выйти
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
