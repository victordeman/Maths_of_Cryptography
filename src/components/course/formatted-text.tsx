import React from "react"
import katex from "katex"

interface FormattedTextProps {
  text: string
  className?: string
}

export function FormattedText({ text, className = "" }: FormattedTextProps) {
  if (!text) return null

  // Process block math $$...$$ first, then inline math $...$
  const blockParts = text.split(/(\$\$.*?\$\$)/g)

  return (
    <div className={`space-y-2 leading-relaxed ${className}`}>
      {blockParts.map((part, pIdx) => {
        if (part.startsWith("$$") && part.endsWith("$$") && part.length > 4) {
          const math = part.slice(2, -2).trim()
          try {
            const html = katex.renderToString(math, { displayMode: true, throwOnError: false })
            return (
              <div
                key={pIdx}
                className="my-4 overflow-x-auto py-2 text-center"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            )
          } catch {
            return (
              <pre key={pIdx} className="font-mono text-xs my-2 p-2 bg-muted rounded">
                {math}
              </pre>
            )
          }
        }

        // Process inline math $...$
        const inlineTokens = part.split(/(\$.*?\$)/g)
        return (
          <span key={pIdx}>
            {inlineTokens.map((token, tIdx) => {
              if (token.startsWith("$") && token.endsWith("$") && token.length > 2) {
                const math = token.slice(1, -1).trim()
                try {
                  const html = katex.renderToString(math, { displayMode: false, throwOnError: false })
                  return (
                    <span
                      key={tIdx}
                      className="inline-math px-0.5"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  )
                } catch {
                  return (
                    <code key={tIdx} className="font-mono text-xs bg-muted px-1 py-0.5 rounded">
                      {math}
                    </code>
                  )
                }
              }
              return token
            })}
          </span>
        )
      })}
    </div>
  )
}
