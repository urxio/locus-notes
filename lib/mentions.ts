import { Person } from "./types"

/**
 * Wraps bare http/https URLs in <a> tags for clickable hyperlinks.
 * Skips text that is already inside an existing <a> tag.
 */
export function linkifyUrls(html: string): string {
    if (!html) return ''
    const re = /(<a[\s>][\s\S]*?<\/a>|<[^>]*>)|(https?:\/\/[^\s<>"']+)/gi
    return html.replace(re, (_, tag, url) => {
        if (tag) return tag
        // Strip trailing punctuation that ends sentences but isn't part of the URL
        const trailing = url.match(/[.,;:!?)\]>'"]+$/)?.[0] ?? ''
        const clean = trailing ? url.slice(0, -trailing.length) : url
        return `<a href="${clean}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-600 transition-colors">${clean}</a>${trailing}`
    })
}

export function injectMentionsIntoHtml(html: string, people: Person[]): string {
    if (!html) return ''
    const names = people.map(p => p.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).filter(Boolean)
    if (names.length === 0) return html
    const mentionRe = new RegExp(`(<[^>]*>)|(@(?:${names.join('|')}))`, 'gi')
    return html.replace(mentionRe, (match, tag, name) => {
        if (tag) return match
        return `<span data-mention="${name.slice(1)}" class="underline decoration-dotted underline-offset-2 font-medium text-foreground/90 cursor-pointer hover:text-primary transition-colors">${match}</span>`
    })
}
