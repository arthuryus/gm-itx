import { useMetadata } from "@/shared/hooks/use-metadata.ts"
import { SidebarTrigger } from "@/shadcn/components/ui/sidebar.tsx"
import { Separator } from "@/shadcn/components/ui/separator.tsx"

export default function AppHeader() {
    const h1 = useMetadata().h1

    return (
        <header className="flex items-center p-4">
            <SidebarTrigger className="-ml-1" />
            <Separator className="mx-2 data-[orientation=vertical]:h-4" orientation="vertical" />
            <h1 className="text-base font-medium">{h1}</h1>
        </header>
    )
}