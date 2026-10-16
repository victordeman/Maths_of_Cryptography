"use client"

import React, { useState } from "react"
import { Quiz, Question } from "@/data/quizzes"
import { FormattedText } from "./formatted-text"
import { useCourseProgress } from "@/lib/progress"
import { CheckCircle2, XCircle, HelpCircle, RefreshCw, Award } from "lucide-react"

interface QuizComponentProps {
  quiz: Quiz
}

export function QuizComponent({ quiz }: QuizComponentProps) {
  const { recordQuizScore } = useCourseProgress()
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [showHints, setShowHints] = useState<Record<string, boolean>>({})

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (submitted) return
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  const handleTextChange = (questionId: string, val: string) => {
    if (submitted) return
    setUserAnswers((prev) => ({ ...prev, [questionId]: val }))
  }

  const toggleHint = (questionId: string) => {
    setShowHints((prev) => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  const isQuestionCorrect = (q: Question): boolean => {
    const ans = userAnswers[q.id]?.trim()
    if (!ans) return false

    if (q.type === "multiple-choice") {
      const selected = q.options?.find((o) => o.id === ans)
      return !!selected?.isCorrect
    } else {
      return String(ans) === String(q.correctAnswer)
    }
  }

  const handleSubmit = () => {
    let correctCount = 0
    quiz.questions.forEach((q) => {
      if (isQuestionCorrect(q)) correctCount++
    })
    const pct = Math.round((correctCount / quiz.questions.length) * 100)
    setSubmitted(true)
    recordQuizScore(quiz.lessonSlug, pct)
  }

  const handleReset = () => {
    setUserAnswers({})
    setSubmitted(false)
    setShowHints({})
  }

  const scoreCount = quiz.questions.filter(isQuestionCorrect).length
  const totalCount = quiz.questions.length
  const scorePct = Math.round((scoreCount / totalCount) * 100)

  return (
    <div className="my-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-2 text-primary font-semibold text-lg">
        <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3>{quiz.title}</h3>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">{quiz.description}</p>

      <div className="space-y-6">
        {quiz.questions.map((q, qIdx) => {
          const isCorrect = isQuestionCorrect(q)
          const userAnswer = userAnswers[q.id] || ""

          return (
            <div
              key={q.id}
              className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <span className="text-xs bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded font-mono">
                    Q{qIdx + 1}
                  </span>
                  <FormattedText text={q.prompt} as="span" />
                </div>
                {q.hint && !submitted && (
                  <button
                    onClick={() => toggleHint(q.id)}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 shrink-0"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    {showHints[q.id] ? "Hide Hint" : "Hint"}
                  </button>
                )}
              </div>

              {showHints[q.id] && q.hint && !submitted && (
                <div className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded border border-amber-200 dark:border-amber-900/50">
                  <strong>Hint:</strong> <FormattedText text={q.hint} as="span" />
                </div>
              )}

              {/* Multiple Choice Options */}
              {q.type === "multiple-choice" && q.options && (
                <div className="grid gap-2 pt-1">
                  {q.options.map((opt) => {
                    const isSelected = userAnswer === opt.id
                    let optStyle =
                      "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"

                    if (submitted) {
                      if (opt.isCorrect) {
                        optStyle =
                          "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-medium"
                      } else if (isSelected && !opt.isCorrect) {
                        optStyle =
                          "border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200"
                      }
                    } else if (isSelected) {
                      optStyle =
                        "border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200 font-medium"
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={submitted}
                        onClick={() => handleSelectOption(q.id, opt.id)}
                        className={`w-full text-left p-3 text-sm rounded-lg border transition-colors flex items-start gap-3 ${optStyle}`}
                      >
                        <span className="font-mono text-xs text-zinc-500 uppercase mt-0.5">
                          {opt.id}.
                        </span>
                        <div className="flex-1">
                          <FormattedText text={opt.label} as="span" />
                        </div>
                        {submitted && opt.isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        {submitted && isSelected && !opt.isCorrect && (
                          <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                        )}
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Numeric Input */}
              {q.type === "numeric" && (
                <div className="pt-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      disabled={submitted}
                      value={userAnswer}
                      onChange={(e) => handleTextChange(q.id, e.target.value)}
                      placeholder="Enter integer answer..."
                      className="px-3 py-1.5 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-mono w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-80"
                    />
                    {submitted && (
                      <span className="flex items-center gap-1 text-sm font-medium">
                        {isCorrect ? (
                          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Correct
                          </span>
                        ) : (
                          <span className="text-red-600 dark:text-red-400 flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> Expected: {q.correctAnswer}
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Explanation after submission */}
              {submitted && (
                <div className="mt-2 text-xs bg-zinc-100 dark:bg-zinc-800/80 p-3 rounded text-zinc-700 dark:text-zinc-300 leading-relaxed border-l-2 border-blue-500">
                  <strong className="block text-zinc-900 dark:text-zinc-100 mb-0.5">
                    Explanation:
                  </strong>
                  <FormattedText text={q.explanation} as="span" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        {!submitted ? (
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
          >
            Submit Quiz
          </button>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <span>Score: {scoreCount} / {totalCount} ({scorePct}%)</span>
              {scorePct === 100 && (
                <span className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded font-semibold">
                  Perfect Score!
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs rounded-md transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
