"use client"

import { useState, useEffect, useCallback } from "react"

const PROGRESS_KEY = "crypto_course_progress"

export interface UserProgress {
  completedLessons: string[]
  quizScores: Record<string, number> // lessonSlug -> score percentage
  solvedChallenges: string[] // challengeId
}

const defaultProgress: UserProgress = {
  completedLessons: [],
  quizScores: {},
  solvedChallenges: [],
}

export function getStoredProgress(): UserProgress {
  if (typeof window === "undefined") return defaultProgress
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    if (!raw) return defaultProgress
    return JSON.parse(raw) as UserProgress
  } catch {
    return defaultProgress
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
    window.dispatchEvent(new Event("storage_progress_change"))
  } catch (e) {
    console.error("Failed to save progress to localStorage:", e)
  }
}

export function useCourseProgress() {
  const [progress, setProgress] = useState<UserProgress>(getStoredProgress)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 0)

    const handleStorageChange = () => {
      setProgress(getStoredProgress())
    }

    window.addEventListener("storage_progress_change", handleStorageChange)
    window.addEventListener("storage", handleStorageChange)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("storage_progress_change", handleStorageChange)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const toggleLessonCompleted = useCallback((slug: string) => {
    const current = getStoredProgress()
    const isCompleted = current.completedLessons.includes(slug)
    const updatedLessons = isCompleted
      ? current.completedLessons.filter((s) => s !== slug)
      : [...current.completedLessons, slug]

    const updated = { ...current, completedLessons: updatedLessons }
    saveProgress(updated)
    setProgress(updated)
  }, [])

  const recordQuizScore = useCallback((lessonSlug: string, score: number) => {
    const current = getStoredProgress()
    const updated = {
      ...current,
      quizScores: { ...current.quizScores, [lessonSlug]: score },
    }
    saveProgress(updated)
    setProgress(updated)
  }, [])

  const recordChallengeSolved = useCallback((challengeId: string) => {
    const current = getStoredProgress()
    if (!current.solvedChallenges.includes(challengeId)) {
      const updated = {
        ...current,
        solvedChallenges: [...current.solvedChallenges, challengeId],
      }
      saveProgress(updated)
      setProgress(updated)
    }
  }, [])

  return {
    progress,
    isLoaded,
    toggleLessonCompleted,
    recordQuizScore,
    recordChallengeSolved,
  }
}
