# Growtez Landing — Workspace Instructions

## Project Overview
- **Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Animations**: GSAP, Framer Motion, Lenis (smooth scroll)
- **Backend**: Supabase
- **Icons**: Lucide React

## ⚡ Parallel Subagent Strategy (MANDATORY)

**Always maximize parallelism.** When a task can be decomposed into independent units of work, you MUST spawn multiple subagents to execute them concurrently. Never do sequentially what can be done in parallel.

### When to Parallelize
- **Research phase**: Spawn separate subagents for each area of investigation (e.g., one reads components, another reads pages, another checks dependencies).
- **Multi-file edits**: If changes span multiple independent files, assign each file (or file group) to its own subagent.
- **Multi-page work**: Each page route (`/about`, `/blog`, `/services`, etc.) should be handled by a separate subagent when working across pages.
- **Component creation**: When building multiple new components, spin up one subagent per component.
- **Testing + Implementation**: Run linting/build verification in one subagent while another continues implementation.
- **Research + Planning**: Research the codebase in parallel with web searches.

### How to Parallelize
1. **Decompose** the task into independent subtasks.
2. **Spawn subagents** for all independent subtasks in a single `invoke_subagent` call.
3. **Wait** for all subagents to report back.
4. **Integrate** results and handle any cross-cutting concerns yourself.

### Parallelism Rules
- Minimum 2 subagents for any non-trivial task.
- Up to 5+ subagents for large refactors or multi-page work.
- Each subagent should have a clear, scoped responsibility.
- Use `branch` workspace mode when subagents edit overlapping areas.
- Use `inherit` workspace mode when subagents edit completely independent files.
- Always set descriptive `Role` names so progress is easy to track.

### Example Patterns

**Pattern 1: Multi-page update**
```
Subagent 1 (Role: "About Page Developer")  → Updates /about
Subagent 2 (Role: "Services Page Developer") → Updates /services
Subagent 3 (Role: "Contact Page Developer")  → Updates /contact
```

**Pattern 2: Research + Build**
```
Subagent 1 (Role: "Codebase Researcher")     → Reads existing code patterns
Subagent 2 (Role: "Dependency Investigator")  → Checks package docs
Subagent 3 (Role: "Component Builder")        → Starts building once specs are clear
```

**Pattern 3: Component factory**
```
Subagent 1 (Role: "Hero Section Builder")     → Creates hero component
Subagent 2 (Role: "Feature Grid Builder")     → Creates features component
Subagent 3 (Role: "Testimonials Builder")     → Creates testimonials component
Subagent 4 (Role: "CTA Section Builder")      → Creates CTA component
```

## Next.js Rules
<!-- BEGIN:nextjs-agent-rules -->
This version of Next.js has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Code Style & Conventions
- Use TypeScript for all new files (`.tsx` / `.ts`).
- Use the App Router (`app/` directory) — no Pages Router.
- Components go in `components/` at the project root.
- Utility/helper functions go in `lib/`.
- Use `"use client"` directive only when client-side APIs (hooks, event handlers, browser APIs) are needed.
- Prefer GSAP for scroll-triggered and timeline animations.
- Prefer Framer Motion for mount/unmount transitions and layout animations.
- Use Lucide React for icons — do not introduce other icon libraries.

## File Structure
```
app/
├── layout.tsx          # Root layout
├── page.tsx            # Home page
├── globals.css         # Global styles
├── about/              # /about route
├── blog/               # /blog route
├── careers/            # /careers route
├── contact/            # /contact route
├── portfolio/          # /portfolio route
├── pricing/            # /pricing route
└── services/           # /services route
components/             # Shared React components
lib/                    # Utilities and helpers
public/                 # Static assets
```

## Search Tool Preference (Windows)
When searching for files or content, always use `rg` (ripgrep) instead of `Select-String` or `grep`.
