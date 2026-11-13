# Bandhan Bank Unlock Access requirements

- **Source:** `docs/fsd/Bandhan_Bank_Unlock_Access_FSD.md`, version 1.1, 12 November 2026
- **Scope:** Only the four intents in §4 are designed as cases. Other requirements are recorded for traceability but receive no case.
- **FSD source context:** TEST_ENV=uat, BANK=demo, LOCALE=en-in. The user approved BANK=bandhan for the runtime; no compliance coverage claimed.

| ID | Source | Atomic behavior | Type | Testability and disposition |
|---|---|---|---|---|
| FR-UNL-001.1 | §1 | Selecting the prelogin lockout link opens Unlock Online Banking access. | Functional | Testable; outside the four selected intents. |
| FR-UNL-001.2 | §1 | The page offers Personal details, Debit card, and Credit card verification choices; selected POC uses Personal details only. | UI | Testable; only Personal details is used as setup for selected cases; choice coverage is outside scope. |
| FR-UNL-001.3 | §1 | The Personal details form contains Customer ID, Date of birth, PAN, Mother's maiden name, and Continue, with required markers. | UI | Testable; form entry is setup for selected cases; form-control coverage is outside scope. |
| FR-UNL-002.1 | §2 | Submitting an invalid PAN with Continue displays exactly “Please provide a valid PAN to proceed.” | Validation | Testable; selected by RIB_UNL_001; sample values and provisioned profile are needed. |
| FR-UNL-002.2 | §2 | PAN validation feedback appears inline directly below the PAN field after Continue is selected. | UI | Testable; selected by RIB_UNL_001; sample values and provisioned profile are needed. |
| OBS-UNL-001.1 | §2 | Incorrect personal information with valid Customer ID and PAN is not rejected before OTP verification. | UI observation | Partly testable; selected by RIB_UNL_002; approved test profile and the incorrect detail(s) need owner confirmation. |
| OBS-UNL-001.2 | §2 | After valid OTP verification for the incorrect-personal-information path, an Error modal displays the specified icon, title, message, and Okay button. | UI observation | Testable; selected by RIB_UNL_002; approved test profile and manual OTP access are needed. |
| FR-UNL-003.1 | §3 | Details that advance to verification open the OTP flow, where OTP entry is manual during the POC. | Functional | Testable; selected by RIB_UNL_002, RIB_UNL_003, and RIB_UNL_004; authorized UAT profiles and OTP access are needed. |
| FR-UNL-003.2 | §3 | Valid OTP alone does not prove unlock success; the resulting modal or account state must be checked. | Business rule | Testable; selected by RIB_UNL_002 and RIB_UNL_004. |
| OBS-UNL-002.1 | §3 | Incorrect OTP submission to `unLockUserId` returns HTTP 417 with `result: SUCCESSFUL` and nested `title: Invalid OTP`, `detail: Invalid OTP`, `code: DIGX_TFA_0004`, `type: ERROR`. | Integration observation | Partly testable; selected by RIB_UNL_003; approved browser-network evidence and UAT configuration are needed. The outer result is not proof of unlock. |
| OBS-UNL-002.2 | §3 | No UI feedback for incorrect OTP is reported as current behavior; this is a characterization, not a requirement that errors remain silent. | UI observation | Partly testable; selected by RIB_UNL_003; observe and record feedback without asserting that silence is required. |
| FR-UNL-004.1 | §3 | An already-unlocked user follows the same detail-entry and OTP process; no earlier unlocked check is reported. | Functional observation | Testable; selected by RIB_UNL_004; an owner-provisioned already-unlocked profile and manual OTP access are needed. |
| FR-UNL-004.2 | §3 | After valid verification, an already-unlocked user sees the specified information modal with message, icon, Continue to Login, and close control. | UI | Testable; selected by RIB_UNL_004; an owner-provisioned already-unlocked profile and manual OTP access are needed. |
| FR-UNL-005 | §3 | A locked user's successful unlock confirmation is documented for later, not current POC coverage. | Functional | Testable in principle; explicitly deferred and excluded from this case set. |

## Selected-scope coverage

| Requirement | Case | Outcome |
|---|---|---|
| FR-UNL-002.1, FR-UNL-002.2 | RIB_UNL_001 | Exact invalid-PAN inline feedback after Continue. |
| OBS-UNL-001.1, OBS-UNL-001.2, FR-UNL-003.1, FR-UNL-003.2 | RIB_UNL_002 | Incorrect personal details reach OTP; valid OTP leads to the specified Error modal, not a successful-unlock claim. |
| OBS-UNL-002.1, OBS-UNL-002.2, FR-UNL-003.1 | RIB_UNL_003 | Characterize the reported incorrect-OTP response and observe UI feedback without requiring silence. |
| FR-UNL-003.1, FR-UNL-003.2, FR-UNL-004.1, FR-UNL-004.2 | RIB_UNL_004 | Already-unlocked profile follows detail/OTP flow and displays the specified information modal. |

FR-UNL-001.1 through FR-UNL-001.3 are setup behavior or controls, not additional selected cases. FR-UNL-005 remains deferred. No other case is added.
