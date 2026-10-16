import { PageHeader, Section, Callout, Breadcrumb } from "@/components/course"
import { prerequisites } from "@/data/outcomes"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2, ArrowRight, BookMarked, Calculator, Binary, Code2 } from "lucide-react"

export const metadata = {
  title: "Prerequisites | Mathematics of Cryptography",
  description: "Recommended mathematical background and technical prerequisites for Mathematics of Cryptography.",
}

const detailedPrereqs = [
  {
    title: "Discrete Mathematics",
    icon: BookMarked,
    summary: "Sets, logic, relations, mathematical induction, divisibility, and modular congruences.",
    topics: [
      "Modular arithmetic notation ($a \\equiv b \\pmod m$)",
      "Set operations, equivalence classes, and partition theory",
      "Direct proofs, proofs by contradiction, and mathematical induction",
      "Basic graph theory and combinatorial logic",
    ],
  },
  {
    title: "Linear Algebra",
    icon: Calculator,
    summary: "Vectors, matrices, linear transformations, vector spaces, and finite fields.",
    topics: [
      "Matrix operations, determinants, and matrix inversion",
      "Vector spaces and subspaces over $\\mathbb{R}$ and $\\mathbb{F}_p$",
      "Basis, dimension, and rank-nullity theorem",
      "Eigenvalues, eigenvectors, and lattice basis reduction basics",
    ],
  },
  {
    title: "Basic Probability & Information Theory",
    icon: Binary,
    summary: "Random variables, probability distributions, entropy, and information-theoretic secrecy.",
    topics: [
      "Discrete probability distributions and expectation",
      "Conditional probability and Bayes' Theorem",
      "Shannon entropy and perfect secrecy concepts",
      "Pseudo-randomness and statistical distance",
    ],
  },
  {
    title: "Programming Proficiency",
    icon: Code2,
    summary: "Python or TypeScript for algorithmic logic, big integer math, and interactive components.",
    topics: [
      "Functions, loops, data structures, and algorithmic complexity $O(n)$",
      "Working with arbitrary-precision arithmetic (BigInt / Python int)",
      "Bitwise operations (AND, OR, XOR, shifts) for symmetric ciphers",
      "Basic understanding of client-side web applications",
    ],
  },
]

export default function PrerequisitesPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      <Breadcrumb items={[{ label: "Prerequisites" }]} />

      <PageHeader
        badge="Preparation Guide"
        title="Course Prerequisites"
        description="To derive the greatest benefit from this course, students should possess a foundation in discrete mathematics, linear algebra, basic probability, and programming."
      />

      <Section id="quick-summary" title="Required Foundational Skills">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prerequisites.map((req, idx) => (
            <Card key={idx} className="bg-card/60">
              <CardHeader className="p-5 flex flex-row items-center gap-3 space-y-0">
                <span className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 text-primary font-bold text-sm shrink-0">
                  0{idx + 1}
                </span>
                <p className="text-sm font-semibold text-foreground leading-snug">
                  {req}
                </p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="detailed-breakdown" title="Detailed Breakdown by Subject">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {detailedPrereqs.map((prereq, idx) => {
            const Icon = prereq.icon
            return (
              <Card key={idx} className="flex flex-col justify-between">
                <CardHeader className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <Badge variant="outline" className="text-[10px] uppercase tracking-wider mb-1">
                        Domain 0{idx + 1}
                      </Badge>
                      <CardTitle className="text-lg font-bold">{prereq.title}</CardTitle>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {prereq.summary}
                  </p>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block border-b pb-1">
                    Key Topics to Review
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    {prereq.topics.map((topic, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Section>

      <Section id="readiness" title="Self-Assessment & Next Steps">
        <div className="rounded-xl border bg-card p-6 sm:p-8 space-y-6">
          <Callout type="tip" title="Self-Assessment Question">
            Can you compute $7^{100} \pmod{13}$ by hand using Fermat&apos;s Little Theorem, or write a function to compute $\gcd(a, b)$? If so, you possess the mathematical intuition needed for Module 1!
          </Callout>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="space-y-1">
              <h4 className="font-bold text-foreground">Ready to test your knowledge?</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Begin with Module 1: Foundations of Number Theory & Modular Arithmetic.
              </p>
            </div>
            <Button size="lg" asChild className="gap-2 shrink-0">
              <Link href="/modules/foundations-number-theory">
                Start Module 1
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
