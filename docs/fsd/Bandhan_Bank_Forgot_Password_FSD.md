# Bandhan Bank — Forgot Password Functional Specification

Version 1.1 | 12 November 2026 | Status: Draft for functional review

## Document basis and execution context

Sources: user-supplied prelogin/functionality screenshots and direct behavior confirmations through 12 November 2026. This is a focused POC FSD based on the supplied evidence, not a claim of complete bank requirements or independently executed verification. Environment: `TEST_ENV=uat`, `BANK=bandhan`, `LOCALE=en-in`. Use the supplied UAT portal; the page query below is recorded from its screenshot, not a new endpoint assumption.

Input limits and messages retain the user's exact wording. This FSD contains confirmed behavior and selected POC coverage. Test case intents below are not detailed cases, approval records or automation. No fixtures, bindings, selectors or code are generated. Sensitive values remain in authorized local/encrypted sources.

## 1 Scope and entry

**FR-FPWD-001 — Entry.** Selecting **Forgot Password** on prelogin opens the **Forgot Password** page (`?page=user-information`). The screen shows the stages **Verify your details** and **Reset password**. Only Debit Card verification-form negative/input cases are selected. Credit Card verification and the reset-password stage are outside current POC coverage.

The form contains Customer ID, Card Number, Expiry month/year, ATM PIN and Continue. Know your Customer ID navigation leads to a separately owned flow.

Valid debit-card information is unavailable. Successful verification and password-reset completion are outside current POC coverage.

## 2 Validation rules

**FR-FPWD-002 — Required input feedback.** Continue with empty Customer ID, card number and ATM PIN displays the following messages.

Required-field validation occurs when the user selects **Continue**. Applicable messages appear together, directly below their corresponding input fields. This does not establish other undocumented blur or live-validation behavior.

| Field / state | Exact inline message |
| --- | --- |
| Empty Customer ID | Please provide your Customer Id to proceed |
| Empty card number | Please provide your card number to proceed |
| Empty ATM PIN | Please provide your ATM pin to proceed |

**OBS-FPWD-001 — No expiry validation feedback.** The user reports no validation for Expiry on this form. Do not copy the Forgot User ID expiry-month message into this flow. This documents the current UI behavior only.

**FR-FPWD-003 — Card input maximum.** Card number has a maximum of **16 digits**; input exceeding it is blocked. The selected check verifies the input cap only.

**FR-FPWD-004 — ATM PIN length.** ATM PIN must have **4 digits**. An invalid-length value shows the following on Continue:

> ATM pin should have 4 digits. Please enter a valid ATM pin.

Empty-PIN feedback is the required-field message above.

**FR-FPWD-005 — Expiry options.** Only future expiry options are provided; expired dates cannot be selected. The screenshot shows a year selected. The selected POC checks clearly expired choices.

## 3 Selected POC coverage — four case intents

| Intent | Type | Traceability |
| --- | --- | --- |
| Empty verification fields show the three supplied messages together; no expiry message is reported | Negative / observation | FR-FPWD-002, OBS-FPWD-001 |
| Card input at 15/16 digits and attempted 17th digit respects its cap | Boundary | FR-FPWD-003 |
| Nonempty PIN below four digits shows the stated length message on Continue | Negative / boundary | FR-FPWD-004 |
| Expired expiry choices cannot be selected | Negative / edge | FR-FPWD-005 |

## 4 Deferred coverage

Successful debit-card verification and password reset are deferred. Current coverage is limited to the four selected validation and input cases above.
