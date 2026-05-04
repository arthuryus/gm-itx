import { format } from "@react-input/mask"

export const PHONE_PREFIX = "+7"
export const PHONE_MASK = "(___) ___-__-__"
export const PHONE_REPLACEMENT = { _: /\d/ }

export function normalizePhone(value: string) {
    const digits = getPhoneDigits(value)

    if (!digits) {
        return ""
    }

    return `${PHONE_PREFIX}${digits}`
}

export function formatPhone(value: string) {
    const digits = getPhoneDigits(value)

    if (!digits) {
        return ""
    }

    return format(digits, {
        mask: PHONE_MASK,
        replacement: PHONE_REPLACEMENT,
    })
}

export function formatPhoneFull(value: string) {
    const phone = formatPhone(value)

    if (!phone) {
        return ""
    }

    return `${PHONE_PREFIX} ${phone}`
}

function getPhoneDigits(value: string) {
    const digits = value.replace(/\D/g, "")

    if (digits.length > 10 && (digits.startsWith("7") || digits.startsWith("8"))) {
        return digits.slice(1, 11)
    }

    return digits.slice(0, 10)
}