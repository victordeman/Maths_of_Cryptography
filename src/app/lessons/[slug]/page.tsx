import { notFound } from "next/navigation"
import Link from "next/link"
import { PageHeader, Section, Callout, Breadcrumb, ProgressIndicator, TableOfContents, PrevNextNav, FormattedText, QuizComponent } from "@/components/course"
import { syllabusModules, Lesson, Module } from "@/data/syllabus"
import { allLessonDetails } from "@/data/lessons"
import { QUIZZES } from "@/data/quizzes"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, BookOpen, CheckCircle2, ArrowRight, Code, Sparkles } from "lucide-react"
import { CaesarCipher } from "@/components/interactive/caesar-cipher"
import { FrequencyAnalysis } from "@/components/interactive/frequency-analysis"
import { ModularCalculator } from "@/components/interactive/modular-calculator"
import { DiffieHellmanDemo } from "@/components/interactive/diffie-hellman-demo"
import { RSADemo } from "@/components/interactive/rsa-demo"
import { EllipticCurveVisualizer } from "@/components/interactive/elliptic-curve-visualizer"

// Helper to flatten all lessons with module information
function getAllLessonsWithModuleInfo() {
  const flattened: { lesson: Lesson; module: Module; moduleIndex: number; lessonInModuleIndex: number }[] = []

  syllabusModules.forEach((mod, mIdx) => {
    mod.lessons.forEach((les, lIdx) => {
      flattened.push({
        lesson: les,
        module: mod,
        moduleIndex: mIdx,
        lessonInModuleIndex: lIdx + 1,
      })
    })
  })

  return flattened
}

