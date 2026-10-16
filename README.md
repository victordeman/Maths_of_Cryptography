# Mathematics of Cryptography — Open Courseware

An open-source, interactive web course for **Mathematics of Cryptography**, designed for computer scientists, cybersecurity engineers, and mathematicians.

Mirroring the design language and component structure of modern open courseware platforms, this project provides rigorous mathematical foundations alongside live, client-side interactive cryptography labs.

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- **Node.js**: v18.x or v20.x+
- **npm**: v9.x+

### Setup Commands
```bash
# 1. Clone the repository
git clone https://github.com/organization/mathematics-of-cryptography.x
cd mathematics-of-cryptography

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling & Design**: [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Mathematics Rendering**: [KaTeX](https://katex.org/) (rendered securely via custom `FormattedText` component)
- **Icons**: [Lucide React](https://lucide.react.dev/)
- **Theme Support**: `next-themes` (Dark Mode & Light Mode support)
- **Persistence**: `localStorage` (Client-side lesson completion, quiz scores, and challenge progress)

---

## 🔒 Zero External Dependencies / Backend Requirements

This courseware is completely **self-contained and zero-backend**:
- **No Database**: All course metadata, syllabus structures, lesson content, and quizzes are stored in strongly typed TypeScript modules in `src/data/`.
- **No Environment Variables / API Keys Required**: All interactive cryptographic tools (Caesar cipher, Frequency analysis, Modular arithmetic, Diffie-Hellman key exchange, RSA key generator, and Elliptic curve point addition) are pure client-side algorithms.
- **No Authentication Required**: User progress is stored locally in the browser's `localStorage`.

---

## 📖 Single Source of Truth: The Syllabus

The course content is strictly driven by `src/data/syllabus.ts`. Every module, topic, and lesson directly corresponds to the 6 core modules:

1. **Foundations of Number Theory & Modular Arithmetic**
2. **Abstract Algebra for Cryptography**
3. **Symmetric Cryptography & Information Theory**
4. **Public-Key Cryptography & Hard Problems**
5. **Elliptic Curve Cryptography (ECC)**
6. **Advanced Topics & Modern Cryptography**

---

## ➕ How to Add or Modify a Lesson

1. **Update `src/data/syllabus.ts`**:
   Add a new `Lesson` object to the appropriate `Module` in `syllabusModules`:
   ```ts
   {
     slug: "new-cryptographic-primitive",
     title: "New Cryptographic Primitive",
     order: 4,
     description: "Overview of the new primitive...",
     estimatedTime: "2 Hours",
     keyTopics: ["Topic A", "Topic B"]
   }
   ```

2. **Add Content in `src/data/lessons/`**:
   Create or edit the relevant module file in `src/data/lessons/` (e.g., `module1.ts`):
   ```ts
   export const newLessonDetail: LessonDetail = {
     slug: "new-cryptographic-primitive",
     moduleSlug: "foundations-number-theory",
     sections: [
       {
         id: "overview",
         title: "Overview",
         content: "Mathematical description using LaTeX like $E(m) = m^e \\bmod n$...",
         callout: {
           type: "note",
           title: "Key Takeaway",
           content: "Note content here..."
         }
       }
     ],
     summaryTakeaways: ["Takeaway 1", "Takeaway 2"]
   }
   ```

3. **Export from `src/data/lessons/index.ts`**:
   Include the new `LessonDetail` in `allLessonDetails`.

4. **Static Page Generation**:
   Next.js will automatically detect the new slug during `npm run build` and generate static pages for `/lessons/[slug]` and `/modules/[moduleSlug]/[lessonSlug]`.

---

## 🧪 Build & Lint Checks

```bash
# Run ESLint checks
npm run lint

# Build production static bundle
npm run build
```

---

## 🌐 Deploying to Vercel

1. Push your changes to GitHub.
2. Import the repository in [Vercel](https://vercel.com/).
3. Framework Preset: **Next.js**.
4. Build Command: `npm run build`.
5. Output Directory: `.next`.
6. Click **Deploy** (No environment variables required).
