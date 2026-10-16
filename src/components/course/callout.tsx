import React from "react"
import { BookOpen, Award, AlertTriangle, History, Lightbulb } from "lucide-react"

export type CalloutType = "definition" | "theorem" | "warning" | "historical" | "tip"

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: React.ReactNode
  className?: string
}

const config: Record<
  CalloutType,
  {
    icon: React.ComponentType<{ className?: string }>
    defaultTitle: string
    styles: string
    titleStyle: string
  }
> = {
  definition: {
    icon: BookOpen,
    defaultTitle: "Definition",
    styles: "bg-blue-50/50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-100",
    titleStyle: "text-blue-900 dark:text-blue-200",
  },
  theorem: {
    icon: Award,
    defaultTitle: "Theorem",
    styles: "bg-purple-50/50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900 text-purple-900 dark:text-purple-100",
    titleStyle: "text-purple-900 dark:text-purple-200",
  },
  warning: {
    icon: AlertTriangle,
    defaultTitle: "Warning",
    styles: "bg-amber-50/50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-100",
    titleStyle: "text-amber-900 dark:text-amber-200",
  },
  historical: {
    icon: History,
    defaultTitle: "Historical Note",
    styles: "bg-stone-50/50 dark:bg-stone-900/30 border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100",
    titleStyle: "text-stone-900 dark:text-stone-200",
  },
  tip: {
    icon: Lightbulb,
    defaultTitle: "Tip",
    styles: "bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-100",
    titleStyle: "text-emerald-900 dark:text-emerald-200",
  },
}

export function Callout({
  type = "definition",
  title,
  children,
  className = "",
}: CalloutProps) {
  const { icon: Icon, defaultTitle, styles, titleStyle } = config[type]
  const displayTitle = title || defaultTitle

  return (
    <div
      role="region"
      aria-label={displayTitle}
      className={`my-6 rounded-lg border p-4 sm:p-5 ${styles} ${className}`}
    >
      <div className="flex items-center gap-2.5 font-semibold text-base mb-2">
        <Icon className={`h-5 w-5 shrink-0 ${titleStyle}`} />
        <span className={titleStyle}>{displayTitle}</span>
      </div>
      <div className="text-sm sm:text-base leading-relaxed opacity-90">
        {children}
      </div>
    </div>
  )
}
