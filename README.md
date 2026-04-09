# Locus Notes

A note-taking app that combines a Notion-style block editor with an Obsidian-style tag/mention graph. Supports offline (localStorage-only) mode and cloud sync via Supabase.

## Features

- **Block editor** — paragraph, heading, todo, code, table, callout, and more
- **Object types** — first-class Person, Task, Project, and Meeting pages with typed properties
- **Tag graph** — force-directed graph connecting notes via `#tags` and `@mentions`
- **Inbox & reminders** — deadline-aware reminder engine surfacing due tasks and meetings
- **Offline mode** — runs entirely in localStorage; Supabase sync is optional
- **Folder hierarchy** — nested folder tree for organising notes

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [Supabase](https://supabase.com/) — auth + Postgres via `@supabase/ssr`
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [next-themes](https://github.com/pacocoursey/next-themes) for dark/light mode

## Getting started

### 1. Clone and install

```bash
git clone https://github.com/urxio/locus-notes.git
cd locus-notes
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your Supabase credentials (Settings → API in the Supabase dashboard):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

> **Offline mode** — if you skip this step, the app still works using localStorage only. Sign-in will offer a "Use without account" option.

### 3. Set up the database (optional, for cloud sync)

Run the schema against your Supabase project:

```bash
# Option A — Supabase CLI
supabase db push --db-url postgresql://...

# Option B — Supabase dashboard SQL editor
# Paste the contents of supabase/schema.sql and run it
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build (runs type-check + lint) |
| `npm run lint` | ESLint |
| `npm test` | Run Vitest unit tests |

## Project structure

```
app/            Next.js App Router pages
  app/          Main application page (notes, graph, inbox)
  auth/         Sign-in / sign-up page
components/     React components
  block-item    Block editor cell (contenteditable)
  note-editor   Note canvas (block list + drag/drop)
  graph-panel   Force-directed tag graph
  inbox-panel   Reminder inbox
  sidebar       Folder tree + navigation rail
lib/
  types.ts      Shared TypeScript types
  storage.ts    localStorage ↔ Supabase sync layer
  graph.ts      Graph builder + force simulation
  migrate.ts    localStorage schema migrations
  mentions.ts   @mention + #tag HTML utilities
  sanitize.ts   DOMPurify HTML sanitization
middleware.ts   Supabase auth session refresh
supabase/
  schema.sql    Postgres schema (notes, people, folders, inbox, object_types)
```

## Contributing

1. Fork the repo and create a branch
2. Run `npx tsc --noEmit` and `npm run lint` before pushing — CI enforces both
3. Open a pull request
