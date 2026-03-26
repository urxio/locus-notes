import {
    Sparkles, Rocket, Zap, Atom, Orbit, Terminal, Cpu, Database, Network, Server, BrainCircuit, Bot, Command, Hexagon, Radio, Satellite, User, Folder, CheckSquare, Calendar, FileText,
    MapPin, Clipboard, Building2, Target, Briefcase, Wrench, Globe, Tent, Key, Puzzle, Star
} from "lucide-react"
import { BlockType, ObjectType, Note, Person, NoteProperty } from "./types"

export const NOTE_COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#14b8a6']

export const FUTURISTIC_ICONS: Record<string, React.ElementType> = {
    Sparkles, Rocket, Zap, Atom, Orbit, Terminal, Cpu, Database, Network, Server, BrainCircuit, Bot, Command, Hexagon, Radio, Satellite, User, Folder, CheckSquare, Calendar, FileText,
    MapPin, Clipboard, Building2, Target, Briefcase, Wrench, Globe, Tent, Key, Puzzle, Star
}

export const NOTE_ICON_KEYS = Object.keys(FUTURISTIC_ICONS)
export const LEGACY_NOTE_EMOJIS = ['📝', '💡', '🎯', '📚', '🔬', '🎨', '💻', '🌱', '⚡', '🔥', '📊', '🧠', '✨', '🚀', '🗒️', '📌']

export const BLOCK_LABELS: Record<BlockType, string> = {
    h1: 'Heading 1', h2: 'Heading 2', h3: 'Heading 3', p: 'Paragraph',
    bullet: 'Bullet List', numbered: 'Numbered List', quote: 'Quote',
    code: 'Code Block', divider: 'Divider', todo: 'To-do', date: 'Date',
    toggle: 'Toggle', table: 'Table',
}

export const BLOCK_PLACEHOLDERS: Record<BlockType, string> = {
    h1: 'Heading 1', h2: 'Heading 2', h3: 'Heading 3',
    p: "Write something, or type '/' for commands…",
    bullet: 'List item', numbered: 'List item',
    quote: 'Quote…', code: 'Code…', divider: '', todo: 'To-do', date: '',
    toggle: 'Toggle header…', table: 'Table (use | to separate cells)…',
}

export const SLASH_MENU_ITEMS: { type: BlockType; label: string; shortcut?: string }[] = [
    { type: 'p', label: 'Paragraph', shortcut: '' },
    { type: 'h1', label: 'Heading 1', shortcut: '#' },
    { type: 'h2', label: 'Heading 2', shortcut: '##' },
    { type: 'h3', label: 'Heading 3', shortcut: '###' },
    { type: 'toggle', label: 'Toggle', shortcut: '>>' },
    { type: 'bullet', label: 'Bullet List', shortcut: '-' },
    { type: 'numbered', label: 'Numbered List', shortcut: '1.' },
    { type: 'quote', label: 'Quote', shortcut: '>' },
    { type: 'code', label: 'Code Block', shortcut: '```' },
    { type: 'table', label: 'Table', shortcut: 'table' },
    { type: 'todo', label: 'To-do', shortcut: '[]' },
    { type: 'divider', label: 'Divider', shortcut: '---' },
    { type: 'date', label: 'Date', shortcut: '' },
]

export const BUILTIN_OBJECT_TYPES: ObjectType[] = [
    { id: 'person', name: 'Person', emoji: 'User', isBuiltin: true },
    { id: 'project', name: 'Project', emoji: 'Folder', isBuiltin: true },
    { id: 'task', name: 'Task', emoji: 'CheckSquare', isBuiltin: true },
    { id: 'meeting', name: 'Meeting', emoji: 'Calendar', isBuiltin: true },
]

export const PERSON_EMOJIS = ['User']

// ── Stable option IDs for seed select properties ────────────────────────────

