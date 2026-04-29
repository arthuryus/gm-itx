import { Routes, Route } from "react-router-dom";
import { PAGE_PATHS } from '@/shared/config/page-routes'
import { AccessRoute, AUTH_MODES, SETUP_MODES } from "@/app/router/AccessRoute.tsx"
import { PERMISSIONS } from "@/shared/config/permissions.ts"
import EmptyLayout from "@/shared/components/layouts/EmptyLayout.tsx"
import AppLayout from "@/shared/components/layouts/AppLayout.tsx"
import LoginPage from "@/pages/auth/LoginPage.tsx"
import PasswordResetPage from "@/pages/auth/PasswordResetPage.tsx"
import PasswordResetConfirmPage from "@/pages/auth/PasswordResetConfirmPage.tsx"
import SetupPage from "@/pages/auth/SetupPage.tsx"
import SignupPage from "@/pages/auth/SignupPage.tsx"
import DashboardPage from "@/pages/dashboard/DashboardPage.tsx"
import ProfilePage from "@/pages/account/ProfilePage.tsx";
import EmployeesPage from "@/pages/employees/EmployeesPage.tsx";
import EmployeeCreatePage from "@/pages/employees/EmployeeCreatePage.tsx";
import EmployeeUpdatePage from "@/pages/employees/EmployeeUpdatePage.tsx";
import GroupsPage from "@/pages/groups/GroupsPage.tsx";
import GroupCreatePage from "@/pages/groups/GroupCreatePage.tsx";
import GroupUpdatePage from "@/pages/groups/GroupUpdatePage.tsx";
import GroupViewPage from "@/pages/groups/GroupViewPage.tsx";
import RolesPage from "@/pages/roles/RolesPage.tsx";
import RoleCreatePage from "@/pages/roles/RoleCreatePage.tsx";
import RoleUpdatePage from "@/pages/roles/RoleUpdatePage.tsx";
import InfoPage from "@/pages/info/InfoPage.tsx";
import NotFoundPage from "@/pages/errors/NotFoundPage.tsx"
import ForbiddenPage from "@/pages/errors/ForbiddenPage.tsx"
import BadRequestPage from "@/pages/errors/BadRequestPage.tsx"



export function Router() {
    return (
        <Routes>
            <Route
                element={
                    <AccessRoute csrf auth={AUTH_MODES.REQUIRED} setup={SETUP_MODES.GUEST}>
                        <EmptyLayout />
                    </AccessRoute>
                }
            >
                <Route path={PAGE_PATHS.setup} element={<SetupPage />} />
            </Route>
            <Route
                element={
                    <AccessRoute csrf auth={AUTH_MODES.GUEST} setup={SETUP_MODES.REQUIRED}>
                        <EmptyLayout />
                    </AccessRoute>
                }
            >
                <Route path={PAGE_PATHS.login} element={<LoginPage />} />
                <Route path={PAGE_PATHS.passwordReset} element={<PasswordResetPage />} />
                <Route path={PAGE_PATHS.passwordResetConfirm} element={<PasswordResetConfirmPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Route>
            <Route
                element={
                    <AccessRoute csrf auth={AUTH_MODES.REQUIRED} setup={SETUP_MODES.REQUIRED}>
                        <AppLayout />
                    </AccessRoute>
                }
            >
                <Route index element={<DashboardPage />} />
                <Route path={PAGE_PATHS.dashboard} element={<DashboardPage />} />
                <Route path={PAGE_PATHS.profile} element={<ProfilePage />} />

                {/* Employees */}
                <Route
                    path={PAGE_PATHS.employees.list}
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_EMPLOYEES}>
                            <EmployeesPage />
                        </AccessRoute>
                    }
                />
                <Route
                    path={PAGE_PATHS.employees.create}
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_EMPLOYEES_CREATE}>
                            <EmployeeCreatePage />
                        </AccessRoute>
                    }
                />
                <Route
                    path={PAGE_PATHS.employees.update}
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_EMPLOYEES_EDIT}>
                            <EmployeeUpdatePage />
                        </AccessRoute>
                    }
                />

                {/* Employee Groups */}
                <Route
                    path={PAGE_PATHS.employeeGroups.list}
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_GROUPS}>
                            <GroupsPage />
                        </AccessRoute>
                    }
                />
                <Route
                    path={PAGE_PATHS.employeeGroups.create}
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_GROUPS_CREATE}>
                            <GroupCreatePage />
                        </AccessRoute>
                    }
                />
                <Route
                    path={PAGE_PATHS.employeeGroups.update}
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_GROUPS_EDIT}>
                            <GroupUpdatePage />
                        </AccessRoute>
                    }
                />
                <Route
                    path={PAGE_PATHS.employeeGroups.view}
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_GROUPS_VIEW}>
                            <GroupViewPage />
                        </AccessRoute>
                    }
                />

                {/* Employee Roles */}
                <Route
                    path={PAGE_PATHS.employeeRoles.list}
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_ROLES}>
                            <RolesPage />
                        </AccessRoute>
                    }
                />
                <Route
                    path={PAGE_PATHS.employeeRoles.create}
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_ROLES_CREATE}>
                            <RoleCreatePage />
                        </AccessRoute>
                    }
                />
                <Route
                    path={PAGE_PATHS.employeeRoles.update}
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_ROLES_EDIT}>
                            <RoleUpdatePage />
                        </AccessRoute>
                    }
                />
            </Route>
            <Route
                element={
                    <AccessRoute csrf>
                        <EmptyLayout />
                    </AccessRoute>
                }
            >
                <Route path="/info" element={<InfoPage />} />
            </Route>
            <Route element={<EmptyLayout />}>
                <Route path={PAGE_PATHS.badRequest} element={<BadRequestPage />} />
                <Route path={PAGE_PATHS.forbidden} element={<ForbiddenPage />} />
                <Route path={PAGE_PATHS.notFound} element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>

        </Routes>
    )
}
