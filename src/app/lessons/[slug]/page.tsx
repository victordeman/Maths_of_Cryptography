import { notFound } from "next/navigation"
import Link from "next/link"
import { PageHeader, Section, Callout, Breadcrumb, ProgressIndicator, TableOfContents, PrevNextNav } from "@/components/course"
import { syllabusModules, Lesson, Module } from "@/data/syllabus"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, BookOpen, CheckCircle2, ArrowRight, Lightbulb } from "lucide-react"

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

  const tocItems = [
    { id: "overview", title: "Lesson Overview & Objectives" },
    { id: "foundations", title: "Mathematical Foundations" },
    { id: "applications", title: "Cryptographic Applications & Examples" },
    { id: "summary", title: "Summary & Key Takeaways" },
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
          {/* Overview & Objectives */}
          <Section id="overview" title="Lesson Overview & Objectives">
            <div className="prose dark:prose-invert max-w-none space-y-4 text-foreground/90 leading-relaxed">
              <p className="text-base sm:text-lg">
                {lesson.description} This lesson provides both rigorous mathematical proofs and visual, step-by-step implementations essential for modern cryptographic engineering.
              </p>

              <Callout type="definition" title="Key Learning Objectives">
                <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base mt-2">
                  <li>Understand the formal definition and fundamental properties of {lesson.title.toLowerCase()}.</li>
                  <li>Analyze asymptotic complexity, computational bounds, and key algebraic structures.</li>
                  <li>Explore practical security applications and vulnerability vectors in cryptosystems.</li>
                </ul>
              </Callout>
            </div>
          </Section>

          {/* Mathematical Foundations */}
          <Section id="foundations" title="Mathematical Foundations">
            <div className="space-y-6">
              <p className="text-foreground/90 text-sm sm:text-base leading-relaxed">
                Modern cryptographic protocols rely on strict algebraic properties and hard mathematical assumptions. In {lesson.title}, we analyze these underlying structures.
              </p>

              <Callout type="theorem" title={`Fundamental Principle: ${lesson.title}`}>
                Let $\mathcal&#123;G&#125;$ be a finite algebraic structure associated with {lesson.title}. The underlying security reduces to the hardness of computing discrete invariants or modular inverses within finite fields or rings.
              </Callout>

              <div className="rounded-xl border bg-card p-6 space-y-4">
                <h4 className="font-bold text-base text-foreground flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Core Mathematical Properties
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-muted-foreground">
                  <div className="p-3 rounded-lg bg-muted/50 border space-y-1">
                    <span className="font-semibold text-foreground block">Closure & Associativity</span>
                    <span>Guarantees deterministic execution across modular domains and ring operations.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border space-y-1">
                    <span className="font-semibold text-foreground block">Computational Hardness</span>
                    <span>Ensures polynomial-time encryption/verification while adversary decryption remains superpolynomial.</span>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Cryptographic Applications & Examples */}
          <Section id="applications" title="Cryptographic Applications & Examples">
            <div className="space-y-6">
              <p className="text-foreground/90 text-sm sm:text-base leading-relaxed">
                Theoretical results in {lesson.title} directly power standard security algorithms utilized across web protocols, blockchain systems, and confidential compute frameworks.
              </p>

              <Callout type="tip" title="Practical Application & Interactive Demonstration">
                In upcoming interactive modules, you will directly manipulate key lengths, verify signatures, and run step-by-step mathematical executions client-side.
              </Callout>

              <div className="rounded-xl border bg-muted/30 p-6 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-foreground text-sm">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  <span>Real-World Security Example</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  When deployed in protocols like TLS 1.3 or SSH, the properties of {lesson.title} protect data against passive eavesdropping and active tampering over untrusted networks.
                </p>
              </div>
            </div>
          </Section>

          {/* Summary & Key Takeaways */}
          <Section id="summary" title="Summary & Key Takeaways">
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                In summary, <strong>{lesson.title}</strong> serves as a fundamental building block in modern cryptographic design.
              </p>
              <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-2" />
                  <span>Algebraic structure and bounds establish formal correctness proofs.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-2" />
                  <span>Algorithms offer efficient $O(\log n)$ or polynomial complexity for authorized operations.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-2" />
                  <span>Underlying complexity assumptions prevent unauthorized decryption and forgery attacks.</span>
                </div>
              </div>
            </div>
          </Section>

          {/* Previous / Next Lesson Navigation */}
          <PrevNextNav
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
