# Bandhan Bank — Unlock Online Banking Access Functional Specification

Version 1.1 | 12 November 2026 | Status: Draft for functional review

## Document basis and execution context

Sources: user-supplied prelogin/functionality screenshots and direct behavior confirmations through 12 November 2026. This is a focused POC FSD based on the supplied evidence, not a claim of complete bank requirements or independently executed verification. Environment: `TEST_ENV=uat`, `BANK=demo`, `LOCALE=en-in`. Use the supplied UAT portal; the page query below is recorded from its screenshot, not a new endpoint assumption.

Input limits and messages retain the user's exact wording. This FSD contains confirmed behavior and selected POC coverage. Test case intents below are not detailed cases, approval records or automation. No fixtures, bindings, selectors or code are generated. Sensitive values remain in authorized local/encrypted sources.

## 1 Scope, entry and controls

**FR-UNL-001 — Entry.** Selecting **Locked out of online banking? Click here** from prelogin opens **Unlock Online Banking access** (`?page=unlock-user-id`). Verification choices are Personal details, Debit card and Credit card. The selected POC covers **Personal details** only.

The Personal details form contains Customer ID, Date of birth, PAN, Mother's maiden name and Continue. Fields show required markers in the supplied screen. Empty-field validation is outside selected coverage.

## 2 PAN and personal-detail processing

**FR-UNL-002 — Invalid PAN format.** An invalid PAN displays exactly:

> Please provide a valid PAN to proceed.

The latest user clarification places validation on **Continue**, with inline feedback directly below the corresponding field.

**OBS-UNL-001 — Incorrect personal information.** The user reports that incorrect information is not rejected before OTP when Customer ID and PAN are valid. After the user completes valid OTP verification, an Error modal is shown with an error icon, title **Error**, exact message **Error in fetching data.**, and **Okay** button.

This is reported current behavior for incorrect personal information with valid Customer ID and PAN. It is not evidence that DOB or mother's maiden name are optional.

## 3 OTP outcomes and account state

**FR-UNL-003 — OTP stage.** Details that advance to verification open the OTP flow. OTP entry is manual during the POC. Valid OTP does not alone prove that unlock succeeded; the resulting modal/account state must be checked for the selected path.

**OBS-UNL-002 — Incorrect OTP.** The user reports no UI feedback for incorrect OTP. The `unLockUserId` request returns HTTP **417 Expectation Failed**. The supplied response shows `result: SUCCESSFUL` alongside nested `title: Invalid OTP`, `detail: Invalid OTP`, `code: DIGX_TFA_0004`, `type: ERROR`. The outer result is not evidence of a successful unlock.

Record the response and missing UI feedback as reported current behavior and a UI feedback gap, not as a requirement that OTP errors should be silent.

**FR-UNL-004 — Already-unlocked user.** An already-unlocked user follows the same detail-entry and OTP process; no earlier account-unlocked check is reported. After valid verification, the supplied screen displays an information modal with the exact text **User ID is already unlocked**, an information icon, **Continue to Login** button and a close icon.

**FR-UNL-005 — Successful unlock of a locked user (DEFERRED).** The user reports that valid personal details and valid OTP can produce a successful unlock confirmation. Per the user's instruction, retain this flow in the FSD for later addition, but exclude its successful-unlock case from the current POC. The already-unlocked modal is a separate outcome and must not be used as proof that a locked user was unlocked.

## 4 Selected POC coverage — four case intents

| Intent | Type | Traceability |
| --- | --- | --- |
| Invalid PAN format displays its exact inline message | Negative | FR-UNL-002 |
| Controlled incorrect personal details with valid Customer ID/PAN reach OTP, then valid OTP produces Error in fetching data. | Negative / observation | OBS-UNL-001, FR-UNL-003 |
| Incorrect OTP response and missing UI feedback are characterized | Negative / observation | OBS-UNL-002 |
| Already-unlocked user completes the same verification flow and sees User ID is already unlocked | Edge | FR-UNL-003, FR-UNL-004 |

Successful unlock is documented under FR-UNL-005 but is **not** one of these four selected cases. The already-unlocked edge case must not be reported as evidence that a locked user was unlocked.
