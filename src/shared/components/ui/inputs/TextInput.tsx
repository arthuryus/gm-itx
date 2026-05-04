import { Input } from "@/shadcn/components/ui/input"

type TextInputProps = Omit<React.ComponentProps<"input">, "type">

export function TextInput(props: TextInputProps) {
    return <Input {...props} type="text" />
}