const OPT_TASK_STATUS: Record<string, { id: string; label: string; color: string }> = {
    notStarted: { id: 'seed-opt-ts-ns',  label: 'Not Started', color: '#6b7280' },
    inProgress:  { id: 'seed-opt-ts-ip',  label: 'In Progress',  color: '#3b82f6' },
    done:        { id: 'seed-opt-ts-done', label: 'Done',         color: '#22c55e' },
    blocked:     { id: 'seed-opt-ts-blk',  label: 'Blocked',      color: '#ef4444' },
}
const OPT_TASK_PRIORITY: Record<string, { id: string; label: string; color: string }> = {
    low:    { id: 'seed-opt-tp-lo', label: 'Low',    color: '#22c55e' },
    medium: { id: 'seed-opt-tp-md', label: 'Medium', color: '#f59e0b' },
    high:   { id: 'seed-opt-tp-hi', label: 'High',   color: '#ef4444' },
    urgent: { id: 'seed-opt-tp-ur', label: 'Urgent', color: '#8b5cf6' },
}
const OPT_PROJECT_STATUS: Record<string, { id: string; label: string; color: string }> = {
    planning:  { id: 'seed-opt-ps-pl', label: 'Planning',  color: '#8b5cf6' },
    active:    { id: 'seed-opt-ps-ac', label: 'Active',    color: '#3b82f6' },
    onHold:    { id: 'seed-opt-ps-oh', label: 'On Hold',   color: '#f59e0b' },
    completed: { id: 'seed-opt-ps-co', label: 'Completed', color: '#22c55e' },
}
const OPT_MEETING_TYPE: Record<string, { id: string; label: string; color: string }> = {
    standup:   { id: 'seed-opt-mt-st', label: 'Standup',   color: '#6366f1' },
    review:    { id: 'seed-opt-mt-rv', label: 'Review',    color: '#3b82f6' },
    planning:  { id: 'seed-opt-mt-pl', label: 'Planning',  color: '#f59e0b' },
    oneOnOne:  { id: 'seed-opt-mt-11', label: '1-on-1',    color: '#ec4899' },
}

function seedSelect(
    id: string, name: string,
    opts: { id: string; label: string; color: string }[],
    value: string | null
): NoteProperty {
    return { id, name, type: 'select', value, options: opts }
}
function seedProp(id: string, name: string, type: NoteProperty['type'], value: NoteProperty['value']): NoteProperty {
    return { id, name, type, value }
}

// ── Seed note pages for each demo object ───────────────────────────────────

const SEED_NOTE_ALEX: Note = {
    id: 'seed-note-alex', title: 'Alex Chen', emoji: 'User', color: '#6366f1',
    personId: 'seed-person-alex',
    properties: [
        seedProp('sp-alex-role',    'Role',     'text',  'Product Manager'),
        seedProp('sp-alex-email',   'Email',    'email', 'alex@example.com'),
        seedProp('sp-alex-phone',   'Phone',    'phone', null),
        seedProp('sp-alex-company', 'Company',  'text',  'Acme Corp.'),
        seedProp('sp-alex-li',      'LinkedIn', 'url',   null),
    ],
    blocks: [
        { id: 'alex-b1', type: 'h2',    content: 'About' },
        { id: 'alex-b2', type: 'p',     content: 'Alex leads product strategy and owns the roadmap. Previously at Notion and Linear.' },
        { id: 'alex-b3', type: 'h2',    content: 'Working notes' },
        { id: 'alex-b4', type: 'bullet', content: 'Prefers async written updates over long meetings' },
        { id: 'alex-b5', type: 'bullet', content: 'Weekly 1-on-1 on Wednesdays at 2pm' },
        { id: 'alex-b6', type: 'bullet', content: 'Driving the Q4 Launch Planning project' },
        { id: 'alex-b7', type: 'h2',    content: 'Follow-ups' },
        { id: 'alex-b8', type: 'todo',  content: 'Send updated PRD for landing page redesign', checked: false },
        { id: 'alex-b9', type: 'todo',  content: 'Share Figma access for new components',      checked: true  },
    ],
    tags: ['team', 'product'],
    createdAt: Date.now() - 86400000 * 14, updatedAt: Date.now() - 3600000 * 2,
}

