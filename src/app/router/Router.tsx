import { Routes, Route } from "react-router-dom";//createBrowserRouter, createRoutesFromElements,
//import CsrfRoute from "@/app/router/CsrfRoute"
//import AuthRoute from "@/app/router/AuthRoute"
//import ProtectedRoute from "@/app/router/ProtectedRoute"
//import { withPermissionRoute } from "@/app/router/PermissionRoute"
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
//import DocumentsPage from "@/pages/documents/DocumentsPage.tsx";
//import CamerasPage from "@/pages/cameras/CamerasPage.tsx";
import EmployeesPage from "@/pages/employees/EmployeesPage.tsx";
import EmployeeCreatePage from "@/pages/employees/EmployeeCreatePage.tsx";
import EmployeeUpdatePage from "@/pages/employees/EmployeeUpdatePage.tsx";
//import EmployeeViewPage from "@/pages/employees/EmployeeViewPage.tsx";
import GroupsPage from "@/pages/groups/GroupsPage.tsx";
import GroupCreatePage from "@/pages/groups/GroupCreatePage.tsx";
import GroupUpdatePage from "@/pages/groups/GroupUpdatePage.tsx";
import GroupViewPage from "@/pages/groups/GroupViewPage.tsx";
import RolesPage from "@/pages/roles/RolesPage.tsx";
import RoleCreatePage from "@/pages/roles/RoleCreatePage.tsx";
import RoleUpdatePage from "@/pages/roles/RoleUpdatePage.tsx";
//import RoleViewPage from "@/pages/roles/RoleViewPage.tsx";

//import CompaniesPage from "@/pages/companies/CompaniesPage.tsx";
//import CompanyViewPage from "@/pages/companies/CompanyViewPage.tsx";
//import CompanyCreatePage from "@/pages/companies/CompanyCreatePage.tsx";
//import CompanyUpdatePage from "@/pages/companies/CompanyUpdatePage.tsx";
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
                <Route path="/setup" element={<SetupPage />} />
            </Route>
            <Route
                element={
                    <AccessRoute csrf auth={AUTH_MODES.GUEST} setup={SETUP_MODES.REQUIRED}>
                        <EmptyLayout />
                    </AccessRoute>
                }
            >
                <Route path="/login" element={<LoginPage />} />
                <Route path="/password-reset" element={<PasswordResetPage />} />
                <Route path="/password-reset-confirm" element={<PasswordResetConfirmPage />} />
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
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />

                {/* Employees Routes */}
                <Route
                    path="/employees"
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_EMPLOYEES}>
                            <EmployeesPage />
                        </AccessRoute>
                    }
                />
                <Route
                    path="/employees/create"
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_EMPLOYEES_CREATE}>
                            <EmployeeCreatePage />
                        </AccessRoute>
                    }
                />
                <Route
                    path="/employees/update/:id"
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_EMPLOYEES_EDIT}>
                            <EmployeeUpdatePage />
                        </AccessRoute>
                    }
                />
                {/*<Route
                    path="/employees/:id"
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_EMPLOYEES_VIEW}>
                            <EmployeeViewPage />
                        </AccessRoute>
                    }
                />*/}

                {/* Groups Routes */}
                <Route
                    path="/groups"
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_GROUPS}>
                            <GroupsPage />
                        </AccessRoute>
                    }
                />
                <Route
                    path="/groups/create"
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_GROUPS_CREATE}>
                        <GroupCreatePage />
                        </AccessRoute>
                    }
                />
                <Route
                    path="/groups/update/:id"
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_GROUPS_EDIT}>
                            <GroupUpdatePage />
                        </AccessRoute>
                    }
                />
                <Route
                    path="/groups/:id"
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_GROUPS_VIEW}>
                            <GroupViewPage />
                        </AccessRoute>
                    }
                />

                {/* Roles Routes */}
                <Route
                    path="/roles"
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_ROLES}>
                            <RolesPage />
                        </AccessRoute>
                    }
                />
                <Route
                    path="/roles/create"
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_ROLES_CREATE}>
                            <RoleCreatePage />
                        </AccessRoute>
                    }
                />
                <Route
                    path="/roles/update/:id"
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_ROLES_EDIT}>
                            <RoleUpdatePage />
                        </AccessRoute>
                    }
                />
                {/*<Route
                    path="/roles/:id"
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_ROLES_VIEW}>
                            <RoleViewPage />
                        </AccessRoute>
                    }
                />*/}


                {/* Companies Routes
                <Route
                    path="/companies"
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_COMPANIES}>
                            <CompaniesPage />
                        </AccessRoute>
                    }
                />
                <Route
                    path="/companies/create"
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_COMPANIES_CREATE}>
                            <CompanyCreatePage />
                        </AccessRoute>
                    }
                />
                <Route
                    path="/companies/:id"
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_COMPANIES_VIEW}>
                            <CompanyViewPage />
                        </AccessRoute>
                    }
                />
                <Route
                    path="/companies/update/:id"
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_COMPANIES_EDIT}>
                            <CompanyUpdatePage />
                        </AccessRoute>
                    }
                /> */}

                {/* Documents and Cameras Routes
                <Route
                    path="/documents"
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_DOCUMENTS}>
                            <DocumentsPage />
                        </AccessRoute>
                    }
                />
                <Route
                    path="/cameras"
                    element={
                        <AccessRoute permission={PERMISSIONS.PERMISSION_CAMERAS}>
                            <CamerasPage />
                        </AccessRoute>
                    }
                /> */}
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
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="/403" element={<ForbiddenPage />} />
                <Route path="/400" element={<BadRequestPage />} />
            </Route>

        </Routes>
    )
}
