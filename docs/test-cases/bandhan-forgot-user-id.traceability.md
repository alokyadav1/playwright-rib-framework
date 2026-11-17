# Bandhan Bank Forgot User ID traceability

- **Source:** `docs/fsd/Bandhan_Bank_Forgot_User_ID_FSD.md`, version 1.2, 17 November 2026
- **Selected scope:** Five case intents in §3 plus approved RIB_FUID_006 from the user's 17 November 2026 expiry-option instruction.

| Requirement | Case | Expected outcome | Evidence source | State |
|---|---|---|---|---|
| FR-FUID-002.1-.5 | RIB_FUID_001 | Continue with required values empty displays the four exact inline messages together below their fields. | Forgot User ID FSD §2 | Verified; UAT pass |
| FR-FUID-003.1 | RIB_FUID_002 | Entering a 17-digit debit card number retains only 16 digits. | Forgot User ID FSD §§2-3; user amendment dated 17 November 2026 | Verified; UAT pass |
| FR-FUID-004.1 | RIB_FUID_003 | A nonempty three-digit PIN is rejected as shorter than the required four digits. | Forgot User ID FSD §2 | Partial coverage; four-digit acceptance is not in the selected intent; UAT pass for short-PIN rejection |
| FR-FUID-004.2 | RIB_FUID_003 | Nonempty three-digit PIN displays the exact invalid-length message on Continue. | Forgot User ID FSD §2 | Verified; UAT pass; client-side validation confirmed |
| FR-FUID-005.2 | RIB_FUID_004 | An expired expiry date cannot be selected. | Forgot User ID FSD §2 | Verified; UAT pass; current year/month options exclude expired choices |
| FR-FUID-006.1-.3 | RIB_FUID_005 | A valid but unassociated debit card opens OTP verification and, after correct OTP, displays the specified Error modal. | Forgot User ID FSD §2; user-supplied screenshot dated 17 November 2026 | Automated; blocked verification pending successful manual OTP completion |
| FR-FUID-005.1, USER-FUID-EXP-001.1-.3 | RIB_FUID_006 | Years run from the current year through current year +10 inclusive; current-year months start at the current month; a future year shows all 12 months. | Forgot User ID FSD §2; user instruction approved 17 November 2026 | Verified; UAT pass |

## Uncovered or deferred requirements

| Requirement | Disposition | Reason |
|---|---|---|
| FR-FUID-001.1-.4 | Setup or outside selected outcomes | Entry, form controls, Debit Card option, and the Know your Customer ID link are setup or outside the four intents. |
| FR-FUID-002.6 | Uncovered | Current-year preselection is specified but not among the four selected intents. |
| Successful recovery, downstream OTP, recovered User ID delivery | Deferred by FSD | Complete debit-card recovery flow and usable debit-card details are unavailable. |

## Data readiness before implementation

- RIB_FUID_001: data-ready; no test values required, only labels from the FSD.
- RIB_FUID_002: data-ready; an encrypted synthetic 17-digit test-only sample is present. The 16-digit sample remains for RIB_FUID_003.
- RIB_FUID_003: data-ready; existing encrypted Customer ID and encrypted synthetic card/PIN values are available; user confirmed client-side validation before backend authentication. Expiry is selected from current UI options.
- RIB_FUID_004: data-ready; no static values required; runtime options must be inspected to verify the expired-date behavior.
- RIB_FUID_005: automated but blocked during verification because the prior headed run did not receive manual OTP input before timeout.
- RIB_FUID_006: no stored data required; runtime India date determines the exact expected year and month options. Focused UAT run passed.
- Approved cases: 6; all 6 automated; RIB_FUID_005 remains blocked on manual OTP completion; RIB_FUID_001-004 and 006 are verified.
- Exact focused command: `npm test -- --grep "RIB_FUID_006 -" --retries=0`.
- RIB_FUID_001, 002, 003, and 004 passed in UAT. RIB_FUID_002 collected once and passed after its 17 November 2026 scope amendment.
