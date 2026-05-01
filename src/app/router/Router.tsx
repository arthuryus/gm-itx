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
import EmployeesPage from "@/pages/employee/employees/EmployeesPage.tsx";
import EmployeeCreatePage from "@/pages/employee/employees/EmployeeCreatePage.tsx";
import EmployeeUpdatePage from "@/pages/employee/employees/EmployeeUpdatePage.tsx";
import EmployeeGroupsPage from "@/pages/employee/groups/GroupsPage.tsx";
import EmployeeGroupCreatePage from "@/pages/employee/groups/GroupCreatePage.tsx";
import EmployeeGroupUpdatePage from "@/pages/employee/groups/GroupUpdatePage.tsx";
import EmployeeGroupViewPage from "@/pages/employee/groups/GroupViewPage.tsx";
import EmployeeRolesPage from "@/pages/employee/roles/RolesPage.tsx";
import EmployeeRoleCreatePage from "@/pages/employee/roles/RoleCreatePage.tsx";
import EmployeeRoleUpdatePage from "@/pages/employee/roles/RoleUpdatePage.tsx";
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
                        <AccessRoute permission={PERMISSIONS.PERMISSION_EMPLOYEE_GROUPS}>
                            <EmployeeGroupsPage />
                        </AccessRoute>
                    }
                />
                <Route
                    path={PAGE_PATHS.employeeGroups.create}
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_EMPLOYEE_GROUPS_CREATE}>
                            <EmployeeGroupCreatePage />
                        </AccessRoute>
                    }
                />
                <Route
                    path={PAGE_PATHS.employeeGroups.update}
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_EMPLOYEE_GROUPS_EDIT}>
                            <EmployeeGroupUpdatePage />
                        </AccessRoute>
                    }
                />
                <Route
                    path={PAGE_PATHS.employeeGroups.view}
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_EMPLOYEE_GROUPS_VIEW}>
                            <EmployeeGroupViewPage />
                        </AccessRoute>
                    }
                />

                {/* Employee Roles */}
                <Route
                    path={PAGE_PATHS.employeeRoles.list}
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_EMPLOYEE_ROLES}>
                            <EmployeeRolesPage />
                        </AccessRoute>
                    }
                />
                <Route
                    path={PAGE_PATHS.employeeRoles.create}
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_EMPLOYEE_ROLES_CREATE}>
                            <EmployeeRoleCreatePage />
                        </AccessRoute>
                    }
                />
                <Route
                    path={PAGE_PATHS.employeeRoles.update}
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_EMPLOYEE_ROLES_EDIT}>
                            <EmployeeRoleUpdatePage />
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
