import { useAppInit } from "@/shared/hooks/use-app-init.ts"
import { Loader } from "@/shared/components/ui/loaders/Loader.tsx"

export default function AppInitializer({ children }: { children: React.ReactNode }) {
    const { isLoading } = useAppInit()

    if (isLoading) {
        return <Loader />
    }

    return children
}