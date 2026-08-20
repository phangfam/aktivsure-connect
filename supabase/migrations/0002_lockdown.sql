-- AktivSure Capture Funnel — Sprint 4: lock down dashboard, tighten RLS
-- Anon can still INSERT via the public capture form. Reads/writes elsewhere
-- require an authenticated session. consent_logs has no update/delete policy
-- at all — RLS defaults to deny, making it an immutable audit trail.

-- lead_sources: read for everyone (needed for the public capture form dropdown),
-- write for authenticated only
drop policy if exists "lead_sources_v1_read" on lead_sources;
drop policy if exists "lead_sources_v1_write" on lead_sources;
create policy "lead_sources_read_all" on lead_sources for select using (true);
create policy "lead_sources_write_authenticated" on lead_sources
  for all to authenticated using (true) with check (true);

-- products: read for everyone, write for authenticated only
drop policy if exists "products_v1_read" on products;
drop policy if exists "products_v1_write" on products;
create policy "products_read_all" on products for select using (true);
create policy "products_write_authenticated" on products
  for all to authenticated using (true) with check (true);

-- contacts: anon can still insert (capture form), read/update/delete authenticated only
drop policy if exists "contacts_v1_read" on contacts;
drop policy if exists "contacts_v1_write" on contacts;
create policy "contacts_insert_anyone" on contacts for insert with check (true);
create policy "contacts_select_authenticated" on contacts
  for select to authenticated using (true);
create policy "contacts_update_authenticated" on contacts
  for update to authenticated using (true) with check (true);
create policy "contacts_delete_authenticated" on contacts
  for delete to authenticated using (true);

-- consent_logs: anon can still insert (paired with contact submission),
-- read authenticated only, no update/delete policy for anyone (audit trail)
drop policy if exists "consent_logs_v1_read" on consent_logs;
drop policy if exists "consent_logs_v1_write" on consent_logs;
create policy "consent_logs_insert_anyone" on consent_logs for insert with check (true);
create policy "consent_logs_select_authenticated" on consent_logs
  for select to authenticated using (true);
