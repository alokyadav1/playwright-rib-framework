# Bandhan Bank Forgot User ID traceability

- **Source:** `docs/fsd/Bandhan_Bank_Forgot_User_ID_FSD.md`, version 1.2, 17 November 2026
- **Selected scope:** Five case intents in §3. The first four designs were approved by the user on 16 November 2026; RIB_FUID_005 was approved after review of the 17 November 2026 design. Existing UAT outcomes are recorded below.

| Requirement | Case | Expected outcome | Evidence source | State |
|---|---|---|---|---|
| FR-FUID-002.1-.5 | RIB_FUID_001 | Continue with required values empty displays the four exact inline messages together below their fields. | Forgot User ID FSD §2 | Verified; UAT pass |
| FR-FUID-003.1 | RIB_FUID_002 | 15/16-digit values are retained; typing a 17th digit and pasting an 18-digit value do not exceed 16 digits. | Forgot User ID FSD §§2-3 | Failed; current UAT run leaves the field empty after paste; see [failure record](../agent-runs/forgot-user-id-card-paste/failures/RIB_FUID_002.md) |
| FR-FUID-004.1 | RIB_FUID_003 | A nonempty three-digit PIN is rejected as shorter than the required four digits. | Forgot User ID FSD §2 | Partial coverage; four-digit acceptance is not in the selected intent; UAT pass for short-PIN rejection |
| FR-FUID-004.2 | RIB_FUID_003 | Nonempty three-digit PIN displays the exact invalid-length message on Continue. | Forgot User ID FSD §2 | Verified; UAT pass; client-side validation confirmed |
| FR-FUID-005.2 | RIB_FUID_004 | An expired expiry date cannot be selected. | Forgot User ID FSD §2 | Verified; UAT pass; current year/month options exclude expired choices |
| FR-FUID-006.1-.3 | RIB_FUID_005 | A valid but unassociated debit card opens OTP verification and, after correct OTP, displays the specified Error modal. | Forgot User ID FSD §2; user-supplied screenshot dated 17 November 2026 | Approved; blocked at CP2 pending profile and OTP access |

## Uncovered or deferred requirements

| Requirement | Disposition | Reason |
|---|---|---|
| FR-FUID-001.1-.4 | Setup or outside selected outcomes | Entry, form controls, Debit Card option, and the Know your Customer ID link are setup or outside the four intents. |
| FR-FUID-002.6 | Uncovered | Current-year preselection is specified but not among the four selected intents. |
| FR-FUID-005.1 | Uncovered | Future-option availability is specified, while the selected case covers only expired-date exclusion. |
| Successful recovery, downstream OTP, recovered User ID delivery | Deferred by FSD | Complete debit-card recovery flow and usable debit-card details are unavailable. |

## Data readiness before implementation

- RIB_FUID_001: data-ready; no test values required, only labels from the FSD.
- RIB_FUID_002: data-ready; encrypted synthetic 15-, 16-, 17-, and 18-digit test-only samples are present.
- RIB_FUID_003: data-ready; existing encrypted Customer ID and encrypted synthetic card/PIN values are available; user confirmed client-side validation before backend authentication. Expiry is selected from current UI options.
- RIB_FUID_004: data-ready; no static values required; runtime options must be inspected to verify the expired-date behavior.
- RIB_FUID_005: blocked before implementation; needs an approved encrypted mismatched Customer ID/card profile and authorized access to the correct OTP channel.
- Approved cases: 5; RIB_FUID_005 blocked at CP2. Existing automated examples: 4; one project.
- Exact existing listing command: `npm run test:list -- --grep "RIB_FUID_00[1-4] -"`. After approval and implementation, include RIB_FUID_005.
- RIB_FUID_001, 003, and 004 passed in UAT; RIB_FUID_002 remains failed and unresolved. No case is reported as fully verified outside the recorded assertions.
