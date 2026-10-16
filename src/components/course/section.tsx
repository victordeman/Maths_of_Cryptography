import React from "react"

interface SectionProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({
  title,
  description,
  children,
  className = "",
  id,
}: SectionProps) {
  return (
    <section id={id} className={`py-8 md:py-12 ${className}`}>
      {(title || description) && (
        <div className="mb-6 space-y-1">
          {title && (
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground text-sm sm:text-base">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  )
}
