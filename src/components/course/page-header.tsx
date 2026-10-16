import React from "react"

interface PageHeaderProps {
  title: string
  description?: string
  badge?: string
  children?: React.ReactNode
  className?: string
}

export function PageHeader({
  title,
  description,
  badge,
  children,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`space-y-4 pb-8 pt-6 md:pb-10 md:pt-8 border-b ${className}`}>
      {badge && (
        <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border">
          {badge}
        </span>
      )}
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground">
        {title}
      </h1>
      {description && (
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl">
          {description}
        </p>
      )}
      {children && <div className="pt-2">{children}</div>}
    </div>
  )
}
