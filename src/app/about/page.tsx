import { PageHeader, Section, Callout, Breadcrumb } from "@/components/course"
import { courseTheme, courseDescription, learningOutcomes } from "@/data/outcomes"
import { syllabusModules } from "@/data/syllabus"
import { Card, CardHeader } from "@/components/ui/card"
import { CheckCircle2, Shield, GraduationCap, Cpu, Sparkles, BookOpen } from "lucide-react"

export const metadata = {
  title: "About | Mathematics of Cryptography",
  description: "Learn about the Mathematics of Cryptography course structure, pedagogy, and learning goals.",
}

export default function AboutPage() {
  const totalLessons = syllabusModules.reduce((acc, m) => acc + m.lessons.length, 0)

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      <Breadcrumb items={[{ label: "About" }]} />

      <PageHeader
        badge="CS / MATH 401"
        title="About The Course"
        description={courseDescription}
      />

      <Section id="philosophy" title="Teaching Philosophy & Course Theme">
        <div className="rounded-xl border bg-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Core Theme</h3>
              <p className="text-sm text-muted-foreground">{courseTheme}</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            Modern digital security relies entirely on hard mathematical problems: factoring large integers, computing discrete logarithms in finite fields, finding points on elliptic curves, and solving high-dimensional shortest vector problems. This course bridges strict mathematical proofs with client-side interactive algorithmic implementations.
          </p>

          <Callout type="tip" title="100% Client-Side Interactive Exploration">
            All visualizers and algorithmic demonstrations execute completely inside your web browser using pure client-side web technologies. No remote backend execution or API keys required.
          </Callout>
        </div>
      </Section>

      <Section id="outcomes" title="Learning Outcomes">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {learningOutcomes.map((outcome, idx) => (
            <Card key={idx} className="bg-card/60">
              <CardHeader className="p-5 flex flex-row items-start gap-3 space-y-0">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Outcome 0{idx + 1}
                  </span>
                  <p className="text-sm font-medium text-foreground leading-relaxed">
                    {outcome}
                  </p>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="structure" title="Course Structure & Metrics">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center space-y-2">
            <div className="p-3 rounded-full bg-primary/10 text-primary w-fit mx-auto">
              <BookOpen className="h-6 w-6" />
            </div>
            <p className="text-3xl font-extrabold text-foreground">{syllabusModules.length}</p>
            <p className="text-xs font-semibold text-muted-foreground uppercase">Core Modules</p>
          </Card>

          <Card className="p-6 text-center space-y-2">
            <div className="p-3 rounded-full bg-primary/10 text-primary w-fit mx-auto">
              <GraduationCap className="h-6 w-6" />
            </div>
            <p className="text-3xl font-extrabold text-foreground">{totalLessons}</p>
            <p className="text-xs font-semibold text-muted-foreground uppercase">Interactive Lessons</p>
          </Card>

          <Card className="p-6 text-center space-y-2">
            <div className="p-3 rounded-full bg-primary/10 text-primary w-fit mx-auto">
              <Sparkles className="h-6 w-6" />
            </div>
            <p className="text-3xl font-extrabold text-foreground">14 Weeks</p>
            <p className="text-xs font-semibold text-muted-foreground uppercase">Estimated Pace</p>
          </Card>

          <Card className="p-6 text-center space-y-2">
            <div className="p-3 rounded-full bg-primary/10 text-primary w-fit mx-auto">
              <Cpu className="h-6 w-6" />
            </div>
            <p className="text-3xl font-extrabold text-foreground">PQC Ready</p>
            <p className="text-xs font-semibold text-muted-foreground uppercase">Lattice Cryptography</p>
          </Card>
        </div>
      </Section>
    </div>
  )
}
