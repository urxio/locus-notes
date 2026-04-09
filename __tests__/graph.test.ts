import { describe, it, expect } from 'vitest'
import { buildGraph, tickSim } from '@/lib/graph'
import type { Note, Person, GNode, GEdge } from '@/lib/types'

function makeNote(id: string, tags: string[] = [], blocks: { content: string }[] = []): Note {
  return {
    id,
    title: `Note ${id}`,
    emoji: 'FileText',
    color: '#fff',
    tags,
    blocks: blocks.map((b, i) => ({ id: `b${i}`, type: 'p', content: b.content })),
    properties: [],
    createdAt: 0,
    updatedAt: 0,
  }
}

function makePerson(id: string, name: string, noteId?: string): Person {
  return { id, name, emoji: '👤', noteId }
}

// ── buildGraph ─────────────────────────────────────────────────────────────────

describe('buildGraph', () => {
  it('creates one node per note and one per unique tag', () => {
    const notes = [
      makeNote('n1', ['alpha', 'beta']),
      makeNote('n2', ['beta', 'gamma']),
    ]
    const { nodes } = buildGraph(notes, [], 800, 600)
    const noteNodes = nodes.filter(n => n.type === 'note')
    const tagNodes  = nodes.filter(n => n.type === 'tag')
    expect(noteNodes).toHaveLength(2)
    expect(tagNodes).toHaveLength(3)        // alpha, beta, gamma — deduplicated
  })

  it('creates edges from each note to its tags', () => {
    const notes = [
      makeNote('n1', ['alpha']),
      makeNote('n2', ['beta']),
    ]
    const { edges } = buildGraph(notes, [], 800, 600)
    expect(edges).toContainEqual({ source: 'note:n1', target: 'tag:alpha' })
    expect(edges).toContainEqual({ source: 'note:n2', target: 'tag:beta' })
  })

  it('does not create duplicate edges for person mentions', () => {
    const person = makePerson('p1', 'Alice', 'nAlice')
    const notes = [
      makeNote('n1', [], [{ content: '@Alice mentioned twice @Alice' }]),
      makeNote('nAlice', []),
    ]
    const { edges } = buildGraph(notes, [person], 800, 600)
    const mentionEdges = edges.filter(
      e => e.source === 'note:n1' && e.target === 'note:nAlice'
    )
    expect(mentionEdges).toHaveLength(1)   // deduplicated — not 2
  })

  it('does not add a mention edge from a note to itself', () => {
    const person = makePerson('p1', 'Alice', 'n1')
    const notes = [makeNote('n1', [], [{ content: '@Alice' }])]
    const { edges } = buildGraph(notes, [person], 800, 600)
    const selfEdges = edges.filter(e => e.source === e.target)
    expect(selfEdges).toHaveLength(0)
  })

  it('creates page-mention edges from data-note-mention attributes', () => {
    const notes = [
      makeNote('n1', [], [{ content: `<span data-note-mention="n2">Note 2</span>` }]),
      makeNote('n2', []),
    ]
    const { edges } = buildGraph(notes, [], 800, 600)
    expect(edges).toContainEqual({ source: 'note:n1', target: 'note:n2' })
  })

  it('reuses existing node positions when existingNodes is provided', () => {
    const existing = new Map<string, GNode>([
      ['note:n1', { id: 'note:n1', type: 'note', label: 'Note n1', color: '#fff', x: 123, y: 456, vx: 0, vy: 0, r: 65 }],
    ])
    const notes = [makeNote('n1', [])]
    const { nodes } = buildGraph(notes, [], 800, 600, existing)
    const n1 = nodes.find(n => n.id === 'note:n1')!
    expect(n1.x).toBe(123)
    expect(n1.y).toBe(456)
  })
})

// ── tickSim ────────────────────────────────────────────────────────────────────

describe('tickSim', () => {
  it('clamps node positions within bounds', () => {
    const nodes: GNode[] = [
      { id: 'a', type: 'note', label: 'A', color: '#fff', x: -500, y: 9999, vx: 0, vy: 0, r: 65 },
      { id: 'b', type: 'note', label: 'B', color: '#fff', x: 400, y: 300, vx: 0, vy: 0, r: 65 },
    ]
    tickSim(nodes, [], 800, 600, 1)
    for (const n of nodes) {
      expect(n.x).toBeGreaterThanOrEqual(n.r + 10)
      expect(n.x).toBeLessThanOrEqual(800 - n.r - 10)
      expect(n.y).toBeGreaterThanOrEqual(n.r + 10)
      expect(n.y).toBeLessThanOrEqual(600 - n.r - 10)
    }
  })

  it('applies damping (velocity decays over ticks)', () => {
    const nodes: GNode[] = [
      { id: 'a', type: 'note', label: 'A', color: '#fff', x: 400, y: 300, vx: 100, vy: 100, r: 65 },
    ]
    tickSim(nodes, [], 800, 600, 1)
    expect(Math.abs(nodes[0].vx)).toBeLessThan(100)
    expect(Math.abs(nodes[0].vy)).toBeLessThan(100)
  })
})
