import { DetailedLessonContent } from "./types"
import { module1Lessons } from "./module1"
import { module2Lessons } from "./module2"
import { module3Lessons } from "./module3"
import { module4Lessons } from "./module4"
import { module5Lessons } from "./module5"
import { module6Lessons } from "./module6"

export * from "./types"

export const allLessonDetails: Record<string, DetailedLessonContent> = {
  ...module1Lessons,
  ...module2Lessons,
  ...module3Lessons,
  ...module4Lessons,
  ...module5Lessons,
  ...module6Lessons,
}
