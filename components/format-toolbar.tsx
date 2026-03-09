import React, { useState, useEffect, useCallback, useRef } from "react"
import { Bold, Italic, Strikethrough, Palette, Underline, X, Link } from "lucide-react"

const COLORS = [
    { label: 'Default', text: 'inherit',    highlight: 'transparent' },
    { label: 'Gray',    text: '#6b7280',    highlight: 'rgba(107,114,128,0.2)' },
    { label: 'Red',     text: '#ef4444',    highlight: 'rgba(239,68,68,0.2)' },
    { label: 'Orange',  text: '#f97316',    highlight: 'rgba(249,115,22,0.2)' },
    { label: 'Yellow',  text: '#eab308',    highlight: 'rgba(234,179,8,0.2)' },
    { label: 'Green',   text: '#22c55e',    highlight: 'rgba(34,197,94,0.2)' },
    { label: 'Blue',    text: '#3b82f6',    highlight: 'rgba(59,130,246,0.2)' },
    { label: 'Purple',  text: '#a855f7',    highlight: 'rgba(168,85,247,0.2)' },
    { label: 'Pink',    text: '#ec4899',    highlight: 'rgba(236,72,153,0.2)' },
]

export function FormatToolbar() {
    const [position, setPosition] = useState<{ top: number; left: number } | null>(null)
    const [showColors, setShowColors] = useState(false)
    const [showLink, setShowLink] = useState(false)
    const [linkUrl, setLinkUrl] = useState('')
    const savedRangeRef = useRef<Range | null>(null)
    const linkInputRef = useRef<HTMLInputElement>(null)
    // Ref so updatePosition can read showLink without stale closure
    const showLinkRef = useRef(false)
    useEffect(() => { showLinkRef.current = showLink }, [showLink])

    const updatePosition = useCallback(() => {
        const sel = window.getSelection()
        if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
            // Don't close toolbar while link URL input is open
            if (showLinkRef.current) return
            setPosition(null)
            setShowColors(false)
            return
        }
        const range = sel.getRangeAt(0)
        // Only show toolbar if selection is inside a contenteditable
        let node = range.startContainer as HTMLElement | null
        if (node && node.nodeType === Node.TEXT_NODE) node = node.parentElement
        if (!node || node.closest('[contenteditable="false"]') || !node.closest('[contenteditable="true"]')) {
            setPosition(null)
            setShowColors(false)
            return
        }
        const rect = range.getBoundingClientRect()
        setPosition({
            top: rect.top - 40,
            left: rect.left + rect.width / 2
        })
    }, [])

    useEffect(() => {
        document.addEventListener('selectionchange', updatePosition)
        return () => document.removeEventListener('selectionchange', updatePosition)
    }, [updatePosition])

    if (!position) return null

    const exec = (cmd: string, val?: string) => {
        document.execCommand(cmd, false, val)
        // Keep focus and selection
        setTimeout(updatePosition, 10)
    }

    const handleLinkClick = () => {
        const sel = window.getSelection()
        if (sel && sel.rangeCount > 0) {
            savedRangeRef.current = sel.getRangeAt(0).cloneRange()
        }
        setShowLink(true)
        setLinkUrl('')
        setTimeout(() => linkInputRef.current?.focus(), 30)
    }

    const handleLinkSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const raw = linkUrl.trim()
        if (!raw) { setShowLink(false); return }
        const url = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
        // Restore saved selection then insert link
        const sel = window.getSelection()
        if (savedRangeRef.current && sel) {
            sel.removeAllRanges()
            sel.addRange(savedRangeRef.current)
        }
        document.execCommand('createLink', false, url)
        setShowLink(false)
        setLinkUrl('')
        savedRangeRef.current = null
    }

    return (
        <div
            className="fixed z-50 transform -translate-x-1/2 flex items-center bg-popover border shadow-lg rounded-md px-1 py-1 gap-0.5"
            style={{ top: Math.max(10, position.top), left: position.left }}
            onMouseDown={e => e.preventDefault()} // Keep selection
        >
            {showLink ? (
                <form onSubmit={handleLinkSubmit} className="flex items-center gap-1 px-1">
                    <Link className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <input
                        ref={linkInputRef}
                        type="text"
                        value={linkUrl}
                        onChange={e => setLinkUrl(e.target.value)}
                        onMouseDown={e => e.stopPropagation()}
                        placeholder="https://..."
                        className="text-xs bg-transparent outline-none border-b border-border focus:border-primary w-44 py-0.5 text-foreground placeholder:text-muted-foreground/50 transition-colors"
                    />
                    <button type="submit" className="w-6 h-6 rounded hover:bg-muted flex items-center justify-center text-foreground/80 hover:text-foreground transition-colors" title="Apply link">
                        <span className="text-xs font-medium">↵</span>
                    </button>
                    <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => setShowLink(false)} className="w-6 h-6 rounded hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                        <X className="w-3 h-3" />
                    </button>
                </form>
            ) : !showColors ? (
                <>
                    <button onMouseDown={e => e.preventDefault()} onClick={() => exec('bold')} className="w-8 h-8 rounded hover:bg-muted flex items-center justify-center text-foreground/80 hover:text-foreground transition-colors" title="Bold (Cmd+B)"><Bold className="w-4 h-4" /></button>
                    <button onMouseDown={e => e.preventDefault()} onClick={() => exec('italic')} className="w-8 h-8 rounded hover:bg-muted flex items-center justify-center text-foreground/80 hover:text-foreground transition-colors" title="Italic (Cmd+I)"><Italic className="w-4 h-4" /></button>
                    <button onMouseDown={e => e.preventDefault()} onClick={() => exec('underline')} className="w-8 h-8 rounded hover:bg-muted flex items-center justify-center text-foreground/80 hover:text-foreground transition-colors" title="Underline (Cmd+U)"><Underline className="w-4 h-4" /></button>
                    <button onMouseDown={e => e.preventDefault()} onClick={() => exec('strikeThrough')} className="w-8 h-8 rounded hover:bg-muted flex items-center justify-center text-foreground/80 hover:text-foreground transition-colors" title="Strikethrough (Cmd+Shift+S)"><Strikethrough className="w-4 h-4" /></button>
                    <div className="w-px h-5 bg-border mx-1" />
                    <button onMouseDown={e => e.preventDefault()} onClick={handleLinkClick} className="w-8 h-8 rounded hover:bg-muted flex items-center justify-center text-foreground/80 hover:text-foreground transition-colors" title="Insert link">
                        <Link className="w-4 h-4" />
                    </button>
                    <div className="w-px h-5 bg-border mx-1" />
                    <button onMouseDown={e => e.preventDefault()} onClick={() => setShowColors(true)} className="w-8 h-8 rounded hover:bg-muted flex items-center justify-center text-foreground/80 hover:text-foreground transition-colors relative" title="Text Color & Highlight">
                        <Palette className="w-4 h-4" />
                    </button>
                </>
            ) : (
                <div className="flex flex-col gap-2 px-2 py-1 select-none">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase font-medium text-muted-foreground tracking-wider">Color</span>
                        <button onMouseDown={e => e.preventDefault()} onClick={() => setShowColors(false)} className="text-muted-foreground hover:text-foreground"><X className="w-3 h-3" /></button>
                    </div>
                    <div className="flex gap-1">
                        {COLORS.map(c => (
                            <button key={`t-${c.label}`} onMouseDown={e => e.preventDefault()} onClick={() => { exec('foreColor', c.text); setShowColors(false) }}
                                className="w-5 h-5 rounded-full border border-border/50 hover:scale-110 transition-transform flex items-center justify-center"
                                style={{ color: c.text === 'inherit' ? 'currentColor' : c.text }} title={c.label}>
                                <span className="text-[10px] font-bold">A</span>
                            </button>
                        ))}
                    </div>
                    <span className="text-[10px] uppercase font-medium text-muted-foreground tracking-wider mt-1">Background</span>
                    <div className="flex gap-1 pb-1">
                        {COLORS.map(c => (
                            <button key={`h-${c.label}`} onMouseDown={e => e.preventDefault()} onClick={() => { exec('hiliteColor', c.highlight); setShowColors(false) }}
                                className="w-5 h-5 rounded border border-border/50 hover:scale-110 transition-transform"
                                style={{ backgroundColor: c.highlight }} title={c.label} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
