import React from "react"
import { useAccess, type AccessProps } from "@/features/access/hooks/use-access.ts"

interface AccessGuardProps extends AccessProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AccessGuard({
  children,
  fallback = null,
  ...accessProps
}: AccessGuardProps) {
  const hasAccess = useAccess(accessProps)

  if (!hasAccess) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// HOC (опционально)
export function withAccessGuard<P extends object>(
    Component: React.ComponentType<P>,
    accessProps: AccessProps
) {
  return function WrappedComponent(props: P) {
    return (
        <AccessGuard {...accessProps}>
          <Component {...props} />
        </AccessGuard>
    )
  }
}