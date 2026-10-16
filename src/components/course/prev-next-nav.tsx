"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from "lucide-react"
import { useCourseProgress } from "@/lib/progress"

export interface NavLinkTarget {
  title: string
  href: string
  subtitle?: string
}

interface PrevNextNavProps {
  prev?: NavLinkTarget
  next?: NavLinkTarget
  lessonSlug?: string
  className?: string
}

export function PrevNextNav({ prev, next, lessonSlug, className = "" }: PrevNextNavProps) {
  const { progress, toggleLessonCompleted } = useCourseProgress()
  const isCompleted = lessonSlug ? progress.completedLessons.includes(lessonSlug) : false

  return (
    <div className={`space-y-6 pt-8 border-t ${className}`}>
      {lessonSlug && (
        <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="text-xs text-zinc-600 dark:text-zinc-400">
            {isCompleted ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Lesson marked as completed
              </span>
            ) : (
              <span>Track your learning progress as you complete each syllabus topic.</span>
            )}
          </div>
          <button
            type="button"
            onClick={() => toggleLessonCompleted(lessonSlug)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
              isCompleted
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" /> Completed
              </>
            ) : (
              <>
                <Circle className="w-3.5 h-3.5" /> Mark as Completed
              </>
            )}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
    </div>
  )
}
