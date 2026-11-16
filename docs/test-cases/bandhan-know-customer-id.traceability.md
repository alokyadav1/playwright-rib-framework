# Bandhan Bank Know Your Customer ID traceability

- **Source:** `docs/fsd/Bandhan_Bank_Know_Customer_ID_FSD.md`, version 1.1, 12 November 2026
- **Selected scope:** Five case intents in §4; designs approved by the user on 16 November 2026. Implementation is in progress; no case is verified.

| Requirement | Case | Expected outcome | Evidence source | State |
|---|---|---|---|---|
| FR-KCID-002.1, FR-KCID-002.2, FR-KCID-002.3 | RIB_KCID_001 | Continue with both required fields empty displays both exact messages together below their corresponding inputs. | Know Customer ID FSD §2 | Verified; UAT pass |
| FR-KCID-003.1, FR-KCID-003.2, FR-KCID-003.3 | RIB_KCID_002 | Nonnumeric mobile input is accepted at lengths 16 and 17; an attempted 18th character is blocked. | Know Customer ID FSD §2 | Verified; UAT pass |
| FR-KCID-004.1 | RIB_KCID_003 | Validly formatted synthetic nonmatching mobile/DOB details display the specified Error modal. | Know Customer ID FSD §2 | Verified; UAT pass; invalid-format partition remains outside scope |
| FR-KCID-005.1, FR-KCID-006.1 | RIB_KCID_004 | Matching details open OTP verification; generated incorrect OTP displays the specified Error modal. | Know Customer ID FSD §3; user-approved Login OTP handling | Failed once on locator, repaired and passed; one later batch run failed on UAT navigation timeout and standalone rerun passed |
| FR-KCID-005.1, FR-KCID-005.2, FR-KCID-007.1 | RIB_KCID_005 | Matching details open OTP verification; manual valid OTP displays the specified retrieval success confirmation. | Know Customer ID FSD §3; user-confirmed registered profile paths | Blocked; requires headed manual OTP entry |

## Uncovered or partially covered requirements

| Requirement | Disposition | Reason |
|---|---|---|
| FR-KCID-001.1 | Uncovered by selected cases | Entry navigation and destination heading are not among the five selected intents. |
| FR-KCID-001.2 | Uncovered as an assertion | Form controls are prerequisites for selected cases; independent control coverage was not selected. |
| FR-KCID-004.1 | Partly covered | The selected case covers validly formatted nonmatching details; invalid-format mobile/DOB input is not selected. |

Actual SMS/email delivery is not asserted and requires separate evidence per the FSD; it is outside selected POC coverage.

## Case design readiness

- Case IDs: RIB_KCID_001, RIB_KCID_002, RIB_KCID_003, RIB_KCID_004, RIB_KCID_005.
- Approved cases: 5; expected examples: 5.
- No data-design questions remain. RIB_KCID_005 requires manual OTP entry at runtime.
- Runtime: one Chromium project, TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; expected 5 tests, 5 examples.
- Exact listing command: `npm run test:list -- --grep "RIB_KCID_00[1-5] -"`.
- Executed: RIB_KCID_001-003 passed in one run; RIB_KCID_004 passed after the locator repair and again in a standalone rerun, with one recorded UAT navigation-timeout failure in a later batch; RIB_KCID_005 not run because valid OTP entry is manual.