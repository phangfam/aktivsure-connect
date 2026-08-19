# Architecture

## Stack
Next.js 15 (App Router) + Supabase (Postgres + RLS) + Vercel deploy.

## Build Now vs Later
**Now (v1):** Capture form, Privacy Policy page, Disclaimer page, leads dashboard, consent logging.
**Later:** CRM automation, retargeting triggers, WhatsApp/email sends, multi-brand rollout, analytics.

## Key User Action Flow
1. Customer scans QR on packing insert → opens `/capture?source=insert-qr`
2. Landing page presents form (warranty registration framing)
3. Customer enters name + phone/email, selects product, checks consent checkbox (links to Privacy Policy)
4. On submit → insert into `contacts` with consent timestamp + source + product
5. Success screen confirms registration
6. Chris opens `/dashboard` → sees contact list with consent status, source, product, date

## Responsive Nav
Multi-page app: left sidebar on desktop (Capture Form, Dashboard, Privacy Policy, Disclaimer), collapses to hamburger on mobile. Current section highlighted.

## Layer Plan
1. **Data layer** — Supabase tables: `lead_sources`, `products`, `contacts`, `consent_logs`. RLS permissive for v1 demo.
2. **App logic** — Server actions for contact submission + consent logging. Data-access layer in `lib/data/`.
3. **Smart features (later)** — Lead scoring, source analytics, follow-up reminders.

## Why Core Runs Without AI
The funnel is a form → database → list. No AI required for capture, consent, or dashboard. AI features (scoring, draft follow-ups) layer on top later.

## Repo Structure
```
app/
  capture/page.tsx        — lead capture form
  dashboard/page.tsx      — leads list
  privacy/page.tsx        — Privacy Policy
  disclaimer/page.tsx     — Disclaimer
  layout.tsx              — sidebar nav shell
lib/data/
  contacts.ts             — contact CRUD
  sources.ts              — lead source queries
  products.ts             — product queries
lib/actions/
  submit-contact.ts       — server action: form submit
components/
  ContactForm.tsx
  LeadsTable.tsx
  ConsentCheckbox.tsx
  Sidebar.tsx
  ui/                      — shared UI primitives
lib/ai/                   — (empty for v1, reserved)
__tests__/
  submit-contact.test.ts
```

## Module Map
| Module | Responsibility | Owns | Build Order |
|---|---|---|---|
| capture | Lead capture form + consent | contacts, consent_logs | 1st |
| dashboard | View/manage leads list | contacts (read) | 2nd |
| compliance | Privacy Policy + Disclaimer pages | static content | 3rd |
| data | All DB reads/writes | lib/data/* | 1st (foundation) |
