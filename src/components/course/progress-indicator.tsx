import { Badge } from "@/components/ui/badge"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  moduleTitle?: string
  className?: string
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  moduleTitle,
  className = "",
}: ProgressIndicatorProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100)

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-medium">
          Lesson {currentStep} of {totalSteps} {moduleTitle ? `• ${moduleTitle}` : ""}
        </span>
        <Badge variant="outline" className="text-[10px] font-semibold px-2 py-0">
          {percentage}% Complete
        </Badge>
      </div>
      <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-primary h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