const SEED_NOTE_SAM: Note = {
    id: 'seed-note-sam', title: 'Sam Rivera', emoji: 'User', color: '#10b981',
    personId: 'seed-person-sam',
    properties: [
        seedProp('sp-sam-role',    'Role',     'text',  'Software Engineer'),
        seedProp('sp-sam-email',   'Email',    'email', 'sam@example.com'),
        seedProp('sp-sam-phone',   'Phone',    'phone', null),
        seedProp('sp-sam-company', 'Company',  'text',  'Acme Corp.'),
        seedProp('sp-sam-li',      'LinkedIn', 'url',   null),
    ],
    blocks: [
        { id: 'sam-b1', type: 'h2',    content: 'About' },
        { id: 'sam-b2', type: 'p',     content: 'Sam owns the frontend stack and design system. Obsessed with DX and fast builds.' },
        { id: 'sam-b3', type: 'h2',    content: 'Working notes' },
        { id: 'sam-b4', type: 'bullet', content: 'Point of contact for all staging environment questions' },
        { id: 'sam-b5', type: 'bullet', content: 'Prefers GitHub comments over Slack for code feedback' },
        { id: 'sam-b6', type: 'h2',    content: 'Follow-ups' },
        { id: 'sam-b7', type: 'todo',  content: 'Review PR for CI/CD pipeline changes',    checked: false },
        { id: 'sam-b8', type: 'todo',  content: 'Migrate component library to Tailwind v4', checked: false },
    ],
    tags: ['team', 'engineering'],
    createdAt: Date.now() - 86400000 * 12, updatedAt: Date.now() - 3600000 * 5,
}

const SEED_NOTE_PROJECT_WEBSITE: Note = {
    id: 'seed-note-website', title: 'Website Redesign', emoji: 'Globe', color: '#3b82f6',
    personId: 'seed-project-website',
    properties: [
        seedSelect('sp-web-status', 'Status',
            Object.values(OPT_PROJECT_STATUS), OPT_PROJECT_STATUS.active.id),
        seedProp('sp-web-start',  'Start Date', 'date', new Date(Date.now() - 86400000 * 10).toISOString().split('T')[0]),
        seedProp('sp-web-due',    'Due Date',   'date', new Date(Date.now() + 86400000 * 20).toISOString().split('T')[0]),
        seedProp('sp-web-owner',  'Owner',      'text', 'Alex Chen'),
    ],
    blocks: [
        { id: 'web-b1', type: 'h2',    content: 'Overview' },
        { id: 'web-b2', type: 'p',     content: 'Redesigning the marketing site with a new brand direction. Goal is to improve conversion and reflect the current product capabilities.' },
        { id: 'web-b3', type: 'h2',    content: 'Goals' },
        { id: 'web-b4', type: 'todo',  content: 'Improve homepage conversion by 20%',   checked: false },
        { id: 'web-b5', type: 'todo',  content: 'Mobile-first responsive layout',        checked: true  },
        { id: 'web-b6', type: 'todo',  content: 'New design system with Tailwind',        checked: true  },
        { id: 'web-b7', type: 'todo',  content: 'Accessibility audit (WCAG AA)',          checked: false },
        { id: 'web-b8', type: 'todo',  content: 'Update landing page copy',               checked: false },
        { id: 'web-b9', type: 'h2',    content: 'Resources' },
        { id: 'web-b10', type: 'bullet', content: 'Figma: Design system components (ask Sam for access)' },
        { id: 'web-b11', type: 'bullet', content: 'Staging: staging.example.com' },
    ],
    tags: ['project', 'design', 'web'],
    createdAt: Date.now() - 86400000 * 10, updatedAt: Date.now() - 3600000 * 3,
}

