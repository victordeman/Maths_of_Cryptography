import LessonDetailPage, { generateMetadata as generateLessonMetadata } from "@/app/lessons/[slug]/page"
import { syllabusModules } from "@/data/syllabus"

export function generateStaticParams() {
  const params: { slug: string; lessonSlug: string }[] = []
  syllabusModules.forEach((module) => {
    module.lessons.forEach((lesson) => {
      params.push({
        slug: module.slug,
        lessonSlug: lesson.slug,
      })
    })
  })
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; lessonSlug: string }> }) {
  const { lessonSlug } = await params
  return generateLessonMetadata({ params: Promise.resolve({ slug: lessonSlug }) })
}

export default async function NestedLessonPage({ params }: { params: Promise<{ slug: string; lessonSlug: string }> }) {
  const { lessonSlug } = await params
  return <LessonDetailPage params={Promise.resolve({ slug: lessonSlug })} />
}
