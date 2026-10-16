import { MetadataRoute } from "next"
import { syllabusModules } from "@/data/syllabus"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mathematics-of-cryptography.vercel.app"

  const staticRoutes = [
    "",
    "/modules",
    "/lessons",
    "/challenges",
    "/about",
    "/prerequisites",
    "/resources",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }))

  const moduleRoutes = syllabusModules.map((mod) => ({
    url: `${baseUrl}/modules/${mod.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const lessonRoutes = syllabusModules.flatMap((mod) =>
    mod.lessons.map((les) => ({
      url: `${baseUrl}/lessons/${les.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  )

  const nestedLessonRoutes = syllabusModules.flatMap((mod) =>
    mod.lessons.map((les) => ({
      url: `${baseUrl}/modules/${mod.slug}/${les.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  )

  return [...staticRoutes, ...moduleRoutes, ...lessonRoutes, ...nestedLessonRoutes]
}
