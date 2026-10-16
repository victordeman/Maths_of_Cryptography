import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export interface NavLinkTarget {
  title: string
  href: string
  subtitle?: string
}

interface PrevNextNavProps {
  prev?: NavLinkTarget
  next?: NavLinkTarget
  className?: string
}

export function PrevNextNav({ prev, next, className = "" }: PrevNextNavProps) {
  if (!prev && !next) return null

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t ${className}`}>
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col items-start p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors space-y-1"
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase text-muted-foreground group-hover:text-foreground transition-colors">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span>{prev.subtitle || "Previous"}</span>
          </div>
          <span className="font-semibold text-sm sm:text-base text-foreground line-clamp-1">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col items-end text-right p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors space-y-1 sm:col-start-2"
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase text-muted-foreground group-hover:text-foreground transition-colors">
            <span>{next.subtitle || "Next"}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
          <span className="font-semibold text-sm sm:text-base text-foreground line-clamp-1">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
