import type { Person } from "../types"
import { cn } from "@/lib/utils"

// Lightweight rich-text renderer that supports:
// - **bold**
// - *italic*
// - ==highlight==
// and then applies @mention styling inside each segment.
export function renderMentions(
  text: string,
  people: Person[],
  onNavigateTo?: (noteId: string) => void
): React.ReactNode {
  if (!text) return null

  const tokens = tokenizeFormatting(text)
  const nodes: React.ReactNode[] = []
  let key = 0

  for (const token of tokens) {
    const content = renderMentionsInPlainText(token.text, people, onNavigateTo, () => key++)
    if (token.type === "bold") {
      nodes.push(<strong key={key++}>{content}</strong>)
    } else if (token.type === "italic") {
      nodes.push(
        <span key={key++} className="italic">
          {content}
        </span>
      )
    } else if (token.type === "highlight") {
      nodes.push(
        <mark
          key={key++}
          className="rounded-sm bg-yellow-200/60 px-0.5 py-0.5 text-foreground"
        >
          {content}
        </mark>
      )
    } else {
      nodes.push(<span key={key++}>{content}</span>)
    }
  }

  return nodes.length > 0 ? <>{nodes}</> : <>{text}</>
}

type FormatType = "bold" | "italic" | "highlight" | null

interface FormatToken {
  type: FormatType
  text: string
}

function tokenizeFormatting(text: string): FormatToken[] {
  const tokens: FormatToken[] = []
  if (!text) return tokens

  // Simple, non-nested parsing of **bold**, *italic*, ==highlight==
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|==[^=]+==)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: null, text: text.slice(lastIndex, match.index) })
    }
    const raw = match[0]
    if (raw.startsWith("**")) {
      tokens.push({ type: "bold", text: raw.slice(2, -2) })
    } else if (raw.startsWith("==")) {
      tokens.push({ type: "highlight", text: raw.slice(2, -2) })
    } else if (raw.startsWith("*")) {
      tokens.push({ type: "italic", text: raw.slice(1, -1) })
    } else {
      tokens.push({ type: null, text: raw })
    }
    lastIndex = match.index + raw.length
  }

  if (lastIndex < text.length) {
    tokens.push({ type: null, text: text.slice(lastIndex) })
  }

  return tokens
}

function renderMentionsInPlainText(
  text: string,
  people: Person[],
  onNavigateTo: ((noteId: string) => void) | undefined,
  nextKey: () => number
): React.ReactNode {
  if (!text) return null
  const names = people
    .map((p) => p.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .filter(Boolean)
  if (names.length === 0) return <>{text}</>

  const mentionRe = new RegExp(`@(${names.join("|")})`, "gi")
  const segments: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  mentionRe.lastIndex = 0

  while ((match = mentionRe.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push(<span key={nextKey()}>{text.slice(lastIndex, match.index)}</span>)
    }
    const capturedName = match[1]
    segments.push(
      <span
        key={nextKey()}
        className={cn(
          "underline decoration-dotted underline-offset-2 font-medium text-foreground/90",
          onNavigateTo && "cursor-pointer hover:text-primary transition-colors"
        )}
        onClick={
          onNavigateTo
            ? (e) => {
                e.stopPropagation()
                const person = people.find(
                  (p) => p.name.toLowerCase() === capturedName.toLowerCase()
                )
                if (person?.noteId) onNavigateTo(person.noteId)
              }
            : undefined
        }
      >
        {capturedName}
      </span>
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    segments.push(<span key={nextKey()}>{text.slice(lastIndex)}</span>)
  }

  return segments.length > 0 ? <>{segments}</> : <>{text}</>
}