const SEED_NOTE_PROJECT_Q4: Note = {
    id: 'seed-note-q4', title: 'Q4 Launch Planning', emoji: 'Target', color: '#8b5cf6',
    personId: 'seed-project-q4',
    properties: [
        seedSelect('sp-q4-status', 'Status',
            Object.values(OPT_PROJECT_STATUS), OPT_PROJECT_STATUS.planning.id),
        seedProp('sp-q4-start', 'Start Date', 'date', new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0]),
        seedProp('sp-q4-due',   'Due Date',   'date', new Date(Date.now() + 86400000 * 60).toISOString().split('T')[0]),
        seedProp('sp-q4-owner', 'Owner',      'text', 'Alex Chen'),
    ],
    blocks: [
        { id: 'q4-b1',  type: 'h2',    content: 'Objectives' },
        { id: 'q4-b2',  type: 'p',     content: 'Plan and coordinate the Q4 product launch across eng, design, and marketing.' },
        { id: 'q4-b3',  type: 'h2',    content: 'Milestones' },
        { id: 'q4-b4',  type: 'todo',  content: 'Finalize feature scope',           checked: false },
        { id: 'q4-b5',  type: 'todo',  content: 'Complete quarterly budget review',  checked: false },
        { id: 'q4-b6',  type: 'todo',  content: 'Align on team headcount',           checked: false },
        { id: 'q4-b7',  type: 'todo',  content: 'Write launch announcement draft',   checked: false },
        { id: 'q4-b8',  type: 'todo',  content: 'Set OKRs for Q4',                   checked: false },
        { id: 'q4-b9',  type: 'h2',    content: 'Notes' },
        { id: 'q4-b10', type: 'quote', content: 'Ship something users love every quarter.' },
    ],
    tags: ['project', 'planning', 'q4'],
    createdAt: Date.now() - 86400000 * 3, updatedAt: Date.now() - 3600000,
}

const SEED_NOTE_TASK_LANDING: Note = {
    id: 'seed-note-task-landing', title: 'Update landing page copy', emoji: 'Clipboard', color: '#3b82f6',
    personId: 'seed-task-landing',
    properties: [
        seedSelect('sp-tl-status', 'Status',
            Object.values(OPT_TASK_STATUS), OPT_TASK_STATUS.inProgress.id),
        seedSelect('sp-tl-priority', 'Priority',
            Object.values(OPT_TASK_PRIORITY), OPT_TASK_PRIORITY.high.id),
        seedProp('sp-tl-due',      'Due Date', 'date',   new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0]),
        seedProp('sp-tl-assignee', 'Assignee', 'person', 'seed-person-sam'),
    ],
    blocks: [
        { id: 'tl-b1', type: 'p',      content: 'Rewrite hero headline and sub-copy to reflect new positioning. CTAs should be action-oriented.' },
        { id: 'tl-b2', type: 'h2',     content: 'Checklist' },
        { id: 'tl-b3', type: 'todo',   content: 'Get approved copy from Alex',          checked: true  },
        { id: 'tl-b4', type: 'todo',   content: 'Update hero section in code',           checked: true  },
        { id: 'tl-b5', type: 'todo',   content: 'Update features section',               checked: false },
        { id: 'tl-b6', type: 'todo',   content: 'QA on mobile and tablet breakpoints',   checked: false },
        { id: 'tl-b7', type: 'todo',   content: 'Get sign-off before pushing to prod',   checked: false },
        { id: 'tl-b8', type: 'h2',     content: 'Notes' },
        { id: 'tl-b9', type: 'bullet', content: 'Figma: see "Landing page - v3" frame' },
        { id: 'tl-b10', type: 'bullet', content: 'Part of the Website Redesign project' },
    ],
    tags: ['task', 'web', 'design'],
    createdAt: Date.now() - 86400000 * 5, updatedAt: Date.now() - 3600000 * 4,
}

