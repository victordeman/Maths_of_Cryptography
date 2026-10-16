import Link from "next/link"
import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-8 md:py-12 mt-auto">
      <div className="container max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <Shield className="h-4 w-4" />
          <span>Mathematics of Cryptography</span>
        </div>
        <p className="text-center md:text-left text-xs sm:text-sm">
          A modern academic course platform exploring foundational number theory, abstract algebra, and post-quantum cryptography.
        </p>
        <div className="flex items-center gap-4 text-xs sm:text-sm">
          <Link href="/modules" className="hover:underline">
            Modules
          </Link>
          <Link href="/resources" className="hover:underline">
            Resources
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
        </div>
      </div>
    </footer>
  )
}
