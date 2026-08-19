# Task Plan

## Sprint 1: Database + Capture Form (CORE ENGINE)
**Goal:** Customer can submit the capture form and a record persists.
- Create Supabase tables: `lead_sources`, `products`, `contacts`, `consent_logs` + seed data
- Build `lib/data/` layer (contact insert, source/product queries)
- Build `lib/actions/submit-contact.ts` server action
- Build `/capture` page with ContactForm component
- Consent checkbox (not pre-ticked), links to Privacy Policy
- Product dropdown (from `products` table)
- Source passed via URL param (`?source=insert-qr`)
- Success screen after submit
- Handle: loading, empty fields validation, error states
- Seed: 3 sources, 3 products, 5 demo contacts

**Definition of Done:** Open `/capture?source=insert-qr` → fill form → check consent → submit → record appears in Supabase `contacts` table with consent timestamp + `consent_logs` row. Form shows success state. Validation blocks empty required fields and unchecked consent.

## Sprint 2: Leads Dashboard
**Goal:** Chris can view all captured contacts in one place.
- Build `/dashboard` page with LeadsTable component
- Columns: name, phone/email, source, product, consent date, created date
- Sort by created_at descending (newest first)
- Search/filter by name or phone
- Empty state: "No contacts captured yet"
- Loading skeleton + error state
- Brand styling applied (navy/gold/white)

**Definition of Done:** Chris opens `/dashboard` → sees seeded demo contacts + any new contacts submitted via the form, sorted newest first. Search filters by name. Empty state shows when no contacts match.

**v1 FUNCTIONAL MILESTONE** — Sprints 1+2 complete: QR → form → saved record → Chris sees it in dashboard.

## Sprint 3: Compliance Pages + Brand Polish
**Goal:** Privacy Policy and Disclaimer live and linked; full brand styling.
- Build `/privacy` page — PDPA-compliant content (what data, why, storage, access/correction/deletion rights)
- Build `/disclaimer` page — product claims disclaimer; flag to regulatory contact before publishing claims copy
- Link both from capture form (consent checkbox label, footer)
- Apply brand colors: deep navy primary, gold accent, white support
- Build sidebar nav shell (desktop sidebar / mobile hamburger)
- Responsive across all pages
- QR-code-friendly short URL test

**Definition of Done:** Privacy Policy and Disclaimer pages are live, linked from the capture form, and content is reviewed. Brand colors applied consistently. Nav works on desktop and mobile.

## Sprint 4: Lock It Down (Auth + RLS)
**Goal:** Secure dashboard behind login; tighten RLS.
- Add Supabase Auth (email/password for Chris)
- Dashboard behind auth — redirect to `/login` if not authenticated
- Replace permissive RLS with owner-scoped policies (`auth.uid() = user_id`)
- Contacts: INSERT still open (form works for anon), SELECT owner-only
- consent_logs: INSERT open, SELECT/UPDATE/DELETE owner-only
- lead_sources, products: SELECT for all, write owner-only

**Definition of Done:** Anonymous visitor can still submit the capture form. Dashboard redirects to login. Logged-in Chris sees only contacts. consent_logs cannot be updated or deleted by anyone. No secrets exposed in frontend.

## Text Gantt
```
S1: ████████░░░░░░░░  DB + Capture Form
S2: ░░░░████████░░░░  Leads Dashboard (v1 functional)
S3: ░░░░░░░░████████  Compliance + Brand Polish
S4: ░░░░░░░░░░░░████  Lock It Down (Auth + RLS)
```