const SEED_NOTE_TASK_BUDGET: Note = {
    id: 'seed-note-task-budget', title: 'Review quarterly budget', emoji: 'CheckSquare', color: '#f59e0b',
    personId: 'seed-task-budget',
    properties: [
        seedSelect('sp-tb-status', 'Status',
            Object.values(OPT_TASK_STATUS), OPT_TASK_STATUS.notStarted.id),
        seedSelect('sp-tb-priority', 'Priority',
            Object.values(OPT_TASK_PRIORITY), OPT_TASK_PRIORITY.medium.id),
        seedProp('sp-tb-due',      'Due Date', 'date',   new Date(Date.now() + 86400000 * 10).toISOString().split('T')[0]),
        seedProp('sp-tb-assignee', 'Assignee', 'person', 'seed-person-alex'),
    ],
    blocks: [
        { id: 'tb-b1', type: 'p',      content: 'Review spend vs. budget for Q3 and prepare Q4 budget request for leadership sign-off.' },
        { id: 'tb-b2', type: 'h2',     content: 'Steps' },
        { id: 'tb-b3', type: 'todo',   content: 'Pull Q3 actuals from finance',         checked: false },
        { id: 'tb-b4', type: 'todo',   content: 'Identify overages and underutilization', checked: false },
        { id: 'tb-b5', type: 'todo',   content: 'Draft Q4 budget proposal',              checked: false },
        { id: 'tb-b6', type: 'todo',   content: 'Present to leadership in Product Review', checked: false },
    ],
    tags: ['task', 'planning', 'q4'],
    createdAt: Date.now() - 86400000 * 2, updatedAt: Date.now() - 3600000 * 6,
}

const SEED_NOTE_TASK_CICD: Note = {
    id: 'seed-note-task-cicd', title: 'Set up CI/CD pipeline', emoji: 'Zap', color: '#10b981',
    personId: 'seed-task-cicd',
    properties: [
        seedSelect('sp-tc-status', 'Status',
            Object.values(OPT_TASK_STATUS), OPT_TASK_STATUS.done.id),
        seedSelect('sp-tc-priority', 'Priority',
            Object.values(OPT_TASK_PRIORITY), OPT_TASK_PRIORITY.high.id),
        seedProp('sp-tc-due',      'Due Date', 'date',   new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0]),
        seedProp('sp-tc-assignee', 'Assignee', 'person', 'seed-person-sam'),
    ],
    blocks: [
        { id: 'tc-b1', type: 'p',      content: 'Automated test + deploy pipeline using GitHub Actions. Deploys to staging on PR open, prod on merge to main.' },
        { id: 'tc-b2', type: 'h2',     content: 'Completed work' },
        { id: 'tc-b3', type: 'todo',   content: 'Set up GitHub Actions workflow',    checked: true },
        { id: 'tc-b4', type: 'todo',   content: 'Configure staging environment',     checked: true },
        { id: 'tc-b5', type: 'todo',   content: 'Add Playwright smoke tests',        checked: true },
        { id: 'tc-b6', type: 'todo',   content: 'Set up Slack deploy notifications', checked: true },
        { id: 'tc-b7', type: 'h2',     content: 'Notes' },
        { id: 'tc-b8', type: 'code',   content: 'gh workflow run deploy.yml --ref main' },
    ],
    tags: ['task', 'engineering', 'devops'],
    createdAt: Date.now() - 86400000 * 8, updatedAt: Date.now() - 86400000 * 3,
}

