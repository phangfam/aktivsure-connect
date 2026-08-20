-- Read-only reporting view for the on-demand leads-report agent.
-- security_invoker means it still respects the underlying RLS for whichever
-- role queries it; revoking from anon/authenticated additionally keeps it
-- out of the app's PostgREST surface entirely — only a privileged/direct DB
-- connection (e.g. an MCP session) can query it, never the deployed app.
create or replace view v_leads_report
with (security_invoker = true) as
select
  c.id,
  c.name,
  c.phone,
  c.email,
  ls.name as source_name,
  p.name as product_name,
  c.consent_given,
  c.consent_timestamp,
  c.created_at
from contacts c
left join lead_sources ls on ls.id = c.source_id
left join products p on p.id = c.product_id;

revoke all on v_leads_report from anon, authenticated;
