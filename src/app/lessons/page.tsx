import Link from "next/link"
import { PageHeader, Section, Breadcrumb } from "@/components/course"
import { syllabusModules } from "@/data/syllabus"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowRight, BookOpen, Layers } from "lucide-react"

export const metadata = {
  title: "Lessons | Mathematics of Cryptography",
  description: "Browse all interactive cryptography lessons grouped by course module.",
}

export default function LessonsPage() {
  const totalLessons = syllabusModules.reduce((acc, m) => acc + m.lessons.length, 0)

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      <Breadcrumb items={[{ label: "Lessons" }]} />

      <PageHeader
        badge="Interactive Curriculum"
        title="All Lessons"
        description="Explore all lessons across the 6 course modules. Each lesson combines mathematical rigor, formal proofs, and client-side interactive visual demonstrations."
      >
        <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <span><strong>{totalLessons}</strong> Lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            <span><strong>{syllabusModules.length}</strong> Modules</span>
          </div>
        </div>
      </PageHeader>

      <div className="space-y-12">
        {syllabusModules.map((module, mIdx) => (
          <Section key={module.id} id={module.slug} className="pt-0 border-b pb-10 last:border-b-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="text-xs font-semibold">
                    Module 0{mIdx + 1}
                  </Badge>
                  {module.estimatedTime && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {module.estimatedTime}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  <Link href={`/modules/${module.slug}`} className="hover:text-primary transition-colors">
                    {module.title}
                  </Link>
                </h2>
              </div>
              <Link
                href={`/modules/${module.slug}`}
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 shrink-0"
              >
                View Module Overview
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {module.lessons.map((lesson, lIdx) => (
                <Card key={lesson.id} className="group hover:border-primary/50 transition-colors">
                  <CardHeader className="p-5 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-muted-foreground">
                        Lesson {mIdx + 1}.{lIdx + 1}
                      </span>
                      {lesson.estimatedTime && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {lesson.estimatedTime}
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-base font-bold">
                      <Link
                        href={`/lessons/${lesson.slug}`}
                        className="group-hover:text-primary transition-colors flex items-center justify-between gap-2"
                      >
                        <span>{lesson.title}</span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {lesson.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </Section>
        ))}
      </div>
    </div>
  )
}
