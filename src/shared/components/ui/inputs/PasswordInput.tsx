import { useState, type ReactNode } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { cn } from "@/shadcn/lib/utils"
import { Input } from "@/shadcn/components/ui/input"
import { Button } from "@/shadcn/components/ui/button"

type PasswordInputProps = Omit<React.ComponentProps<"input">, "type"> & {
    buttonVariant?: React.ComponentProps<typeof Button>["variant"]
    buttonSize?: React.ComponentProps<typeof Button>["size"]
    buttonShowIcon?: ReactNode
    buttonHideIcon?: ReactNode
}

export function PasswordInput({
    buttonVariant = "ghost",
    buttonSize = "icon-sm",
    buttonShowIcon = <EyeIcon />,
    buttonHideIcon = <EyeOffIcon />,
    className,
    ...inputProps
}: PasswordInputProps) {
    const [isPasswordShown, setIsPasswordShown] = useState(false)

    return (
        <div className="relative w-full">
            <Input
                className={cn(className)}
                {...inputProps}
                type={isPasswordShown ? "text" : "password"}
            />

            <Button
                type="button"
                variant={buttonVariant}
                size={buttonSize}
                className="absolute top-1/2 right-0 -translate-y-1/2"
                tabIndex={-1}
                onClick={() => setIsPasswordShown((prev) => !prev)}
            >
                {isPasswordShown ? buttonShowIcon : buttonHideIcon}
            </Button>
        </div>
    )
}