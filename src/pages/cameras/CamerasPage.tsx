import { useMetadata } from "@/shared/hooks/use-metadata.ts"

export default function CamerasPage() {
    const h1 = useMetadata().h1

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{h1}</h1>
                <p className="text-muted-foreground">
                    Overview of your business metrics and performance.
                </p>
            </div>
        </div>
    )
}