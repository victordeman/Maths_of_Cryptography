export interface Resource {
  title: string;
  category: "Book" | "Paper" | "Software" | "Course";
  description: string;
  url?: string;
}

export const courseResources: Resource[] = [
  {
    title: "An Introduction to Mathematical Cryptography",
    category: "Book",
    description: "By Jeffrey Hoffstein, Jill Pipher, and J.H. Silverman. An excellent undergraduate-level introduction to modern cryptography from a mathematical perspective.",
  },
  {
    title: "Handbook of Applied Cryptography",
    category: "Book",
    description: "By A. Menezes, P. van Oorschot, and S. Vanstone. A classic comprehensive reference for cryptographic algorithms and protocols.",
  },
];
