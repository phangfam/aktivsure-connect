# AktivSure Capture Funnel — Product Requirements Document (v1)

**Owner:** Chris Phang
**Status:** Draft — Pilot Build
**Last updated:** August 19, 2026

---

## 1. Problem Statement

All AktivSure sales currently happen through Shopee, Lazada, and TikTok Shop. These platforms own the customer relationship — contact data is masked or restricted, and platform Terms of Service typically prohibit soliciting buyers off-platform. As a result, AktivSure has no way to retarget, upsell, or re-engage past customers once a sale closes on-platform.

This project pilots a first-party capture mechanism for AktivSure specifically — a funnel/website that captures customer contact information legitimately (not scraped or exported from platform data), so AktivSure can begin building an owned audience independent of Shopee/Lazada/TikTok. This is a pilot for the single AktivSure brand before considering the same approach across the wider ecommerce portfolio.

---

## 2. Target User (Internal)

Chris Phang, testing this as a pilot for AktivSure before deciding whether to extend the approach to other ecommerce brands. Board position at AktivSure — vendor/build role to be treated separately from board role, per existing working principle.

---

## 3. Core Entities (What Gets Tracked)

| Entity | Description |
|---|---|
| Lead capture source | Where the contact came from (e.g. packing-insert QR, funnel signup, giveaway) |
| Contact record | Name, phone/email, consent status, date captured |
| Consent status | Explicit opt-in confirmation (PDPA-compliant) — timestamped |
| Product interest | Which AktivSure product(s) the contact is associated with (e.g. AktivSure DM) |

---

## 4. Core Workflow (v1 — the ONE thing that must work end-to-end)

1. A customer reaches the AktivSure funnel/website (initial traffic source TBD — e.g. QR code on packing insert, or direct link).
2. Customer is presented with a lead capture form (e.g. warranty registration, loyalty signup, or discount-for-next-purchase offer).
3. Form includes:
   - Explicit, non-pre-ticked consent checkbox referencing the Privacy Policy
   - Link to Privacy Policy and Disclaimer pages
4. On submission, contact is saved as a lead record with consent timestamp.
5. Chris can view captured leads in a simple list/dashboard.

**Hard constraint:** No data is pulled or scraped from Shopee/Lazada/TikTok Shop. All captured contacts must come through explicit, on-site opt-in — not platform export. This is a compliance boundary, not a technical limitation to work around.

---

## 5. Compliance Requirements (Non-Negotiable for v1)

- **Privacy Policy page** — PDPA-compliant (Malaysia, PDPA 2010): what data is collected, why, how it's stored, how a customer can request access/correction/deletion.
- **Consent checkbox** at point of capture — explicit opt-in, not pre-ticked, linked to the Privacy Policy.
- **Disclaimer page** — covering product claims. Given AktivSure DM appears positioned around diabetic/dietary formulation, any health-related claims on the funnel need review against Malaysia's Food Act / Control of Drugs and Cosmetics Regulations, separate from PDPA. Flag to AktivSure's regulatory contact before publishing claims-based copy.

*Note: this PRD is not legal advice. Privacy Policy and Disclaimer content should be drafted from a proper Malaysian PDPA-compliant template and reviewed before launch.*

---

## 6. Brand Design Requirements

Funnel/website visual identity to match AktivSure packaging:

- **Primary:** Deep navy/dark blue (dominant packaging color)
- **Accent:** Gold/yellow (ribbon, vitamin badge accents)
- **Support:** White (contrast, clean/clinical trust)

Exact hex values to be pulled from packaging reference before build begins.

---

## 7. Success Criteria (Pilot)

- Capture mechanism live and functional (e.g. QR → form → saved record).
- At least 20–30 real contacts captured with valid consent.
- Privacy Policy and Disclaimer live and linked at point of capture — zero non-compliant submissions.
- Chris can view the list of captured contacts in one place.

---

## 8. Out of Scope for v1 (Explicitly NOT Building)

- No CRM automation, retargeting, or upsell logic yet — capture only
- No data import/export from Shopee, Lazada, or TikTok Shop
- No email/WhatsApp campaign sending — that's a later build once contacts exist
- No multi-brand rollout — AktivSure only, as a pilot
- No payment/checkout functionality — this is a capture funnel, not a sales funnel (v1)
- No analytics dashboard beyond a simple contact list

---

## 9. Who Uses This

Chris — as the pilot test for AktivSure specifically, ahead of any decision to extend this pattern to other ecommerce brands under the wider portfolio.

**Future consideration (not v1):** If the capture mechanism proves it can reliably collect consented contacts, the next phase is CRM logic (CAR-format retargeting triggers) and possibly extending the same pattern to other ecommerce brands. Both are explicitly deferred.

---

## 10. What This Replaces / Earns

Replaces total dependence on Shopee/Lazada/TikTok Shop for all customer relationship data — currently zero ability to retarget or upsell past buyers.

If the pilot proves contacts can be captured legitimately and consistently, it earns the foundation for a real owned-audience layer — the first step toward reducing platform dependency across the ecommerce business.
