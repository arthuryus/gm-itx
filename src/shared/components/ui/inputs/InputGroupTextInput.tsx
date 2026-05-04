import { InputGroupInput } from "@/shadcn/components/ui/input-group"

type InputGroupTextInputProps = Omit<React.ComponentProps<"input">, "type">

export function InputGroupTextInput(props: InputGroupTextInputProps) {
    return <InputGroupInput {...props} type="text" />
}