const SEED_NOTE_MEETING_STANDUP: Note = {
    id: 'seed-note-standup', title: 'Weekly Team Standup', emoji: 'Calendar', color: '#6366f1',
    personId: 'seed-meeting-standup',
    properties: [
        seedSelect('sp-ms-type', 'Type',
            Object.values(OPT_MEETING_TYPE), OPT_MEETING_TYPE.standup.id),
        seedProp('sp-ms-date',  'Date',      'date',   new Date().toISOString().split('T')[0]),
        seedProp('sp-ms-rec',   'Recurring', 'text',   'Every Monday 9:30am'),
        seedProp('sp-ms-loc',   'Location',  'url',    null),
    ],
    blocks: [
        { id: 'ms-b1', type: 'h2',    content: 'Agenda' },
        { id: 'ms-b2', type: 'todo',  content: 'Round-robin updates (2 min each)',              checked: true  },
        { id: 'ms-b3', type: 'todo',  content: 'Blockers & asks',                               checked: true  },
        { id: 'ms-b4', type: 'todo',  content: 'Quick wins from last week',                     checked: false },
        { id: 'ms-b5', type: 'h2',    content: 'This week\'s notes' },
        { id: 'ms-b6', type: 'bullet', content: 'Sam: CI/CD pipeline is live, all green ✓' },
        { id: 'ms-b7', type: 'bullet', content: 'Alex: Website Redesign now in active phase' },
        { id: 'ms-b8', type: 'bullet', content: 'Blocked: landing page copy waiting on legal review' },
        { id: 'ms-b9', type: 'h2',    content: 'Action items' },
        { id: 'ms-b10', type: 'todo', content: 'Alex to send copy to Sam by Thursday',          checked: false },
        { id: 'ms-b11', type: 'todo', content: 'Sam to open staging PR by EOW',                 checked: false },
    ],
    tags: ['meeting', 'team', 'recurring'],
    createdAt: Date.now() - 86400000 * 7, updatedAt: Date.now() - 3600000 * 8,
}

const SEED_NOTE_MEETING_REVIEW: Note = {
    id: 'seed-note-review', title: 'Product Review Meeting', emoji: 'Star', color: '#ec4899',
    personId: 'seed-meeting-review',
    properties: [
        seedSelect('sp-mr-type', 'Type',
            Object.values(OPT_MEETING_TYPE), OPT_MEETING_TYPE.review.id),
        seedProp('sp-mr-date',  'Date',     'date', new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]),
        seedProp('sp-mr-rec',   'Recurring', 'text', 'Every other Thursday 3pm'),
        seedProp('sp-mr-loc',   'Location',  'url',  null),
    ],
    blocks: [
        { id: 'mr-b1', type: 'h2',    content: 'Agenda' },
        { id: 'mr-b2', type: 'bullet', content: 'Demo: Website Redesign progress (Sam, 10 min)' },
        { id: 'mr-b3', type: 'bullet', content: 'Review: Q4 budget proposal (Alex, 15 min)' },
        { id: 'mr-b4', type: 'bullet', content: 'Prioritize: backlog for Q4 launch' },
        { id: 'mr-b5', type: 'bullet', content: 'AOB' },
        { id: 'mr-b6', type: 'h2',    content: 'Pre-read' },
        { id: 'mr-b7', type: 'todo',  content: 'Review Q4 Launch Planning doc before meeting', checked: false },
        { id: 'mr-b8', type: 'todo',  content: 'Prepare budget numbers',                       checked: false },
        { id: 'mr-b9', type: 'h2',    content: 'Notes' },
        { id: 'mr-b10', type: 'p',    content: 'Add notes during the meeting...' },
    ],
    tags: ['meeting', 'product', 'q4'],
    createdAt: Date.now() - 86400000 * 1, updatedAt: Date.now() - 3600000 * 1,
}

// ── SEED_NOTES — loaded for new users who have no localStorage data ─────────

