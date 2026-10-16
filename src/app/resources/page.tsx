"use client"

import { useState } from "react"
import { PageHeader, Section, Breadcrumb } from "@/components/course"
import { courseResources } from "@/data/resources"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, BookOpen, FileText, Code2, GraduationCap, Wrench, Layers } from "lucide-react"

const categoryIcons = {
  Book: BookOpen,
  Paper: FileText,
  Software: Code2,
  Course: GraduationCap,
  Tool: Wrench,
}

const categories = ["All", "Book", "Paper", "Software", "Course", "Tool"] as const

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const filteredResources =
    selectedCategory === "All"
      ? courseResources
      : courseResources.filter((res) => res.category === selectedCategory)

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      <Breadcrumb items={[{ label: "Resources" }]} />

      <PageHeader
        badge="Reference Library"
        title="Course Resources"
        description="A curated collection of foundational textbooks, seminal research papers, mathematical software suites, and standardization documents for studying modern cryptography."
      />

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b pb-4">
        <span className="text-xs font-semibold text-muted-foreground mr-2 flex items-center gap-1">
          <Layers className="h-3.5 w-3.5 text-primary" /> Filter by:
        </span>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
            className="text-xs rounded-full px-3 py-1 h-auto"
          >
            {cat}
            {cat === "All" ? ` (${courseResources.length})` : ` (${courseResources.filter(r => r.category === cat).length})`}
          </Button>
        ))}
      </div>

      <Section className="pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res, idx) => {
            const Icon = categoryIcons[res.category] || BookOpen
            return (
              <Card key={idx} className="flex flex-col justify-between hover:shadow-md transition-shadow">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1 text-[11px]">
                      <Icon className="h-3 w-3 text-primary" />
                      {res.category}
                    </Badge>
                  </div>

                  <CardTitle className="text-lg font-bold leading-snug">
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors flex items-start justify-between gap-2"
                    >
                      <span>{res.title}</span>
                      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                    </a>
                  </CardTitle>

                  {res.author && (
                    <p className="text-xs font-medium text-muted-foreground">
                      By {res.author}
                    </p>
                  )}

                  <CardDescription className="text-xs sm:text-sm leading-relaxed">
                    {res.description}
                  </CardDescription>
                </CardHeader>

                <CardFooter className="pt-2">
                  <Button variant="outline" size="sm" asChild className="w-full gap-2 text-xs">
                    <a href={res.url} target="_blank" rel="noopener noreferrer">
                      Access Resource
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </Section>
    </div>
  )
}
