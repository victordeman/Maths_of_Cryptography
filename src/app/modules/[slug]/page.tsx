import { notFound } from "next/navigation"
import Link from "next/link"
import { PageHeader, Section, Breadcrumb, PrevNextNav, TableOfContents } from "@/components/course"
import { syllabusModules } from "@/data/syllabus"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, BookOpen, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react"

export function generateStaticParams() {
  return syllabusModules.map((module) => ({
    slug: module.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const moduleData = syllabusModules.find((m) => m.slug === slug)
  if (!moduleData) return { title: "Module Not Found" }

  return {
    title: `${moduleData.title} | Mathematics of Cryptography`,
    description: moduleData.description,
  }
}

export default async function ModuleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const moduleIndex = syllabusModules.findIndex((m) => m.slug === slug)
  if (moduleIndex === -1) {
    notFound()
  }

  const moduleData = syllabusModules[moduleIndex]
  const prevModule = moduleIndex > 0 ? syllabusModules[moduleIndex - 1] : null
  const nextModule = moduleIndex < syllabusModules.length - 1 ? syllabusModules[moduleIndex + 1] : null

  const tocItems = [
    { id: "overview", title: "Module Overview" },
    { id: "lessons", title: "Lessons Breakdown" },
  ]

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      <Breadcrumb
        items={[
          { label: "Modules", href: "/modules" },
          { label: moduleData.title },
        ]}
      />

      <PageHeader
        badge={`Module 0${moduleIndex + 1}`}
        title={moduleData.title}
        description={moduleData.description}
      >
        <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-muted-foreground">
          {moduleData.estimatedTime && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>Duration: <strong>{moduleData.estimatedTime}</strong></span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <span><strong>{moduleData.lessons.length}</strong> Lessons</span>
          </div>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-3 space-y-8">
          <Section id="overview" title="Overview">
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                {moduleData.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">Structured Progression</h4>
                    <p className="text-xs text-muted-foreground">
                      Follow step-by-step lessons designed for mathematical rigor and practical clarity.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">Interactive Demonstrations</h4>
                    <p className="text-xs text-muted-foreground">
                      Experiment with client-side interactive visualizers to solidify abstract concepts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section id="lessons" title="Module Lessons">
            <div className="space-y-4">
              {moduleData.lessons.map((lesson, idx) => (
                <Card key={lesson.id} className="hover:shadow-sm transition-shadow">
                  <CardHeader className="p-5 sm:p-6 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs font-medium">
                          Lesson {moduleIndex + 1}.{idx + 1}
                        </Badge>
                        {lesson.estimatedTime && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            {lesson.estimatedTime}
                          </span>
                        )}
                      </div>
                      <Button size="sm" variant="ghost" asChild className="gap-1.5 text-xs text-primary font-semibold">
                        <Link href={`/lessons/${lesson.slug}`}>
                          Start Lesson
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>

                    <CardTitle className="text-lg font-bold">
                      <Link href={`/lessons/${lesson.slug}`} className="hover:text-primary transition-colors">
                        {lesson.title}
                      </Link>
                    </CardTitle>

                    <CardDescription className="text-sm leading-relaxed">
                      {lesson.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </Section>

          <PrevNextNav
            prev={
              prevModule
                ? {
                    title: prevModule.title,
                    href: `/modules/${prevModule.slug}`,
                    subtitle: `Module 0${moduleIndex}`,
                  }
                : undefined
            }
            next={
              nextModule
                ? {
                    title: nextModule.title,
                    href: `/modules/${nextModule.slug}`,
                    subtitle: `Module 0${moduleIndex + 2}`,
                  }
                : undefined
            }
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <TableOfContents items={tocItems} />

          <div className="rounded-xl border bg-muted/40 p-5 space-y-4">
            <h3 className="font-semibold text-sm text-foreground">First Lesson in Module</h3>
            <p className="text-xs text-muted-foreground">
              Ready to jump into this module? Start with lesson {moduleIndex + 1}.1.
            </p>
            {moduleData.lessons[0] && (
              <Button asChild size="sm" className="w-full gap-2">
                <Link href={`/lessons/${moduleData.lessons[0].slug}`}>
                  Begin Lesson 1
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
