import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shadcn/lib/utils"

const alertVariants = cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      /*variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 [&>svg]:text-current",
          "border-destructive/50 bg-destructive/10 text-destructive [&>svg]:text-destructive *:data-[slot=alert-description]:text-destructive/90",
      },*/
        variant: {
            default: "bg-card text-card-foreground border-border",
            success:
                "border-green-500/50 bg-green-500/10 text-green-600 [&>svg]:text-green-600 *:data-[slot=alert-description]:text-green-600/90",
            danger:
                "border-red-500/50 bg-red-500/10 text-red-600 [&>svg]:text-red-600 *:data-[slot=alert-description]:text-red-600/90",
            warning:
                "border-yellow-500/50 bg-yellow-500/10 text-yellow-600 [&>svg]:text-yellow-600 *:data-[slot=alert-description]:text-yellow-600/90",
            info:
                "border-blue-500/50 bg-blue-500/10 text-blue-600 [&>svg]:text-blue-600 *:data-[slot=alert-description]:text-blue-600/90",
        },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            className={cn(
                "col-start-2 mt-3 flex items-center gap-2",
                className
            )}
            {...props}
        />
    )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
