# Bandhan Bank Forgot Password traceability

- **Source:** `docs/fsd/Bandhan_Bank_Forgot_Password_FSD.md`, version 1.1, 12 November 2026
- **Selected scope:** Four case intents in §3. Designs approved by the user on 16 November 2026.
- **Execution status:** All four cases automated. The user confirmed the 18-digit paste must retain 16 digits; RIB_FPWD_002 fails this check in UAT. RIB_FPWD_001, 003 and 004 passed after the amendment.

Requirements: 14 total, 14 testable, 9 fully covered, 1 partly covered, and 4 outside selected outcomes. Test cases: 4 total, 4 automated, 3 verified, 1 failed, 0 blocked.

| Requirement | Case | Expected outcome | Evidence source | State |
|---|---|---|---|---|
| FR-FPWD-002.1-.4 | RIB_FPWD_001 | Continue with Customer ID, card number, and ATM PIN empty displays all three exact messages together below their fields. | Forgot Password FSD §2 | Verified; UAT pass |
| OBS-FPWD-001 | RIB_FPWD_001 | No expiry validation feedback appears. | Forgot Password FSD §2 | Verified; UAT pass |
| FR-FPWD-003.1 | RIB_FPWD_002 | 15- and 16-digit values are retained; a typed 17th digit is blocked; an 18-digit paste leaves the field at 16 digits. | Forgot Password FSD §§2-3; user-confirmed alignment with RIB_FUID_002 | Failed: 15/16-digit values and typed cap passed; after paste the field was empty instead of retaining 16 digits. See [failure record](../agent-runs/bandhan-forgot-password/failures/RIB_FPWD_002.md) and [defect record](../agent-runs/bandhan-forgot-password/defects.md). |
| FR-FPWD-004.1-.2 | RIB_FPWD_003 | A nonempty three-digit PIN on Continue displays the exact specified length message. | Forgot Password FSD §§2-3 | Verified; UAT pass; FR-FPWD-004.1 remains partial |
| FR-FPWD-005.1-.2 | RIB_FPWD_004 | No expired expiry option is selectable. | Forgot Password FSD §§2-3 | Verified; UAT pass |

## Uncovered or deferred requirements

| Requirement | Disposition | Reason |
|---|---|---|
| FR-FPWD-001.1-.4 | Uncovered as independent outcomes | Entry, stages, form controls, and Know your Customer ID navigation are setup or outside the four selected intents. |
| FR-FPWD-004.1 | Partly covered | The selected case rejects a short PIN; four-digit acceptance is not in the selected intent. |
| Successful debit-card verification and password reset | Deferred by FSD | Valid debit-card information and complete flow are unavailable; outside selected coverage. |
| Credit Card verification | Outside scope | The FSD selects Debit Card verification only. |

## Data readiness and execution

- RIB_FPWD_001: exact messages come from the FSD and are in the en-in labels; no input values required.
- RIB_FPWD_002: 15/16-digit values and typed cap passed; the user-approved encrypted 18-digit FUID sample was pasted without submission, but the field cleared. See the failure record.
- RIB_FPWD_003: user-approved encrypted UAT inputs reused; short-PIN validation confirmed client-side.
- RIB_FPWD_004: no static values required; use the current date and choices shown at runtime.
- Selected cases: 4; expected examples: 4; one Chromium project.
- Exact listing command after implementation: `npm run test:list -- --grep "RIB_FPWD_00[1-4] -"`.
- Exact amended execution command: `npm test -- --grep 'RIB_FPWD_002 -' --retries=0`; 1 failed in UAT with one worker. The pre-amendment four-case run passed before the added paste assertion.
- Regression listing: `npm run test:list -- --grep 'RIB_FPWD_00[134] -'`; 3 tests in one Chromium project.
- Regression execution: `npm test -- --grep 'RIB_FPWD_00[134] -' --retries=0`; all 3 passed in UAT with one worker after the amendment.
