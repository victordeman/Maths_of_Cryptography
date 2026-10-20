import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Section, Callout } from "@/components/course"
import { syllabusModules } from "@/data/syllabus"
import { courseTheme, courseDescription, learningOutcomes, prerequisites } from "@/data/outcomes"
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Shield,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  KeyRound,
} from "lucide-react"

export default function Home() {
  const totalLessons = syllabusModules.reduce(
    (acc, mod) => acc + mod.lessons.length,
    0
  )

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12 md:space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-muted/50 via-background to-background border p-8 sm:p-12 md:p-16">
        <div className="max-w-3xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold tracking-wide">
              Interactive Online Course
            </Badge>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
            Mathematics of Cryptography
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            {courseDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button size="lg" asChild className="gap-2 text-base font-semibold">
              <Link href="/modules">
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2 text-base">
              <Link href="/lessons">
                Browse Lessons
              </Link>
            </Button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border/60">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{syllabusModules.length}</p>
                <p className="text-xs text-muted-foreground">Core Modules</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{totalLessons}</p>
                <p className="text-xs text-muted-foreground">Interactive Lessons</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">100%</p>
                <p className="text-xs text-muted-foreground">Client-Side Demos</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">PQC Ready</p>
                <p className="text-xs text-muted-foreground">Post-Quantum</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview & Outcomes Section */}
      <Section id="overview">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Course Overview & Learning Outcomes
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-3xl">
              {courseTheme}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                What You Will Master
              </h3>
              <div className="space-y-3">
                {learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex gap-3 p-3.5 rounded-lg border bg-card/50 text-card-foreground">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed text-foreground/90">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <KeyRound className="h-5 w-5 text-primary" />
                  Recommended Prerequisites
                </h3>
                <div className="rounded-xl border bg-card p-5 space-y-3">
                  {prerequisites.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground text-xs rounded bg-muted px-2 py-0.5 mt-0.5">
                        0{idx + 1}
                      </span>
                      <span className="text-foreground/90">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Callout type="tip" title="Rigorous & Interactive Approach">
                This course bridges theoretical mathematical proofs with interactive visual demonstrations. Each concept is accompanied by runnable algorithms and real-world cryptographic applications.
              </Callout>
            </div>
          </div>
        </div>
      </Section>

      {/* Syllabus / Module Cards Section */}
      <Section id="modules">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Course Syllabus
              </h2>
              <p className="text-muted-foreground text-base max-w-2xl">
                Explore 6 structured modules covering modular arithmetic, abstract algebra, symmetric ciphers, public-key schemes, ECC, and quantum-resistant algorithms.
              </p>
            </div>
            <Button variant="outline" asChild className="shrink-0 gap-2">
              <Link href="/modules">
                View Detailed Syllabus
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {syllabusModules.map((module, index) => (
              <Card key={module.id} className="flex flex-col justify-between hover:shadow-md transition-shadow">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="secondary" className="text-xs font-semibold">
                      Module 0{index + 1}
                    </Badge>
                    {module.estimatedTime && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {module.estimatedTime}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-lg font-bold leading-snug">
                    {module.title.replace(/^\d+\.\s*/, "")}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 text-xs sm:text-sm">
                    {module.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {module.lessons.length} Lessons Included
                  </div>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {module.lessons.slice(0, 3).map((lesson) => (
                      <li key={lesson.id} className="flex items-center gap-2 truncate">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        <span className="truncate">{lesson.title}</span>
                      </li>
                    ))}
                    {module.lessons.length > 3 && (
                      <li className="text-xs font-medium text-primary pt-1">
                        + {module.lessons.length - 3} more lessons
                      </li>
                    )}
                  </ul>
                </CardContent>

                <CardFooter className="pt-2">
                  <Button variant="outline" size="sm" asChild className="w-full gap-2 group">
                    <Link href={`/modules#${module.slug}`}>
                      Explore Module
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Start Learning Banner */}
      <section className="rounded-2xl bg-muted/60 border p-8 sm:p-12 text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Ready to Begin Your Cryptography Journey?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Start with Module 1 to master the foundational number theory and modular arithmetic powering modern digital security.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button size="lg" asChild className="gap-2">
            <Link href="/modules">
              Start Learning Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
