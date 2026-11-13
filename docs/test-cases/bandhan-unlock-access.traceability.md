# Bandhan Bank Unlock Access traceability

Continuation update, 13 November 2026: the pending workspace change reuses the existing invalid-OTP Error modal check for RIB_UNL_003; resumed at the user's request. This supersedes the earlier resource-not-found amendment below. No UAT scenario was run during continuation.

- **Source:** `docs/fsd/Bandhan_Bank_Unlock_Access_FSD.md`, version 1.1, 12 November 2026
- **Selected scope:** The four case IDs from §4; RIB_UNL_003 has the user-approved amendment described below.
- **Amendment:** On 13 November 2026, the user approved removing icon outcomes from RIB_UNL_002 and RIB_UNL_004 and replacing RIB_UNL_003's API/UI characterization with a generated-OTP resource-not-found modal text check. FSD v1.1 remains unchanged.

| Requirement / observation | Case | Expected outcome | Evidence source | State |
|---|---|---|---|---|
| FR-UNL-002.1, FR-UNL-002.2 | RIB_UNL_001 | Continue shows exact invalid-PAN feedback directly below the PAN field. | Unlock Access FSD §2 | User reports the scenario passed after correcting the PAN fixture; the assistant did not rerun it. The earlier three failures predate that correction; see `docs/agent-runs/bandhan-unlock-access/failures/RIB_UNL_001.md`. |
| OBS-UNL-001.1, FR-UNL-003.1 | RIB_UNL_002 | Incorrect personal detail(s) with valid Customer ID/PAN advance to OTP. | Unlock Access FSD §§2–3 | User reports the scenario passed; no run artifact or command was supplied. The earlier locator failure and concurrent Error alert are recorded in `docs/agent-runs/bandhan-unlock-access/failures/RIB_UNL_002.md`. |
| OBS-UNL-001.2, FR-UNL-003.2 | RIB_UNL_002 | Valid OTP is followed by the specified Error modal; this is not reported as successful unlock. | Unlock Access FSD §§2–3 | User reports the scenario passed; the assistant did not rerun it. The error-icon outcome was excluded by user-approved amendment. |
| OBS-UNL-002.1 | RIB_UNL_003 | Incorrect OTP response contains the specified HTTP status and nested error details. | Unlock Access FSD §3 | Not covered by amended RIB_UNL_003; original FSD observation remains unverified. The earlier attempt failed before profile entry; see `docs/agent-runs/bandhan-unlock-access/failures/RIB_UNL_003.md`. |
| OBS-UNL-002.2 | RIB_UNL_003 | Record UI feedback as observed; do not require silence. | Unlock Access FSD §3 | Not covered by amended RIB_UNL_003; original FSD observation remains unverified. |
| FR-UNL-003.1, USER-AMEND-UNL-003 | RIB_UNL_003 | Reach OTP, submit a generated six-digit OTP, then verify the Error title, Invalid OTP message, Okay button, and error icon. | Pending workspace change continued at the user's request, 13 November 2026 | Reuses the login-owned binding and `LoginVerifications.showsInvalidOtpModal()`; not scenario-run. Original OBS-UNL-002 API/UI characterization remains outside this amended case. |
| FR-UNL-003.1, FR-UNL-003.2, FR-UNL-004.1 | RIB_UNL_004 | Already-unlocked profile follows the detail/OTP path and resulting state is checked. | Unlock Access FSD §§3–4 | User reports the scenario passed; no run artifact or command was supplied. The assistant did not rerun it. |
| FR-UNL-004.2 | RIB_UNL_004 | Valid verification shows the specified already-unlocked information modal. | Unlock Access FSD §3 | User reports the scenario passed; the assistant did not rerun it. Message and button are asserted; information and close icons were excluded by user-approved amendment. |

## Requirements outside the four selected cases

- FR-UNL-001.1 through FR-UNL-001.3 are setup behavior or controls; no standalone cases are added.
- FR-UNL-005 successful unlock of a locked user is explicitly deferred; it is not included or inferred from the already-unlocked case.
- OBS-UNL-002.1 and OBS-UNL-002.2 remain unverified and are no longer covered by the amended RIB_UNL_003 case.
- No other FSD behavior is added to this case set.

## Execution selection and results

- Approved case IDs: RIB_UNL_001, RIB_UNL_002, RIB_UNL_003, RIB_UNL_004.
- Implemented cases: RIB_UNL_001, RIB_UNL_002, RIB_UNL_003, RIB_UNL_004. User reports RIB_UNL_001, RIB_UNL_002, and RIB_UNL_004 passed; RIB_UNL_003 is unverified.
- Native listing: `npm run test:list -- --grep "RIB_UNL_(001|002|003|004) -"`; expected and observed collection: 4 cases, 4 examples, 1 project.
- Executed RIB_UNL_001 three times; each run failed because the exact message was absent from the verified PAN inline region.
- Executed: `npm test -- --grep "RIB_UNL_002 -" --headed --retries=0`; failed at the OTP-field locator after the OTP screen appeared. No OTP was entered.
- RIB_UNL_004's result is user-reported; the assistant did not rerun it.
- The prior RIB_UNL_003 implementation's single authorized run failed before profile entry; no details or OTP were submitted. It predates the user-approved case amendment. The error context is `test-results/tests-features-unlock-acce-0a43e-TP-response-and-UI-feedback-chromium/error-context.md`.
- The amended RIB_UNL_003 scenario has not been run, per the user's instruction to run scenarios manually.
