# Test Plan

## v1 Success Scenario (Manual)
1. Open `/capture?source=insert-qr` — form loads with AktivSure branding (navy/gold/white)
2. Verify consent checkbox is **unchecked** by default
3. Verify Privacy Policy link is present and navigates to `/privacy`
4. Verify Disclaimer link is present and navigates to `/disclaimer`
5. Leave form empty → click Submit → verify validation blocks submission
6. Fill name: "Test Customer", phone: "0123456789", select product "AktivSure DM"
7. Leave consent unchecked → Submit → verify error: "Please accept the Privacy Policy to continue"
8. Check consent box → Submit → verify success screen appears
9. Open `/dashboard` → verify "Test Customer" appears in list with correct source, product, and consent timestamp
10. Verify record exists in Supabase `contacts` table with `consent_given = true` and matching `consent_logs` row

## Empty/Error Cases
- **No contacts in DB:** Dashboard shows "No contacts captured yet" empty state
- **Search no match:** Dashboard shows "No contacts match your search"
- **Network error on submit:** Form shows error message, retains entered data
- **Invalid source param:** Form still loads (defaults to "direct-link" source)
- **Loading state:** Submit button shows spinner, disabled during request

## Compliance Checks
- Privacy Policy page contains: data collected, purpose, storage, access/correction/deletion rights
- Disclaimer page exists and is linked from capture form
- No pre-ticked consent checkbox (hard refresh and verify)
- consent_logs row created with privacy_policy_version matching current version

## Brand Checks
- Primary color = deep navy on header/sidebar/buttons
- Accent = gold on highlights/checkbox border/success icon
- Support = white background, clean clinical feel
- Responsive: mobile shows hamburger menu, form stacks vertically

## Post-Lock-Down Checks (Sprint 4)
- Anonymous can still submit form at `/capture`
- `/dashboard` redirects to `/login` when not authenticated
- Chris logs in → sees contacts list
- Attempting to update a consent_logs row via Supabase client → blocked by RLS
