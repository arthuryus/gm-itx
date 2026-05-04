import * as React from "react"
import { InputMask } from "@react-input/mask"
import { InputGroupAddon, InputGroupInput, InputGroupText } from "@/shadcn/components/ui/input-group"
import { PHONE_PREFIX, PHONE_MASK, PHONE_REPLACEMENT, normalizePhone, formatPhone } from "@/shared/helpers/phone.helper.ts"

type InputGroupPhoneInputProps = Omit<React.ComponentPropsWithoutRef<"input">, "type" | "inputMode" | "value" | "onChange"> & {
    value?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputGroupPhoneInput = React.forwardRef<
    HTMLInputElement,
    InputGroupPhoneInputProps
>(function InputGroupPhoneInput(
    {
        value = "",
        onChange,
        placeholder = PHONE_MASK,
        ...props
    },
    ref
) {
    const [displayValue, setDisplayValue] = React.useState(() => formatPhone(value))

    const lastEmittedValueRef = React.useRef<string | null>(null)

    React.useEffect(() => {
        if (value === lastEmittedValueRef.current) {
            return
        }

        setDisplayValue(formatPhone(value))
    }, [value])

    return (
        <>
            <InputGroupAddon align="inline-start">
                <InputGroupText>{PHONE_PREFIX}</InputGroupText>
            </InputGroupAddon>

            <InputMask
                {...props}
                ref={ref}
                component={InputGroupInput}
                mask={PHONE_MASK}
                replacement={PHONE_REPLACEMENT}
                value={displayValue}
                type="tel"
                inputMode="tel"
                placeholder={placeholder}
                onChange={(event) => {
                    const nextDisplayValue = event.target.value
                    const normalizedValue = normalizePhone(nextDisplayValue)

                    setDisplayValue(nextDisplayValue)
                    lastEmittedValueRef.current = normalizedValue

                    onChange?.({
                        ...event,
                        target: {
                            ...event.target,
                            name: event.target.name,
                            value: normalizedValue,
                        },
                        currentTarget: {
                            ...event.currentTarget,
                            name: event.currentTarget.name,
                            value: normalizedValue,
                        },
                    } as React.ChangeEvent<HTMLInputElement>)
                }}
                /*onChange={(event) => {
                    field.onChange(event)
                    console.log(event.target.value)
                }}*/
            />
        </>
    )
})