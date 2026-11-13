# Bandhan Bank Login requirements

- **Source:** `docs/fsd/Bandhan_Bank_Login_FSD.md`, version 1.7, 12 November 2026
- **Scope:** Only the five intents in §6 are selected for this POC. Other requirements remain outside this case set.
- **Applicability:** UAT, BANK=bandhan, LOCALE=en-in; no compliance coverage claimed.

| ID | Source | Atomic behavior | Type | Testability and disposition |
|---|---|---|---|---|
| FR-LOG-001 | §2 | Login page presents the User ID login controls and supports the User ID method. | UI | Testable; outside selected POC |
| FR-LOG-002.1 | §2 | User ID accepts letters, digits, or their combination. | Validation | Testable; outside selected POC |
| FR-LOG-002.2 | §2 | User ID rejects whitespace, punctuation, and special characters. | Validation | Testable; outside selected POC |
| FR-LOG-002.3 | §2, §4 | Authentication treats User ID as case sensitive. | Business rule | Testable; outside selected POC |
| FR-LOG-003 | §2, §4 | User ID length 5 through 50 is valid; lengths outside that range are invalid. | Validation | Testable; selected by RIB_LOG_006 |
| FR-LOG-004.1 | §2 | Empty credentials or invalid User ID prevent successful login. | Validation | Testable; outside selected POC |
| FR-LOG-004.2 | §2 | With validly formatted User ID and accepted terms, an empty password on Proceed shows the invalid credentials modal. | Validation | Testable; outside selected POC |
| FR-LOG-004.3 | §2 | Login applies no password length, composition, or complexity validation. | Validation | Testable; outside selected POC |
| FR-LOG-005.1 | §3 | Unaccepted terms show an Error modal with the specified icon, title, exact message, and Okay button. | UI | Testable; selected by RIB_LOG_002 |
| FR-LOG-005.2 | §3 | The terms error takes precedence when terms are unchecked and credentials are invalid. | Business rule | Testable; selected by RIB_LOG_002 |
| FR-LOG-005.3 | §3 | Okay dismisses the terms modal and retains inputs; outside click and Escape do not dismiss it. | UI | Testable; outside selected POC |
| FR-LOG-006 | §3 | Valid credentials and accepted terms open OTP verification; valid OTP redirects to Home Dashboard. | Functional | Testable; selected by RIB_LOG_001 |
| FR-LOG-007 | §4 | Forgot User ID opens the Forgot User ID page. | Functional | Testable; outside selected POC |
| FR-LOG-008 | §4 | Forgot Password opens the Forgot Password page. | Functional | Testable; outside selected POC |
| FR-LOG-009 | §4 | The password keyboard icon opens the virtual keyboard. | Functional | Testable; outside selected POC |
| FR-LOG-010.1 | §3 | Incorrect credentials with accepted terms show the specified invalid credentials modal. | Functional | Testable; selected by RIB_LOG_003 |
| FR-LOG-010.2 | §3 | Try Again dismisses the invalid credentials modal and retains submitted values. | UI | Testable; outside selected POC |
| FR-LOG-010.3 | §3 | Outside click and Escape do not dismiss the invalid credentials modal. | UI | Testable; outside selected POC |
| FR-LOG-011 | §2 | User ID blur feedback follows the stated interaction history and exact messages. | Validation | Testable; selected by RIB_LOG_006 |
| FR-LOG-012 | §2 | Proceed remains enabled regardless of input validity or terms acceptance. | UI | Testable; selected by RIB_LOG_002 |
| FR-LOG-013 | §5 | OTP page shows the specified Login heading, instruction, OTP field, and Submit control. | UI | Testable; selected by RIB_LOG_001 |
| OBS-LOG-001 | §5 | Incorrect OTP submission is reported to return HTTP 417 with no visible UI feedback. | Observation | Partly testable; selected by RIB_LOG_007, pending authorized invalid-OTP input and request identification |

## Selected-scope coverage

| Requirement | Selected case | Outcome |
|---|---|---|
| FR-LOG-003 | RIB_LOG_006 | Lengths 4 and 51 show the specified invalid-format feedback; lengths 5 and 50 pass format validation. |
| FR-LOG-005.1 | RIB_LOG_002 | Unchecked terms show the specified Error modal. |
| FR-LOG-005.2 | RIB_LOG_002 | Terms error remains the outcome when credentials are empty/invalid. |
| FR-LOG-006 | RIB_LOG_001 | Valid credentials and manual OTP reach Home Dashboard. |
| FR-LOG-010.1 | RIB_LOG_003 | Nonempty incorrect password shows the invalid credentials modal. |
| FR-LOG-011 | RIB_LOG_006 | Boundary lengths follow the specified blur behavior. |
| FR-LOG-012 | RIB_LOG_002 | Proceed is enabled before submission. |
| FR-LOG-013 | RIB_LOG_001 | OTP verification screen shows its specified controls and instruction. |
| OBS-LOG-001 | RIB_LOG_007 | Characterize the reported response and missing UI feedback; this is not a desired-behavior requirement. |

All other rows are outside the explicitly selected five-case POC. They are not added as cases.
