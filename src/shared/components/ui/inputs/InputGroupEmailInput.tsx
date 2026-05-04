import { InputGroupInput } from "@/shadcn/components/ui/input-group"

type InputGroupEmailInputProps = Omit<React.ComponentProps<"input">, "type" | "inputMode">

export function InputGroupEmailInput(props: InputGroupEmailInputProps) {
    return <InputGroupInput {...props} type="email" inputMode="email" />
}