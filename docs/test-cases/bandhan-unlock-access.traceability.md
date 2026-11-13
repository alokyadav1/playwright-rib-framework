# Bandhan Bank Unlock Access traceability

- **Source:** `docs/fsd/Bandhan_Bank_Unlock_Access_FSD.md`, version 1.1, 12 November 2026
- **Selected scope:** The four intents in §4 only; case designs were approved by the user.

| Requirement / observation | Case | Expected outcome | Evidence source | State |
|---|---|---|---|---|
| FR-UNL-002.1, FR-UNL-002.2 | RIB_UNL_001 | Continue shows exact invalid-PAN feedback directly below the PAN field. | Unlock Access FSD §2 | User reports a successful manual rerun after correcting the PAN fixture; the assistant did not rerun. The earlier three failures predate that correction; see `docs/agent-runs/bandhan-unlock-access/failures/RIB_UNL_001.md`. |
| OBS-UNL-001.1, FR-UNL-003.1 | RIB_UNL_002 | Incorrect personal detail(s) with valid Customer ID/PAN advance to OTP. | Unlock Access FSD §§2–3 | Earlier run failed at the OTP checkpoint because the textbox had no accessible name; an ID-based locator is now implemented but not scenario-rerun. An Error alert was also present. See `docs/agent-runs/bandhan-unlock-access/failures/RIB_UNL_002.md`. |
| OBS-UNL-001.2, FR-UNL-003.2 | RIB_UNL_002 | Valid OTP is followed by the specified Error modal; this is not reported as successful unlock. | Unlock Access FSD §§2–3 | Unverified: the earlier run did not enter OTP, and the new wait-and-submit behavior was not scenario-run. The modal verification also lacks a verified error-icon assertion. |
| OBS-UNL-002.1 | RIB_UNL_003 | Incorrect OTP response contains the specified HTTP status and nested error details. | Unlock Access FSD §3 | Blocked: no verified UI oracle or API details for the response assertion. |
| OBS-UNL-002.2 | RIB_UNL_003 | Record UI feedback as observed; do not require silence. | Unlock Access FSD §3 | Blocked with RIB_UNL_003; no scenario was added. |
| FR-UNL-003.1, FR-UNL-003.2, FR-UNL-004.1 | RIB_UNL_004 | Already-unlocked profile follows the detail/OTP path and resulting state is checked. | Unlock Access FSD §§3–4 | The shared wait-and-submit behavior is implemented; not scenario-run by request. |
| FR-UNL-004.2 | RIB_UNL_004 | Valid verification shows the specified already-unlocked information modal. | Unlock Access FSD §3 | Partially automated and not scenario-run by request. Message and button are asserted; the information and close icons are not. |

## Requirements outside the four selected cases

- FR-UNL-001.1 through FR-UNL-001.3 are setup behavior or controls; no standalone cases are added.
- FR-UNL-005 successful unlock of a locked user is explicitly deferred; it is not included or inferred from the already-unlocked case.
- No other FSD behavior is added to this case set.

## Execution selection and results

- Approved case IDs: RIB_UNL_001, RIB_UNL_002, RIB_UNL_003, RIB_UNL_004.
- Implemented cases: RIB_UNL_001, RIB_UNL_002, RIB_UNL_004. RIB_UNL_003 remains blocked and is not in the feature.
- Native listing: `npm run test:list -- --grep "RIB_UNL_(001|002|004) -"`; expected and observed collection: 3 cases, 3 examples, 1 project.
- Executed RIB_UNL_001 three times; each run failed because the exact message was absent from the verified PAN inline region.
- Executed: `npm test -- --grep "RIB_UNL_002 -" --headed --retries=0`; failed at the OTP-field locator after the OTP screen appeared. No OTP was entered.
- RIB_UNL_004 remains unverified; it was not run. RIB_UNL_003 remains blocked pending API evidence details.
