# Data Model

## lead_sources
| Field | Type | Notes |
|---|---|---|
| id | uuid | PK, default gen_random_uuid() |
| name | text | e.g. "Packing Insert QR" |
| slug | text | unique, e.g. "insert-qr" |
| user_id | uuid | nullable (owner-scope later) |
| created_at | timestamptz | default now() |

**Relationships:** 1 → many contacts.

## products
| Field | Type | Notes |
|---|---|---|
| id | uuid | PK |
| name | text | e.g. "AktivSure DM" |
| slug | text | unique |
| user_id | uuid | nullable |
| created_at | timestamptz | default now() |

**Relationships:** 1 → many contacts.

## contacts
| Field | Type | Notes |
|---|---|---|
| id | uuid | PK |
| name | text | not null |
| phone | text | nullable (phone or email required) |
| email | text | nullable |
| source_id | uuid | FK → lead_sources |
| product_id | uuid | FK → products |
| consent_given | boolean | not null, must be true on submit |
| consent_timestamp | timestamptz | when consent was given |
| privacy_policy_version | text | e.g. "v1-2026-08" |
| notes | text | optional |
| user_id | uuid | nullable (owner-scope later) |
| created_at | timestamptz | default now() |

**Relationships:** N → 1 lead_source, N → 1 product, 1 → many consent_logs.

**Constraints:** `consent_given` must be true (enforced at submit). At least one of phone/email must be non-null.

## consent_logs
| Field | Type | Notes |
|---|---|---|
| id | uuid | PK |
| contact_id | uuid | FK → contacts |
| consent_type | text | e.g. "marketing_opt_in" |
| privacy_policy_version | text | version referenced |
| ip_address | text | nullable, for audit |
| user_id | uuid | nullable |
| created_at | timestamptz | default now() |

**Relationships:** N → 1 contact.

## RLS Notes
All tables: RLS enabled, permissive v1 policies (select/insert/update for all) so demo works without login. Lock-down sprint replaces with `auth.uid() = user_id` owner-scoped policies.

## AI Fields
None in v1. Reserved fields for later scoring: `lead_score` (numeric), `score_source` (text), `score_confidence` (numeric), `score_review_status` (text default 'unreviewed') on contacts — added in a later sprint, not v1 migration.
