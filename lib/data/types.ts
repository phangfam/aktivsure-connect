export type LeadSource = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};

export type Contact = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  source_id: string | null;
  product_id: string | null;
  consent_given: boolean;
  consent_timestamp: string | null;
  privacy_policy_version: string | null;
  notes: string | null;
  created_at: string;
};

export type ContactWithRelations = Contact & {
  lead_sources: { name: string; slug: string } | null;
  products: { name: string; slug: string } | null;
};

export const PRIVACY_POLICY_VERSION = "v1-2026-08";
