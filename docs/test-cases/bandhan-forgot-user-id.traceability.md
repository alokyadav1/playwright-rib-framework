# Bandhan Bank Forgot User ID traceability

- **Source:** `docs/fsd/Bandhan_Bank_Forgot_User_ID_FSD.md`, version 1.1, 12 November 2026
- **Selected scope:** Four case intents in §3; designs approved by the user on 16 November 2026. Data keys are prepared; no test is implemented or verified.

| Requirement | Case | Expected outcome | Evidence source | State |
|---|---|---|---|---|
| FR-FUID-002.1-.5 | RIB_FUID_001 | Continue with required values empty displays the four exact inline messages together below their fields. | Forgot User ID FSD §2 | Verified; UAT pass |
| FR-FUID-003.1 | RIB_FUID_002 | 15/16-digit values are retained; typing/pasting a 17-digit value does not exceed 16 digits. | Forgot User ID FSD §§2-3 | Failed; unresolved after three repair attempts; see failure record |
| FR-FUID-004.1 | RIB_FUID_003 | A nonempty three-digit PIN is rejected as shorter than the required four digits. | Forgot User ID FSD §2 | Partial coverage; four-digit acceptance is not in the selected intent; UAT pass for short-PIN rejection |
| FR-FUID-004.2 | RIB_FUID_003 | Nonempty three-digit PIN displays the exact invalid-length message on Continue. | Forgot User ID FSD §2 | Verified; UAT pass; client-side validation confirmed |
| FR-FUID-005.2 | RIB_FUID_004 | An expired expiry date cannot be selected. | Forgot User ID FSD §2 | Verified; UAT pass; current year/month options exclude expired choices |

## Uncovered or deferred requirements

| Requirement | Disposition | Reason |
|---|---|---|
| FR-FUID-001.1-.4 | Setup or outside selected outcomes | Entry, form controls, Debit Card option, and the Know your Customer ID link are setup or outside the four intents. |
| FR-FUID-002.6 | Uncovered | Current-year preselection is specified but not among the four selected intents. |
| FR-FUID-005.1 | Uncovered | Future-option availability is specified, while the selected case covers only expired-date exclusion. |
| Successful recovery, downstream OTP, recovered User ID delivery | Deferred by FSD | Complete debit-card recovery flow and usable debit-card details are unavailable. |

## Data readiness before implementation

- RIB_FUID_001: data-ready; no test values required, only labels from the FSD.
- RIB_FUID_002: data-ready; encrypted synthetic 15-, 16-, and 17-digit test-only samples are present.
- RIB_FUID_003: data-ready; existing encrypted Customer ID and encrypted synthetic card/PIN values are available; user confirmed client-side validation before backend authentication. Expiry is selected from current UI options.
- RIB_FUID_004: data-ready; no static values required; runtime options must be inspected to verify the expired-date behavior.
- Approved cases: 4; expected examples: 4; one project.
- Exact listing command: `npm run test:list -- --grep "RIB_FUID_00[1-4] -"`.
- RIB_FUID_001, 003, and 004 passed in UAT; RIB_FUID_002 remains failed and unresolved. No case is reported as fully verified outside the recorded assertions.