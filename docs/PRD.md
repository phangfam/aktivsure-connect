# AktivSure Capture Funnel — PRD

**Owner:** Chris Phang | **Status:** Pilot Build | **Brand:** AktivSure

## Problem
All AktivSure sales happen on Shopee/Lazada/TikTok Shop. Platforms own customer data, block off-platform solicitation, and prevent retargeting/upselling past buyers.

## Target User
Chris Phang — pilot admin. Views captured leads in a simple dashboard. Board/vendor roles kept separate.

## Core Objects
- **Lead Source** — where the contact came from (packing-insert QR, funnel signup, giveaway)
- **Contact** — name, phone/email, consent status + timestamp, product interest
- **Product** — AktivSure product the contact is associated with (e.g. AktivSure DM)
- **Consent Log** — explicit opt-in record (not pre-ticked), linked to Privacy Policy version

## MVP (v1) Checklist
- [ ] Lead capture form (warranty registration / loyalty signup / discount offer framing)
- [ ] Explicit non-pre-ticked consent checkbox linked to Privacy Policy
- [ ] Privacy Policy page (PDPA-compliant: what data, why, storage, access/correction/deletion rights)
- [ ] Disclaimer page (product claims; flag to regulatory contact before publishing)
- [ ] QR-code-friendly landing URL
- [ ] On submit: contact saved with consent timestamp + source + product interest
- [ ] Leads dashboard: Chris views all captured contacts in one list
- [ ] Brand styling: deep navy primary, gold accent, white support
- [ ] Zero data scraped/imported from Shopee/Lazada/TikTok Shop

## Non-Goals (v1)
No CRM automation, retargeting, upsell logic. No platform data import/export. No email/WhatsApp sending. No multi-brand rollout. No payment/checkout. No analytics beyond contact list.

## Success Criteria
A customer scans a QR code on a packing insert → lands on the capture form → fills name + phone, checks consent → record saved with timestamp → Chris opens dashboard and sees the new contact in the list. 20–30 real contacts captured with valid consent. Privacy Policy and Disclaimer live and linked — zero non-compliant submissions.
