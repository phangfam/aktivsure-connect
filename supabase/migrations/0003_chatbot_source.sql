-- Seed: chatbot lead source, for leads captured via the deterministic
-- customer-service chatbot's escalation path
insert into lead_sources (name, slug) values
  ('Chatbot', 'chatbot')
on conflict (slug) do nothing;
