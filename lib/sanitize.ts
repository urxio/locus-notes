/**
 * HTML sanitization utility using DOMPurify.
 *
 * DOMPurify is browser-only (requires a DOM). This module guards against SSR
 * by returning the input unchanged when `window` is unavailable — components
 * that use dangerouslySetInnerHTML are always client-rendered so the output
 * is only ever injected after DOMPurify has run on the client.
 */

import DOMPurify from 'dompurify'

// Allowed tags for block content: formatting spans, links, bold/italic, code,
// date chips, and mention chips are all included.
const ALLOWED_TAGS = [
  'span', 'a', 'strong', 'em', 'b', 'i', 'u', 's', 'code', 'br',
]

// Allowed attributes — includes everything used by mention chips, date chips,
// and linkified anchors.
const ALLOWED_ATTR = [
  'href', 'target', 'rel',
  'class', 'style',
  'contenteditable',
  'data-mention',
  'data-note-mention',
  'data-type',
  'data-date',
  'data-dateid',
]

/**
 * Sanitize an HTML string before injecting it via dangerouslySetInnerHTML.
 * Strips script tags, event handlers, and javascript: URLs while preserving
 * all formatting and mention/date chip markup used by the editor.
 *
 * Safe to call on the server (returns html unchanged; no DOM injection occurs
 * server-side anyway).
 */
export function sanitizeHtml(html: string): string {
  if (!html) return ''
  if (typeof window === 'undefined') return html
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
  })
}
