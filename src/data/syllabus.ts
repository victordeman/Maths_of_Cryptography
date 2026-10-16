export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  moduleSlug: string;
  order: number;
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export const syllabusModules: Module[] = [
  {
    id: "mod-1",
    slug: "foundations-number-theory",
    title: "1. Foundations of Number Theory & Modular Arithmetic",
    description: "Divisibility, Euclidean Algorithm, Modular Arithmetic, Chinese Remainder Theorem, Euler's Totient Function.",
    lessons: [
      {
        id: "l1-1",
        slug: "divisibility-euclidean-algorithm",
        title: "Divisibility & The Euclidean Algorithm",
        description: "Greatest common divisors, Bezout's identity, and the Extended Euclidean Algorithm.",
        moduleSlug: "foundations-number-theory",
        order: 1,
      },
    ],
  },
]
