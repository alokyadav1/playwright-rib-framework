# Bandhan Bank Know Your Customer ID requirements

- **Source:** `docs/fsd/Bandhan_Bank_Know_Customer_ID_FSD.md`, version 1.1, 12 November 2026
- **Source status:** Draft for functional review
- **FSD source context:** TEST_ENV=uat, BANK=bandhan, LOCALE=en-in
- **Scope:** The five case intents in §4 only. Entry/form details are recorded but are not selected as independent case outcomes. No compliance coverage is claimed.

| ID | Source | Atomic behavior | Type | Testability and disposition |
|---|---|---|---|---|
| FR-KCID-001.1 | §1 | Selecting Customer ID and then Know your Customer ID opens the Know your Customer ID page with the specified heading. | Functional | Testable; outside the five selected case outcomes. |
| FR-KCID-001.2 | §1 | The form displays the mobile country-code selector, mobile input, Date of Birth/PAN options, date input with DD/MM/YYYY placeholder, and Continue. | UI | Testable; used as setup for selected cases, but control coverage is outside selected scope. |
| FR-KCID-002.1 | §2 | An empty mobile number produces the specified required-field message when Continue is selected. | Validation | Testable; selected by RIB_KCID_001. |
| FR-KCID-002.2 | §2 | An empty date of birth produces the specified required-field message when Continue is selected. | Validation | Testable; selected by RIB_KCID_001. |
| FR-KCID-002.3 | §2 | Applicable required-field messages appear together directly below their corresponding inputs after Continue is selected. | UI | Testable; selected by RIB_KCID_001. Other blur/live-validation behavior is unspecified and out of scope. |
| FR-KCID-003.1 | §2 | The mobile input accepts nonnumeric characters. | Validation | Testable; selected by RIB_KCID_002 using nonnumeric boundary samples. |
| FR-KCID-003.2 | §2 | The mobile input accepts up to 17 characters. | Validation | Testable; selected by RIB_KCID_002 at lengths 16 and 17. |
| FR-KCID-003.3 | §2 | An attempted character beyond the 17-character maximum is blocked. | Validation | Testable; selected by RIB_KCID_002 at length 18. |
| FR-KCID-004.1 | §2 | Invalid mobile/DOB details or details that do not match display the specified Error modal. | Validation | Partly covered; RIB_KCID_003 covers a validly formatted nonmatching mobile/DOB combination. Invalid-format input is not a selected case partition. |
| FR-KCID-005.1 | §3 | Matching registered mobile number and date of birth advance to the OTP page. | Functional | Testable; selected by RIB_KCID_004 and RIB_KCID_005. Requires owner-approved matching UAT details. |
| FR-KCID-005.2 | §3 | OTP is entered manually in the selected POC flow. | Functional | Testable; selected by RIB_KCID_005. RIB_KCID_004 uses the user-approved generated incorrect-OTP Login pattern. OTP format is otherwise not specified. |
| FR-KCID-006.1 | §3 | Incorrect OTP displays the specified Error modal with an error icon, title, exact message, and Okay button. | Validation | Testable; selected by RIB_KCID_004. A usable incorrect manual OTP is not specified. |
| FR-KCID-007.1 | §3 | Valid OTP displays the specified success modal, green success icon, heading, supporting text, and Continue to Login control. | Functional / UI | Testable; selected by RIB_KCID_005. Actual SMS/email delivery is explicitly outside this UI confirmation. |

## Gaps and exclusions

- FR-KCID-004.1's invalid-format input partition is not covered by the selected nonmatching-details case.
- FR-KCID-001.1 and FR-KCID-001.2 are setup/navigation behavior and form controls, not selected outcomes.
- The success confirmation does not establish actual SMS/email delivery; separate delivery evidence is outside this POC.
- The FSD does not state an OTP length or the method/value for a deliberately incorrect OTP. Do not infer either for the case design.