export const SEED_NOTES: Note[] = [
    // Welcome + orientation note
    {
        id: 'seed-welcome', title: 'Welcome to Locus', emoji: 'Sparkles', color: '#6366f1',
        blocks: [
            { id: 'w-b1', type: 'p',      content: 'Your workspace is ready. Below is a demo environment with real People, Projects, Tasks, and Meetings — explore the sidebar to see them all.' },
            { id: 'w-b2', type: 'h2',     content: 'What\'s in your workspace' },
            { id: 'w-b3', type: 'bullet', content: '<strong>People</strong> — Alex Chen (PM) and Sam Rivera (Engineer) with contact info and working notes' },
            { id: 'w-b4', type: 'bullet', content: '<strong>Projects</strong> — Website Redesign (active) and Q4 Launch Planning (just kicked off)' },
            { id: 'w-b5', type: 'bullet', content: '<strong>Tasks</strong> — three tasks at different stages: In Progress, Not Started, and Done' },
            { id: 'w-b6', type: 'bullet', content: '<strong>Meetings</strong> — Weekly Standup (notes from this week) and Product Review (upcoming)' },
            { id: 'w-b7', type: 'h2',     content: 'How to use it' },
            { id: 'w-b8', type: 'bullet', content: 'Type  /  anywhere to insert blocks — headings, todos, code, tables, toggles' },
            { id: 'w-b9', type: 'bullet', content: 'Type  @  to mention and link to any object directly in your notes' },
            { id: 'w-b10', type: 'bullet', content: 'Add  #tags  at the bottom of notes — shared tags draw edges in the graph' },
            { id: 'w-b11', type: 'bullet', content: 'Right-click any sidebar item to rename or delete' },
            { id: 'w-b12', type: 'bullet', content: 'The graph (bottom-right) maps how your notes connect via tags and mentions' },
        ],
        tags: ['welcome', 'getting-started'],
        createdAt: Date.now() - 86400000 * 20, updatedAt: Date.now(),
    },
    // Object pages
    SEED_NOTE_ALEX,
    SEED_NOTE_SAM,
    SEED_NOTE_PROJECT_WEBSITE,
    SEED_NOTE_PROJECT_Q4,
    SEED_NOTE_TASK_LANDING,
    SEED_NOTE_TASK_BUDGET,
    SEED_NOTE_TASK_CICD,
    SEED_NOTE_MEETING_STANDUP,
    SEED_NOTE_MEETING_REVIEW,
]

// ── SEED_PEOPLE — loaded for new users who have no localStorage data ─────────

export const SEED_PEOPLE: Person[] = [
    { id: 'seed-person-alex',           name: 'Alex Chen',                emoji: 'User',         noteId: 'seed-note-alex',           typeId: 'person'  },
    { id: 'seed-person-sam',            name: 'Sam Rivera',               emoji: 'User',         noteId: 'seed-note-sam',            typeId: 'person'  },
    { id: 'seed-project-website',       name: 'Website Redesign',         emoji: 'Globe',        noteId: 'seed-note-website',        typeId: 'project' },
    { id: 'seed-project-q4',            name: 'Q4 Launch Planning',       emoji: 'Target',       noteId: 'seed-note-q4',             typeId: 'project' },
    { id: 'seed-task-landing',          name: 'Update landing page copy', emoji: 'Clipboard',    noteId: 'seed-note-task-landing',   typeId: 'task'    },
    { id: 'seed-task-budget',           name: 'Review quarterly budget',  emoji: 'CheckSquare',  noteId: 'seed-note-task-budget',    typeId: 'task'    },
    { id: 'seed-task-cicd',             name: 'Set up CI/CD pipeline',    emoji: 'Zap',          noteId: 'seed-note-task-cicd',      typeId: 'task'    },
    { id: 'seed-meeting-standup',       name: 'Weekly Team Standup',      emoji: 'Calendar',     noteId: 'seed-note-standup',        typeId: 'meeting' },
    { id: 'seed-meeting-review',        name: 'Product Review Meeting',   emoji: 'Star',         noteId: 'seed-note-review',         typeId: 'meeting' },
]
