import { Input } from "@/shadcn/components/ui/input"

type EmailInputProps = Omit<React.ComponentProps<"input">, "type" | "inputMode">

export function EmailInput(props: EmailInputProps) {
    return <Input {...props} type="email" inputMode="email" />
}