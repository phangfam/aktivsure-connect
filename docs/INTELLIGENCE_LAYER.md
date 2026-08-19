# Intelligence Layer

## v1: No AI
The capture funnel is a deterministic form → database → list. No intelligence required.

## Messy Inputs (Later)
- Free-text product interest field → map to known product slug
- Partial phone numbers → normalize to Malaysian format (+60)
- Duplicate contacts (same phone, different name) → merge suggestion

## Auto-Structure Schema (Later)
```json
{
  "contact_id": "uuid",
  "normalized_phone": "+60123456789",
  "normalized_email": "lowercase@domain.com",
  "dedup_match": "existing_contact_uuid | null",
  "source_channel": "insert-qr",
  "lead_score": 75,
  "score_source": "rule_engine_v1",
  "score_confidence": 0.8,
  "score_review_status": "unreviewed"
}
```

## Scoring Rules (Later — Rule-Based Start)
| Signal | Points |
|---|---|
| Provided email | +20 |
| Provided phone | +20 |
| Source = insert-qr (purchaser) | +30 |
| Source = giveaway (lower intent) | +10 |
| Consent timestamp within 24h | +10 |
| Selected high-value product (DM) | +10 |
**Max score: 100.** Threshold for follow-up: ≥50.

## Events to Track (Later)
- Form opened (by source slug)
- Form submitted
- Form abandoned (optional, if feasible client-side)
- Privacy Policy page view
- Disclaimer page view

## What Gets Ranked (Later)
Contacts by lead score → Chris sees highest-intent leads first.

## v1 vs Later
**v1:** Capture + consent + list only. No scoring, no dedup, no analytics.
**Later:** Scoring, dedup, source conversion analytics, follow-up reminders.
