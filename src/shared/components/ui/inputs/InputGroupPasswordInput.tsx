import { useState, type ReactNode } from "react"
import { InputGroupAddon, InputGroupButton, InputGroupInput } from "@/shadcn/components/ui/input-group"
import { EyeIcon, EyeOffIcon } from "lucide-react"

type InputGroupPasswordInputProps = Omit<React.ComponentProps<"input">, "type"> & {
    buttonVariant?: React.ComponentProps<typeof InputGroupButton>["variant"]
    buttonSize?: React.ComponentProps<typeof InputGroupButton>["size"]
    buttonShowIcon?: ReactNode
    buttonHideIcon?: ReactNode
}

export function InputGroupPasswordInput({
    buttonVariant = "ghost",
    buttonSize = "icon-xs",
    buttonShowIcon = <EyeIcon />,
    buttonHideIcon = <EyeOffIcon />,
    ...inputProps
}: InputGroupPasswordInputProps) {
    const [isPasswordShown, setIsPasswordShown] = useState(false)

    return (
        <>
            <InputGroupInput
                {...inputProps}
                type={isPasswordShown ? "text" : "password"}
            />

            <InputGroupAddon align="inline-end">
                <InputGroupButton
                    type="button"
                    variant={buttonVariant}
                    size={buttonSize}
                    tabIndex={-1}
                    onClick={() => setIsPasswordShown((prev) => !prev)}
                >
                    {isPasswordShown ? buttonShowIcon : buttonHideIcon}
                </InputGroupButton>
            </InputGroupAddon>
        </>
    )
}