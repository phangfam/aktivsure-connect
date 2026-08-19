# Agentic Layer

## v1: No Agentic Actions
The funnel is fully manual: customer fills form, Chris views list. No automation.

## Draftable Actions (Later)
| Action | Risk | Trigger |
|---|---|---|
| Draft follow-up WhatsApp message | low (draft only) | lead score ≥50 |
| Draft email newsletter welcome | low (draft only) | new consented contact |
| Tag contact as "high-intent" | low (auto) | score ≥75 |

## Executable After Approval (Later)
| Action | Risk | Notes |
|---|---|---|
| Send follow-up WhatsApp | high | Chris approves each send |
| Add contact to email list | medium | Chris approves, then sync |
| Update contact status to "contacted" | medium | Chris approves |

## Human-Only (Always)
| Action | Reason |
|---|---|
| Delete contact | data-loss risk, PDPA deletion request |
| Export contact list | compliance boundary — no platform data export |
| Edit consent record | legal audit trail integrity |
| Publish claims-based copy | regulatory review required |

## Named Tools (Later)
- `draft_whatsapp_message` — low risk, returns draft text
- `draft_email_welcome` — low risk, returns draft text
- `score_lead` — low risk, writes score fields
- `send_whatsapp` — high risk, requires approval, logs to audit

## Audit Log Fields (Later)
| Field | Type |
|---|---|
| id | uuid |
| actor | text (user or agent) |
| action | text (e.g. "send_whatsapp") |
| target_contact_id | uuid |
| status | text (approved/rejected/executed) |
| detail | jsonb |
| created_at | timestamptz |

## v1 vs Later
**v1:** Zero agentic actions. Manual capture + manual review only.
**Later:** Draft messages → Chris approves → send → audit log.
