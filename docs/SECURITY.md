# Security

## Secret Handling
- Supabase URL + anon key: public-safe (used client-side for inserts only).
- Supabase service role key: server-only, never exposed to frontend. Used in server actions for admin reads if needed.
- No third-party API keys in v1.
- Environment variables in `.env.local`; Vercel env vars for production.

## Permission Model (v1 → Later)
**v1 (demo-first):** Permissive RLS — anonymous visitors can insert contacts (form submission) and Chris can read the dashboard without login. This is intentional for pilot testing.
**Lock-down sprint:** Replace permissive policies with:
- `contacts`: INSERT for anon (form still works), SELECT only for `auth.uid() = user_id`
- `consent_logs`: INSERT for anon, SELECT only for owner
- `lead_sources`, `products`: SELECT for all (needed for form dropdowns), write only for owner
- Dashboard behind auth — Chris logs in to view leads.

## Approved-Tools Rule
No raw SQL execution from frontend. All DB access through server actions in `lib/actions/` and queries in `lib/data/`. No `rpc()` calls to arbitrary functions. Named server actions only.

## Audit Principle
Every contact insert writes a `consent_logs` row with timestamp + privacy policy version. This is the compliance audit trail — immutable intent (no update/delete on consent_logs even in v1 permissive mode, enforced by policy).

## Compliance Boundary
Zero data from Shopee/Lazada/TikTok Shop enters the database. No import scripts, no export to platforms. This is a hard rule, not a limitation to work around.
