# Bandhan Bank Login traceability

- **Source:** `docs/fsd/Bandhan_Bank_Login_FSD.md`, version 1.9, 13 November 2026
- **Selected scope:** Five intents in §6 only; user approved all five case designs.

| Requirement / observation | Case | Expected outcome | Evidence source | State |
|---|---|---|---|---|
| FR-LOG-003 | RIB_LOG_006 | Lengths 4 and 51 show the specified invalid-format message; lengths 5 and 50 pass format validation. | Login FSD §§2, 4 | Verified; 4 UAT examples passed |
| FR-LOG-005.1 | RIB_LOG_002 | Unchecked terms show the specified Error modal. | Login FSD §3 | Verified; 1 UAT pass |
| FR-LOG-005.2 | RIB_LOG_002 | Terms error takes precedence when credentials are empty/invalid. | Login FSD §3 | Verified; 1 UAT pass |
| FR-LOG-006 | RIB_LOG_001 | Valid credentials and manual valid OTP redirect to Home Dashboard. | Login FSD §3 | Failed before OTP; user reports the registered password was incorrect |
| FR-LOG-010.1 | RIB_LOG_003 | Nonempty incorrect password shows the specified invalid credentials modal. | Login FSD §3 | User confirms pass after unlock; prior automated run displayed a temporary account-lock alert |
| FR-LOG-011 | RIB_LOG_006 | Boundary values follow the specified blur validation behavior. | Login FSD §2 | Verified; 4 UAT examples passed |
| FR-LOG-012 | RIB_LOG_002 | Proceed remains enabled with empty credentials and unchecked terms, including after submission. | Login FSD §2 | Verified; 1 UAT pass |
| FR-LOG-013 | RIB_LOG_001 | OTP page displays its specified heading, instruction, field, and Submit control. | Login FSD §5 | Failed before OTP; user reports the registered password was incorrect |
| FR-LOG-014 | RIB_LOG_001 | A valid six-digit OTP is entered; maximum-length enforcement is not directly asserted. | Login FSD §5 | Blocked; OTP entry was not reached, and maximum-length enforcement is outside the selected intent |
| OBS-LOG-001 | RIB_LOG_007 | Verify incorrect OTP Error modal; API response is not asserted. | Login FSD §5, user-supplied UAT screenshot | Failed three times before reaching OTP page; 60-second state-based wait did not resolve transition |

## Explicitly outside selected POC

The following requirements are not covered by the five selected intents. No cases are added for them:

- FR-LOG-001; FR-LOG-002.1 through FR-LOG-002.3; FR-LOG-004.1 through FR-LOG-004.3.
- FR-LOG-005.3; FR-LOG-007; FR-LOG-008; FR-LOG-009.
- FR-LOG-010.2 and FR-LOG-010.3.

## Expected execution selection after approval

- Case IDs: RIB_LOG_001, RIB_LOG_002, RIB_LOG_003, RIB_LOG_006, RIB_LOG_007.
- Expected cases: 5. Expected examples: 8, including four boundary examples in RIB_LOG_006.
- List: `npm run test:list -- --grep "RIB_LOG_(001|002|003|006|007) -"`
- Run: `npm test -- --grep "RIB_LOG_(001|002|003|006|007) -"`
- No case is implemented or verified by this design.
