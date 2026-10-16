import { CalloutType } from "@/components/course/callout"

export interface LessonSection {
  id: string
  title: string
  level?: number
  content: string
  callout?: {
    type: CalloutType
    title?: string
    content: string
  }
  codeExample?: {
    language: string
    title?: string
    code: string
  }
}

export interface DetailedLessonContent {
  slug: string
  sections: LessonSection[]
  summaryTakeaways: string[]
}
