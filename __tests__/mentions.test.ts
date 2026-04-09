import { describe, it, expect } from 'vitest'
import { linkifyUrls, injectMentionsIntoHtml } from '@/lib/mentions'
import type { Person } from '@/lib/types'

function makePerson(name: string): Person {
  return { id: crypto.randomUUID(), name, emoji: '👤' }
}

// ── linkifyUrls ────────────────────────────────────────────────────────────────

describe('linkifyUrls', () => {
  it('wraps bare URLs in anchor tags', () => {
    const result = linkifyUrls('Visit https://example.com for more.')
    expect(result).toContain('<a href="https://example.com"')
    expect(result).toContain('target="_blank"')
  })

  it('strips trailing punctuation from the URL', () => {
    const result = linkifyUrls('See https://example.com.')
    expect(result).toContain('href="https://example.com"')
    expect(result).toContain('</a>.')  // period is appended after the closing tag
  })

  it('does not double-wrap an existing anchor tag', () => {
    const html = '<a href="https://example.com">link</a>'
    expect(linkifyUrls(html)).toBe(html)
  })

  it('does not linkify plain text without a URL', () => {
    const result = linkifyUrls('just some text')
    expect(result).not.toContain('<a')
  })

  it('returns empty string for empty input', () => {
    expect(linkifyUrls('')).toBe('')
  })
})

// ── injectMentionsIntoHtml ─────────────────────────────────────────────────────

describe('injectMentionsIntoHtml', () => {
  it('wraps @PersonName in a mention span', () => {
    const people = [makePerson('Alice')]
    const result = injectMentionsIntoHtml('Hello @Alice today', people)
    expect(result).toContain('<span data-mention="Alice"')
    expect(result).toContain('@Alice')
  })

  it('is case-insensitive when matching names', () => {
    const people = [makePerson('Alice')]
    const result = injectMentionsIntoHtml('Hello @alice today', people)
    expect(result).toContain('data-mention="alice"')
  })

  it('does not double-wrap an already-wrapped mention span', () => {
    const people = [makePerson('Alice')]
    const existing = '<span data-note-mention="abc" contenteditable="false">@Alice</span>'
    const result = injectMentionsIntoHtml(existing, people)
    // Should not add another span around it
    expect(result.match(/<span/g)?.length ?? 0).toBe(1)
  })

  it('skips HTML tags (does not inject inside attributes)', () => {
    const people = [makePerson('Alice')]
    const html = '<em class="alice-class">no mention here</em>'
    const result = injectMentionsIntoHtml(html, people)
    expect(result).toBe(html)   // unchanged — no @Alice pattern
  })

  it('returns unchanged html when people list is empty', () => {
    const html = 'Hello @Alice'
    expect(injectMentionsIntoHtml(html, [])).toBe(html)
  })

  it('returns empty string for empty input', () => {
    expect(injectMentionsIntoHtml('', [makePerson('Alice')])).toBe('')
  })
})
