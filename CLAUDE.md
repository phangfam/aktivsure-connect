# aktivsure-connect

First-party lead capture funnel for AktivSure: QR-scanned customers submit consented contact info via a branded form; Chris Phang views all captured leads in a simple dashboard.

## ⚠️ READ THIS BEFORE WRITING ANY CODE
A complete, correct plan for this app is already committed in `/docs`. Do **not** start
from the project name, the summary above, or your own assumptions — those will lead you to
build the wrong thing (e.g. a marketing landing page). Open the plan and build from it:

- `docs/PRD.md`
- `docs/ARCHITECTURE.md`
- `docs/DATA_MODEL.md`
- `docs/INTELLIGENCE_LAYER.md`
- `docs/AGENTIC_LAYER.md`
- `docs/SECURITY.md`
- `docs/TASKS.md`
- `docs/TEST_PLAN.md`

## Build rules (binding — follow in order)
1. **Read first:** open `docs/PRD.md`, `docs/DATA_MODEL.md`, `docs/ARCHITECTURE.md`, and
   `docs/TASKS.md` before writing a single line.
2. **Confirm the plan** back to me in 2–3 lines (the core objects + the one main workflow) BEFORE coding.
3. **Build the ONE core engine/verb FIRST, working end-to-end.** Every app has a main action —
   create a proposal, run the quote/simulation, log a change and act on it. Build THAT against the
   real database in Sprint 1, then breadth. Then build straight through the sprints until the app
   actually WORKS end-to-end. Do NOT stop after auth + an empty or "Connected" status dashboard, and
   do NOT ship read-only screens of seeded data — **every button and form must persist to the
   database and the UI must reflect it. NO dead buttons. Seeded rows are demo placeholders the user
   can also create/edit/delete.** Commit + push after each sprint; pause for review only once a real
   person can actually perform the core job.
4. **Database-first, but don't stop at the database:** lay the data model + core CRUD first (the
   core must work with the AI switched off), then build the real screens that make it usable.
5. **This is the real working app** — real forms, lists, detail views, and the end-to-end flow from
   the PRD's success scenario. Do **NOT** build a marketing/landing page, a front-end-only demo, or
   a connection-status dashboard.
6. **Demo-first — no login wall in v1.** The homepage IS the working app (with seed data), reachable by
   anyone — do NOT redirect to /login or gate the app behind auth yet. Login/signup + per-user lockdown
   is a LATER "Lock it down" sprint, before real users/data. (Keeps the app demoable + screenshot-able.)
7. Never put secrets in frontend code.

## Deploy & data (binding — this stack is already provisioned)
- **Deploy by git, never by CLI.** `git add -A && git commit -m "…" && git push` to `main`;
  Vercel auto-deploys from GitHub (confirmed working 2026-08-20 — pushes reliably trigger a
  production deployment within ~30s). Do NOT run `vercel deploy` / `vercel --prod` with local
  files — it desyncs git, and the next push silently overwrites your live app.
- **Commit + push every change.** Git is the source of truth; uncommitted work is lost on
  the next deploy.
- **The Supabase database is already provisioned** and its keys are in this project's Vercel
  env. Pull them locally: `vercel link` then `vercel env pull .env.local`. Don't invent new ones.
- **Your database is already set up.** The schema from your data model has been applied to
  this project's Supabase database and committed at `supabase/migrations/0001_init.sql`. Build on
  the existing tables — **do not recreate them**. To change the schema, add a NEW migration file
  (`supabase/migrations/0002_*.sql`) and apply it; never edit `0001`.
- **Commit as your GitHub identity, or Vercel will block the deploy.** Vercel verifies that
  every commit's author email belongs to your GitHub account. Your machine's default git email
  often isn't, so the very first local commit gets rejected. Pin this repo's identity once
  (already correct for your account) — before your first commit:
  ```
  git config user.email "194879403+phangfam@users.noreply.github.com"
  git config user.name "phangfam"
  ```

Kickoff prompt: "Read everything in /docs, confirm the plan in 3 lines, then build straight
through the sprints until the app actually works end-to-end — the PRD's success scenario, not
just auth + an empty dashboard. The schema is already applied, so pull env with vercel env pull
and build on the existing tables; commit + push after each sprint to deploy. Stop only when a
real user can do the core job."

## Post-v1 additions

- **Sprint 4 (auth lock-down) is live.** `/dashboard` requires a Supabase auth session
  (`middleware.ts` redirects to `/login`); `/capture` stays public. RLS uses a simple
  authenticated-only SELECT model, not per-owner scoping (single-admin pilot, see
  `supabase/migrations/0002_lockdown.sql`). Chris's login is a normal Supabase Auth user
  created via the Supabase Dashboard — there is no signup page by design.
- **Deterministic customer-service chatbot** (`components/ChatWidget.tsx`,
  `lib/chatbot/flow.ts`) is embedded site-wide except `/dashboard` and `/login`. It's a fixed
  decision tree (buttons only, no free text, no LLM) — edit `lib/chatbot/flow.ts` to change
  branches. Its escalation path reuses the capture pipeline, tagging leads with the `chatbot`
  lead_source.
- **On-demand leads reporting:** ask in chat for a leads report/summary and query
  `v_leads_report` (a locked-down view — `revoke`d from `anon`/`authenticated`, only reachable
  via a privileged DB connection such as the Supabase MCP tools, never through the deployed
  app) via `supabase/migrations/0004_leads_report_view.sql`. This is intentionally on-demand
  only, not a scheduled/automated agent — PRD's v1 non-goals exclude CRM automation.
