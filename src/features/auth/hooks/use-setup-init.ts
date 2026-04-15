import { useAuthStore } from "@/features/auth/store/auth-store.ts"

export function useSetupInit(enabled: boolean = true) {
    const mustChangeCredentials = useAuthStore((s) => s.user?.mustChangeCredentials ?? false)

    const mustSetup = enabled ? mustChangeCredentials : false

    return { mustSetup }
}
