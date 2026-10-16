import Link from "next/link"
import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-8 md:py-12 mt-auto">
      <div className="container max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <Shield className="h-4 w-4 shrink-0 text-primary" />
            <span>Mathematics of Cryptography</span>
          </div>
          <span className="hidden md:inline text-muted-foreground/40">|</span>
          <p className="text-xs sm:text-sm max-w-md">
            Foundational number theory, abstract algebra, and modern cryptographic protocols.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm">
          <Link href="/modules" className="hover:text-foreground transition-colors">
            Modules
          </Link>
          <Link href="/lessons" className="hover:text-foreground transition-colors">
            Lessons
          </Link>
          <Link href="/resources" className="hover:text-foreground transition-colors">
            Resources
          </Link>
          <Link href="/about" className="hover:text-foreground transition-colors">
            About
          </Link>
          <a
            href="https://github.com/victordeman/Introduction-to-AI"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
