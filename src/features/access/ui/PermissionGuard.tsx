import React from "react"
import { useAccess, type AccessProps } from "@/features/access/hooks/use-access.ts"

interface PermissionGuardProps extends AccessProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PermissionGuard({
  children,
  fallback = null,
  ...accessProps
}: PermissionGuardProps) {
  const hasAccess = useAccess(accessProps)

  if (!hasAccess) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// HOC (опционально)
export function withPermissionGuard<P extends object>(
    Component: React.ComponentType<P>,
    accessProps: AccessProps
) {
  return function WrappedComponent(props: P) {
    return (
        <PermissionGuard {...accessProps}>
          <Component {...props} />
        </PermissionGuard>
    )
  }
}