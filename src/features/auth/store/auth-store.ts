import { create } from "zustand"
import type { Role, Permission } from "@/shared/config/permissions.ts"

type User = {
    id: number
    email: string
    firstName: string
    lastName: string
    avatar: string
    active: boolean
    mustChangeCredentials?: boolean
    companies: number[]
}

type Authorities = {
    roles: Role[]
    permissions: Permission[]
}

type AuthResponse = {
    user: User
    authorities: Authorities
}

type AuthState = {
    isAuthenticated: boolean
    user: User | null
    authorities: Authorities | null

    login: (authResponse: AuthResponse) => void
    logout: () => void

    setUser: (user: User | null) => void
    updateUser: (partial: Partial<User>) => void
    clearUser: () => void

    mustSetup: (setup: boolean) => void

    setAuthorities: (authorities: Authorities | null) => void
    clearAuthorities: () => void

    setAuthenticated: (isAuthenticated: boolean) => void
    clearAuthenticated: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    authorities: null,

    login: (authResponse) => {
        console.log('useAuthStore Login', authResponse)
        set({
            isAuthenticated: true,
            user: authResponse.user,
            authorities: authResponse.authorities,
        })
    },
    logout: () => {
        set({
            isAuthenticated: false,
            user: null,
            authorities: null,
        })
    },

    setUser: (user) => {
        set({
            user,
        })
    },
    updateUser: (partial: Partial<User>) => {
        set((state) => ({
            user: state.user
                ? {
                    ...state.user,
                    ...partial,
                }
                : null,
        }))
    },
    clearUser: () => {
        set({
            user: null,
        })
    },

    mustSetup: (setup) => {
        set((state) => ({
            user: state.user
                ? {
                    ...state.user,
                    mustChangeCredentials: setup,
                }
                : null,
        }))
    },

    setAuthorities: (authorities) => {
        set({
            authorities,
        })
    },
    clearAuthorities: () => {
        set({
            authorities: null,
        })
    },

    setAuthenticated: (isAuthenticated) => {
        set({
            isAuthenticated,
        })
    },
    clearAuthenticated: () => {
        set({
            isAuthenticated: false,
        })
    },
}))

//export const useGetSetup = () => useAuthStore((s) => s.user?.mustChangeCredentials ?? false)

/*export const authSelectors = {
    useIsAuthenticated: () => useAuthStore((s) => s.isAuthenticated),
    useUser: () => useAuthStore((s) => s.user),
    useMustSetup: () => useAuthStore((s) => s.user?.mustChangeCredentials ?? false),
}*/
