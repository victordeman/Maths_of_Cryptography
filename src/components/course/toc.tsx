import { List } from "lucide-react"

export interface TOCItem {
  id: string
  title: string
  level?: number
}

interface TableOfContentsProps {
  items: TOCItem[]
  className?: string
}

export function TableOfContents({ items, className = "" }: TableOfContentsProps) {
  if (!items || items.length === 0) return null

  return (
    <div className={`rounded-xl border bg-card p-4 space-y-3 ${className}`}>
      <div className="flex items-center gap-2 font-semibold text-xs uppercase tracking-wider text-muted-foreground border-b pb-2">
        <List className="h-4 w-4 text-primary" />
        <span>On This Page</span>
      </div>
      <nav aria-label="Table of contents">
        <ul className="space-y-2 text-xs sm:text-sm">
          {items.map((item) => (
            <li key={item.id} className={item.level === 2 ? "pl-3" : ""}>
              <a
                href={`#${item.id}`}
                className="text-muted-foreground hover:text-foreground transition-colors block py-0.5 line-clamp-1"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
