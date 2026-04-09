import { describe, it, expect, beforeEach } from 'vitest'
import { buildTree } from '@/lib/storage'
import type { Folder, Note } from '@/lib/types'

function makeFolder(id: string, parentId: string | null = null): Folder {
  return { id, name: `Folder ${id}`, emoji: '📁', parentId, createdAt: 0 }
}

function makeNote(id: string, folderId?: string | null): Note {
  return {
    id,
    title: `Note ${id}`,
    emoji: 'FileText',
    color: '#fff',
    tags: [],
    blocks: [],
    properties: [],
    createdAt: 0,
    updatedAt: 0,
    folderId,
  }
}

// ── buildTree ──────────────────────────────────────────────────────────────────

describe('buildTree', () => {
  it('returns an empty array for no folders or notes', () => {
    expect(buildTree([], [])).toEqual([])
  })

  it('places root-level notes (no folderId) at the top level', () => {
    const notes = [makeNote('n1'), makeNote('n2')]
    const tree = buildTree([], notes)
    expect(tree).toHaveLength(2)
    expect(tree.every(i => i.kind === 'note')).toBe(true)
  })

  it('places root-level folders at the top level', () => {
    const folders = [makeFolder('f1'), makeFolder('f2')]
    const tree = buildTree(folders, [])
    expect(tree).toHaveLength(2)
    expect(tree.every(i => i.kind === 'folder')).toBe(true)
  })

  it('nests notes inside their parent folder', () => {
    const folders = [makeFolder('f1')]
    const notes = [makeNote('n1', 'f1'), makeNote('n2')]
    const tree = buildTree(folders, notes)

    // Top level: folder + orphan note
    expect(tree).toHaveLength(2)
    const folderItem = tree.find(i => i.kind === 'folder')!
    if (folderItem.kind !== 'folder') throw new Error()
    expect(folderItem.children).toHaveLength(1)
    expect(folderItem.children[0].kind).toBe('note')
  })

  it('nests folders recursively', () => {
    const folders = [makeFolder('parent'), makeFolder('child', 'parent')]
    const tree = buildTree(folders, [])

    expect(tree).toHaveLength(1)
    const root = tree[0]
    if (root.kind !== 'folder') throw new Error()
    expect(root.children).toHaveLength(1)
    expect(root.children[0].kind).toBe('folder')
  })

  it('does not include notes with a folderId that does not exist at the root level', () => {
    // Note references a non-existent folder — buildTree uses folderId match so
    // it will appear at the wrong level; this test documents current behaviour.
    const notes = [makeNote('n1', 'ghost-folder')]
    const tree = buildTree([], notes)
    // Since no folder matches 'ghost-folder', the note won't appear at root (parentId=null)
    expect(tree).toHaveLength(0)
  })
})
