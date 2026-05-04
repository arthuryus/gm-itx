import * as React from "react"
import { InputMask, format } from "@react-input/mask"
import { InputGroupAddon, InputGroupInput, InputGroupText } from "@/shadcn/components/ui/input-group"

const PHONE_PREFIX = "+7"
const PHONE_MASK = "(___) ___-__-__"
const PHONE_REPLACEMENT = { _: /\d/ }

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
    const [displayValue, setDisplayValue] = React.useState(() => formatPhoneDisplay(value))

    const lastEmittedValueRef = React.useRef<string | null>(null)

    React.useEffect(() => {
        if (value === lastEmittedValueRef.current) {
            return
        }

        setDisplayValue(formatPhoneDisplay(value))
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
                    const normalizedValue = normalizePhoneValue(nextDisplayValue)

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

function getPhoneDigits(value: string) {
    const digits = value.replace(/\D/g, "")

    if (digits.length > 10 && (digits.startsWith("7") || digits.startsWith("8"))) {
        return digits.slice(1, 11)
    }

    return digits.slice(0, 10)
}

function normalizePhoneValue(value: string) {
    const digits = getPhoneDigits(value)

    if (!digits) {
        return ""
    }

    return `${PHONE_PREFIX}${digits}`
}

function formatPhoneDisplay(value: string) {
    const digits = getPhoneDigits(value)

    if (!digits) {
        return ""
    }

    return format(digits, {
        mask: PHONE_MASK,
        replacement: PHONE_REPLACEMENT,
    })
}