export function generateStaticParams() {
  const allLessons = getAllLessonsWithModuleInfo()
  return allLessons.map((item) => ({
    slug: item.lesson.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const allLessons = getAllLessonsWithModuleInfo()
  const item = allLessons.find((i) => i.lesson.slug === slug)
  if (!item) return { title: "Lesson Not Found" }

  return {
    title: `${item.lesson.title} | Mathematics of Cryptography`,
    description: item.lesson.description,
  }
}

export default async function LessonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const allLessons = getAllLessonsWithModuleInfo()
  const index = allLessons.findIndex((item) => item.lesson.slug === slug)

  if (index === -1) {
    notFound()
  }

  const currentItem = allLessons[index]
  const { lesson, module: parentModule, moduleIndex, lessonInModuleIndex } = currentItem
  const prevItem = index > 0 ? allLessons[index - 1] : null
  const nextItem = index < allLessons.length - 1 ? allLessons[index + 1] : null

  // Fetch detailed lesson content
  const lessonDetail = allLessonDetails[lesson.slug]

  const quizKeyMap: Record<string, string> = {
    "divisibility-euclidean-algorithm": "divisibility-euclidean-algorithm",
    "modular-arithmetic-congruences": "modular-arithmetic-congruences",
    "rsa-cryptosystem-factorization": "rsa-cryptosystem",
    "diffie-hellman-discrete-log": "diffie-hellman-key-exchange",
  }
  const quiz = QUIZZES[quizKeyMap[slug] || slug]

  const hasInteractiveTool = [
    "classical-ciphers-cryptanalysis",
    "modular-arithmetic-congruences",
    "divisibility-euclidean-algorithm",
    "rsa-cryptosystem-factorization",
    "diffie-hellman-discrete-log",
    "elliptic-curves-real-finite-fields",
  ].includes(slug)

  const tocItems = lessonDetail
    ? [
        ...lessonDetail.sections.map((s) => ({ id: s.id, title: s.title, level: s.level || 1 })),
        ...(hasInteractiveTool ? [{ id: "interactive-lab", title: "Interactive Cryptography Lab", level: 1 }] : []),
        ...(quiz ? [{ id: "knowledge-check", title: "Knowledge Check Quiz", level: 1 }] : []),
        { id: "summary", title: "Summary & Key Takeaways", level: 1 },
      ]
    : [
        { id: "overview", title: "Overview", level: 1 },
        ...(hasInteractiveTool ? [{ id: "interactive-lab", title: "Interactive Cryptography Lab", level: 1 }] : []),
        ...(quiz ? [{ id: "knowledge-check", title: "Knowledge Check Quiz", level: 1 }] : []),
        { id: "summary", title: "Summary", level: 1 },
      ]

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Top Header & Breadcrumbs */}
      <div className="space-y-4">
        <Breadcrumb
          items={[
            { label: "Modules", href: "/modules" },
            { label: parentModule.title, href: `/modules/${parentModule.slug}` },
            { label: lesson.title },
          ]}
        />

        <ProgressIndicator
          currentStep={lessonInModuleIndex}
          totalSteps={parentModule.lessons.length}
          moduleTitle={`Module 0${moduleIndex + 1}`}
        />
      </div>

      <PageHeader
        badge={`Module 0${moduleIndex + 1} • Lesson ${lesson.order}`}
        title={lesson.title}
        description={lesson.description}
      >
        <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-muted-foreground">
          {lesson.estimatedTime && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>Estimated Reading Time: <strong>{lesson.estimatedTime}</strong></span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <span>Lesson {index + 1} of {allLessons.length} Total</span>
          </div>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-3 space-y-10">
          {lessonDetail ? (
            lessonDetail.sections.map((section) => (
              <Section key={section.id} id={section.id} title={section.title}>
                <div className="space-y-6 text-foreground/90 leading-relaxed text-base sm:text-lg">
                  <FormattedText text={section.content} />

                  {section.callout && (
                    <Callout type={section.callout.type} title={section.callout.title}>
                      <FormattedText text={section.callout.content} />
                    </Callout>
                  )}

                  {section.codeExample && (
                    <div className="rounded-xl border bg-slate-950 text-slate-100 p-5 space-y-3 font-mono text-xs sm:text-sm overflow-x-auto my-6 shadow-md">
                      <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2 text-slate-400">
                        <span className="flex items-center gap-2 font-semibold">
                          <Code className="h-4 w-4 text-primary" />
                          {section.codeExample.title || "Code Example"}
                        </span>
                        <Badge variant="outline" className="border-slate-700 text-slate-300 text-[10px] uppercase">
                          {section.codeExample.language}
                        </Badge>
                      </div>
                      <pre className="pt-2 leading-relaxed whitespace-pre font-mono">
                        <code>{section.codeExample.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </Section>
            ))
          ) : (
            <Section id="overview" title="Overview">
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                {lesson.description}
              </p>
            </Section>
          )}

          {/* Contextual Interactive Tool Integration */}
          {hasInteractiveTool && (
            <Section id="interactive-lab" title="Interactive Cryptography Lab">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-medium text-sm">
                  <Sparkles className="h-4 w-4" />
                  <span>Try It Yourself — Experiment with live cryptographic primitives below:</span>
                </div>

                {slug === "classical-ciphers-cryptanalysis" && (
                  <div className="space-y-6">
                    <CaesarCipher />
                    <FrequencyAnalysis />
                  </div>
                )}

                {(slug === "modular-arithmetic-congruences" || slug === "divisibility-euclidean-algorithm") && (
                  <ModularCalculator />
                )}

                {slug === "diffie-hellman-discrete-log" && (
                  <DiffieHellmanDemo />
                )}

                {slug === "rsa-cryptosystem-factorization" && (
                  <RSADemo />
                )}

                {slug === "elliptic-curves-real-finite-fields" && (
                  <EllipticCurveVisualizer />
                )}
              </div>
            </Section>
          )}

          {/* Quiz / Knowledge Check Section */}
          {quiz && (
            <Section id="knowledge-check" title="Knowledge Check Quiz">
              <QuizComponent quiz={quiz} />
            </Section>
          )}

          {/* Summary & Key Takeaways */}
          <Section id="summary" title="Summary & Key Takeaways">
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-medium">
                In summary, <strong>{lesson.title}</strong> equips security researchers with crucial mathematical foundations and practical cryptanalytic tools.
              </p>
              <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                {lessonDetail ? (
                  lessonDetail.summaryTakeaways.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <FormattedText text={item} />
                    </div>
                  ))
                ) : (
                  <div className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-2" />
                    <span>Key mathematical structures establish formal security guarantees.</span>
                  </div>
                )}
              </div>
            </div>
          </Section>

          {/* Previous / Next Lesson Navigation */}
          <PrevNextNav
            lessonSlug={lesson.slug}
            prev={
              prevItem
                ? {
                    title: prevItem.lesson.title,
                    href: `/lessons/${prevItem.lesson.slug}`,
                    subtitle: `Previous: Lesson ${prevItem.moduleIndex + 1}.${prevItem.lessonInModuleIndex}`,
                  }
                : undefined
            }
            next={
              nextItem
                ? {
                    title: nextItem.lesson.title,
                    href: `/lessons/${nextItem.lesson.slug}`,
                    subtitle: `Next: Lesson ${nextItem.moduleIndex + 1}.${nextItem.lessonInModuleIndex}`,
                  }
                : undefined
            }
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <TableOfContents items={tocItems} />

          <div className="rounded-xl border bg-card p-5 space-y-4">
            <div className="space-y-1">
              <Badge variant="outline" className="text-[10px] font-semibold">
                Module Context
              </Badge>
              <h3 className="font-bold text-sm text-foreground">{parentModule.title}</h3>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-3">
              {parentModule.description}
            </p>
            <Button size="sm" variant="outline" asChild className="w-full gap-2 text-xs">
              <Link href={`/modules/${parentModule.slug}`}>
                Module Overview
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
