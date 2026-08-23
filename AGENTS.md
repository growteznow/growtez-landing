<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# ⚡ Parallel Subagent Strategy (MANDATORY)

**Always maximize parallelism.** When a task can be decomposed into independent units of work, you MUST spawn multiple subagents to execute them concurrently. Never do sequentially what can be done in parallel.

## When to Parallelize
- **Research phase**: Spawn separate subagents for each area of investigation.
- **Multi-file edits**: Assign each independent file/group to its own subagent.
- **Multi-page work**: Each route (`/about`, `/blog`, `/services`, etc.) gets its own subagent.
- **Component creation**: One subagent per component when building multiple.
- **Testing + Implementation**: Run verification in one subagent while another continues work.
- **Research + Planning**: Research codebase in parallel with web searches.

## Parallelism Rules
- Minimum 2 subagents for any non-trivial task.
- Up to 5+ subagents for large refactors or multi-page work.
- Each subagent must have a clear, scoped responsibility.
- Use descriptive Role names for easy progress tracking.

# Project Conventions
- **Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, GSAP, Framer Motion, Lenis, Supabase, Lucide React
- Use TypeScript (`.tsx`/`.ts`) for all new files.
- Components in `components/`, utilities in `lib/`.
- Use `"use client"` only when client-side APIs are needed.
- Use `rg` (ripgrep) for file searching on Windows.
