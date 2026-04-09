import { describe, it, expect, vi, beforeAll } from 'vitest'

// jsdom provides window, so DOMPurify will be active in these tests.
import { sanitizeHtml } from '@/lib/sanitize'

describe('sanitizeHtml', () => {
  it('returns an empty string for empty input', () => {
    expect(sanitizeHtml('')).toBe('')
  })

  it('passes through safe formatting tags', () => {
    const html = '<strong>bold</strong> and <em>italic</em>'
    expect(sanitizeHtml(html)).toBe(html)
  })

  it('strips <script> tags', () => {
    const result = sanitizeHtml('<script>alert("xss")</script>hello')
    expect(result).not.toContain('<script>')
    expect(result).not.toContain('alert')
    expect(result).toContain('hello')
  })

  it('strips event handler attributes (onclick etc.)', () => {
    const result = sanitizeHtml('<span onclick="evil()">text</span>')
    expect(result).not.toContain('onclick')
    expect(result).toContain('text')
  })

  it('strips javascript: href values', () => {
    const result = sanitizeHtml('<a href="javascript:alert(1)">click</a>')
    expect(result).not.toContain('javascript:')
  })

  it('preserves allowed data-* attributes used by mention chips', () => {
    const html = '<span data-mention="Alice" class="underline">@Alice</span>'
    const result = sanitizeHtml(html)
    expect(result).toContain('data-mention="Alice"')
  })

  it('preserves allowed data-* attributes used by date chips', () => {
    const html = '<span data-type="date" data-date="2025-01-01" data-dateid="abc123">Jan 1, 2025</span>'
    const result = sanitizeHtml(html)
    expect(result).toContain('data-date="2025-01-01"')
    expect(result).toContain('data-dateid="abc123"')
  })

  it('preserves anchor tags with safe hrefs', () => {
    const html = '<a href="https://example.com" target="_blank" rel="noopener noreferrer">link</a>'
    const result = sanitizeHtml(html)
    expect(result).toContain('href="https://example.com"')
  })
})
