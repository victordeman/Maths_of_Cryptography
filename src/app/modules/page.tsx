import Link from "next/link"
import { PageHeader, Section, Breadcrumb } from "@/components/course"
import { syllabusModules } from "@/data/syllabus"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ArrowRight, BookOpen, Layers } from "lucide-react"

export const metadata = {
  title: "Modules | Mathematics of Cryptography",
  description: "Explore the core modules in Mathematics of Cryptography.",
}

export default function ModulesPage() {
  const totalLessons = syllabusModules.reduce((acc, m) => acc + m.lessons.length, 0)

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      <Breadcrumb items={[{ label: "Modules" }]} />

      <PageHeader
        badge="Course Curriculum"
        title="Modules & Syllabus"
        description="Comprehensive study modules covering foundational number theory, abstract algebra, symmetric ciphers, asymmetric cryptosystems, elliptic curve cryptography, and post-quantum cryptography."
      >
        <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            <span><strong>{syllabusModules.length}</strong> Modules</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <span><strong>{totalLessons}</strong> Total Lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span><strong>14 Weeks</strong> Total Duration</span>
          </div>
        </div>
      </PageHeader>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {syllabusModules.map((module, index) => (
            <Card key={module.id} id={module.slug} className="flex flex-col justify-between hover:shadow-md transition-shadow">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="secondary" className="font-semibold text-xs">
                    Module 0{index + 1}
                  </Badge>
                  {module.estimatedTime && (
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {module.estimatedTime}
                    </span>
                  )}
                </div>
                <CardTitle className="text-xl font-bold leading-snug">
                  <Link href={`/modules/${module.slug}`} className="hover:text-primary transition-colors">
                    {module.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {module.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b pb-1.5">
                  Lessons in this module ({module.lessons.length})
                </div>
                <div className="space-y-2">
                  {module.lessons.map((lesson, lIdx) => (
                    <Link
                      key={lesson.id}
                      href={`/lessons/${lesson.slug}`}
                      className="group flex items-start justify-between p-2.5 rounded-lg border bg-card hover:bg-muted/60 transition-colors"
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-medium text-muted-foreground">
                          Lesson {index + 1}.{lIdx + 1}
                        </div>
                        <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {lesson.title}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 shrink-0 mt-1" />
                    </Link>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-2">
                <Button size="sm" asChild className="w-full gap-2">
                  <Link href={`/modules/${module.slug}`}>
                    View Module Details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  )
}
