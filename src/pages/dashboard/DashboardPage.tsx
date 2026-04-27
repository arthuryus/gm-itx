import { useMetadata } from "@/shared/hooks/use-metadata.ts"
//import { PERMISSIONS } from "@/shared/config/permissions.ts";
//import { usePermissions } from "@/features/access/hooks/use-permissions.ts";
//import { useAccess, type AccessProps } from "@/features/access/hooks/use-access.ts"
//import { authApi } from "@/features/auth/api/auth-api.ts"
//import { cameraApi } from "@/features/cameras/api/camera-api.ts"
//import { documentApi } from "@/features/documents/api/document-api.ts"
//import { Button } from "@/shadcn/components/ui/button.tsx"
//import { toast } from "sonner"

export default function DashboardPage() {
    const h1 = useMetadata().h1
    //const { hasPermission, hasPermissionAny, hasPermissionAll } = usePermissions()

    /*
    const doDashboard = async () => {
        authApi.me400()
        documentApi.documents()
        cameraApi.cameras()
    }

    const doDocuments = async () => {
        //await authApi.documents()
    }

    const doCameras = async () => {
        //await authApi.cameras()
    }

    const doMe400 = async () => {
        await authApi.me400()
    }

    const doToast = () => {
        //toast("Hello world!")
        toast.error("Hello world!")
    }
    */

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{h1}</h1>
                <p className="text-muted-foreground">
                    Overview of your business metrics and performance.
                </p>
                {/*<p>
                    <Button onClick={doDashboard}>Dashboard</Button>
                    <Button onClick={doDocuments} disabled={!hasPermissionAny([PERMISSIONS.PERMISSION_DOCUMENTS, PERMISSIONS.PERMISSION_DOCUMENTS_CREATE])}>Documents</Button>
                    <Button onClick={doCameras} disabled={!hasPermission(PERMISSIONS.PERMISSION_CAMERAS)}>Cameras</Button>
                    <Button onClick={doMe400}>Me 400</Button>
                    <Button onClick={doToast} disabled={!hasPermissionAll([PERMISSIONS.PERMISSION_DOCUMENTS, PERMISSIONS.PERMISSION_DOCUMENTS_CREATE])}>Toast</Button>
                    <Button onClick={doToast}>Show Toast</Button>
                </p>
                <p>
                    <Button onClick={doDashboard}>Dashboard</Button>
                    <Button onClick={doDocuments} disabled={!useAccess({permissions: [PERMISSIONS.PERMISSION_DOCUMENTS, PERMISSIONS.PERMISSION_DOCUMENTS_CREATE], requireAll: false})}>Documents</Button>
                    <Button onClick={doCameras} disabled={!useAccess({permission: PERMISSIONS.PERMISSION_CAMERAS})}>Cameras</Button>
                    <Button onClick={doMe400}>Me 400</Button>
                    <Button onClick={doToast} disabled={!useAccess({permissions: [PERMISSIONS.PERMISSION_DOCUMENTS, PERMISSIONS.PERMISSION_DOCUMENTS_CREATE], requireAll: true})}>Toast</Button>
                </p>*/}
            </div>
        </div>
    )
}