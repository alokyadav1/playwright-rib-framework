# Bandhan Bank — Forgot User ID Functional Specification

Version 1.2 | 17 November 2026 | Status: Draft for functional review

## Document basis and execution context

Sources: user-supplied prelogin/functionality screenshots and direct behavior confirmations through 17 November 2026. This is a focused POC FSD based on the supplied evidence, not a claim of complete bank requirements or independently executed verification. Environment: `TEST_ENV=uat`, `BANK=bandhan`, `LOCALE=en-in`. Use the supplied UAT portal; the page query below is recorded from its screenshot, not a new endpoint assumption.

Input limits and messages retain the user's exact wording. This FSD contains confirmed behavior and selected POC coverage. Test case intents below are not detailed cases, approval records or automation. No fixtures, bindings, selectors or code are generated. Sensitive values remain in authorized local/encrypted sources.

## 1 Scope and entry

**FR-FUID-001 — Entry.** From prelogin, selecting **Forgot User ID** opens the page with heading **Forgot User ID** (`?page=user-recovery-info`). The selected POC covers the **Debit Card** option only. Credit Card is visible but not selected for this scope.

The form contains Customer ID, Card number, Expiry month/year, ATM PIN and Continue. A Know your Customer ID link is visible below Customer ID; its retrieval flow belongs to the separate Know Customer ID FSD.

No complete successful debit-card recovery flow or usable debit-card details have been supplied. Delivery of the recovered User ID remains outside current execution scope. The selected POC now includes the supplied mismatched-debit-card path through valid OTP verification. No incorrect-PIN backend authentication result is assumed.

## 2 Validation rules

**FR-FUID-002 — Required fields.** Customer ID, card number, expiry and ATM PIN are required. The current year is always selected in the year dropdown; there is no need to invent a missing-year message.

Required-field validation occurs when the user selects **Continue**. Applicable messages appear together, directly below their corresponding input fields. This does not establish other undocumented blur or live-validation behavior.

| Field / state | Exact inline message |
| --- | --- |
| Empty Customer ID | Please provide your Customer Id to proceed |
| Empty card number | Please provide your card number to proceed |
| No expiry month selected | Please provide your card expiry month to proceed |
| Empty ATM PIN | Please provide your ATM pin to proceed |

The expiry-month message was explicitly supplied in the earlier clarification and has not been withdrawn; the latest clarification reconfirmed the other three messages and the preselected year.

**FR-FUID-003 — Card input maximum.** Card number has a maximum of **16 digits**. Additional input beyond that maximum is blocked, including when testing typing/pasting as clarified by the user. The selected check verifies the input cap only, not successful recovery.

**FR-FUID-004 — ATM PIN length.** ATM PIN must have **4 digits**. On Continue, an invalid-length PIN shows exactly:

> ATM pin should have 4 digits. Please enter a valid ATM pin.

Required-empty feedback is defined separately by FR-FUID-002.

**FR-FUID-005 — Expiry selection.** Month/year dropdowns provide future date options; an expired date cannot be selected. Current year is preselected. The selected POC checks that clearly expired dates cannot be selected.

**FR-FUID-006 — Debit card not associated with Customer ID.** When the user submits a valid Customer ID with otherwise valid debit-card details for a card that is not associated with that Customer ID, the system opens OTP verification. After the user enters and submits the correct OTP, the system opens an Error modal with an error icon, title **Error**, exact message **Debit card detail is incorrect. Please enter correct details.**, and an **Okay** button.

This negative flow verifies the association check after OTP. It does not establish successful User ID recovery or the behavior of an invalid card number, expired card, incorrect PIN, or incorrect OTP.

## 3 Selected POC coverage — five case intents

| Intent | Type | Traceability |
| --- | --- | --- |
| Continue with required fields empty shows all applicable inline messages together | Negative | FR-FUID-002 |
| Card input at 15/16 digits and attempted 17th digit respects the 16-digit cap | Boundary | FR-FUID-003 |
| Nonempty PIN below four digits shows the stated length message on Continue | Negative / boundary | FR-FUID-004 |
| Expired expiry options cannot be selected | Negative / edge | FR-FUID-005 |
| Valid Customer ID with a valid but unassociated debit card reaches OTP and shows the specified Error modal after correct OTP | Negative / association | FR-FUID-006 |

Use independently controlled field states. Do not infer success from a field accepting a value. A maximum-length case checks the retained input, not an invented error message.

## 4 Deferred coverage

Successful User ID recovery is deferred because the complete successful debit-card flow and associated valid debit-card data are unavailable. Current coverage is limited to the five selected cases above, including the supplied mismatched-card path through correct OTP verification.
