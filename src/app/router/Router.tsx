import { createBrowserRouter, createRoutesFromElements, Routes, Route } from "react-router-dom";
//import CsrfRoute from "@/app/router/CsrfRoute"
//import AuthRoute from "@/app/router/AuthRoute"
//import ProtectedRoute from "@/app/router/ProtectedRoute"
//import { withPermissionRoute } from "@/app/router/PermissionRoute"
import { AccessRoute } from "@/app/router/AccessRoute"
import { PERMISSIONS } from "@/shared/config/permissions.ts"
import EmptyLayout from "@/shared/components/layouts/EmptyLayout.tsx"
import AppLayout from "@/shared/components/layouts/AppLayout.tsx"
import LoginPage from "@/pages/auth/LoginPage"
import SignupPage from "@/pages/auth/SignupPage"
import PasswordResetPage from "@/pages/auth/PasswordResetPage"
import NotFoundPage from "@/pages/errors/NotFoundPage"
import ForbiddenPage from "@/pages/errors/ForbiddenPage"
import BadRequestPage from "@/pages/errors/BadRequestPage"
import DashboardPage from "@/pages/dashboard/DashboardPage.tsx"
import DocumentsPage from "@/pages/documents/DocumentsPage.tsx";
import CamerasPage from "@/pages/cameras/CamerasPage.tsx";
import InfoPage from "@/pages/info/InfoPage.tsx";


export function Router() {
    return (
        <Routes>
            <Route
                element={
                    <AccessRoute csrf auth="guest">
                        <EmptyLayout />
                    </AccessRoute>
                }
            >
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/password-reset" element={<PasswordResetPage />} />
            </Route>
            <Route
                element={
                    <AccessRoute csrf auth="required">
                        <AppLayout />
                    </AccessRoute>
                }
            >
                <Route index element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
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
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="/403" element={<ForbiddenPage />} />
                <Route path="/400" element={<BadRequestPage />} />
            </Route>

        </Routes>
    )
}
/*export const Router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                element={
                    <CsrfRoute>
                        <AuthRoute>
                            <EmptyLayout />
                        </AuthRoute>
                    </CsrfRoute>
                }
            >
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/password-reset" element={<PasswordResetPage />} />
            </Route>
            <Route
                element={
                    <CsrfRoute>
                        <ProtectedRoute>
                            <AppLayout />
                        </ProtectedRoute>
                    </CsrfRoute>
                }
            >
                <Route index element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route
                    path="/documents"
                    element={withPermissionRoute(<DocumentsPage />, {permission: PERMISSIONS.PERMISSION_DOCUMENTS})}
                />
                <Route
                    path="/cameras"
                    element={withPermissionRoute(<CamerasPage />, {permission: PERMISSIONS.PERMISSION_CAMERAS})}
                />

            </Route>
            <Route
                element={
                    <EmptyLayout />
                }
            >
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="/403" element={<ForbiddenPage />} />
                <Route path="/400" element={<BadRequestPage />} />
            </Route>
        </>
    )
)*/

/*
{/* =========================
                PUBLIC / SPECIAL FORMS
            ========================= * /}
<Route
    element={
        <AccessRoute csrf>
            <EmptyLayout />
        </AccessRoute>
    }
>
    <Route path="/some-form-page" element={<SmeFormPage />} />
</Route>

<Route
    //path="/"
    element={
        <CsrfRoute>
            <EmptyLayout />
        </CsrfRoute>
    }
>
    <Route path="/some-form-page" element={<SmeFormPage />} />
</Route>
*/