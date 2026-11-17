# Bandhan Bank Forgot User ID requirements

- **Source:** `docs/fsd/Bandhan_Bank_Forgot_User_ID_FSD.md`, version 1.2, 17 November 2026
- **Source status:** Draft for functional review
- **FSD source context:** TEST_ENV=uat, BANK=bandhan, LOCALE=en-in
- **Scope:** The five FSD case intents in §3 plus the user-requested expiry-option case dated 17 November 2026. No successful recovery, recovered User ID delivery, or compliance coverage is included.

| ID | Source | Atomic behavior | Type | Testability and disposition |
|---|---|---|---|---|
| FR-FUID-001.1 | §1 | Selecting Forgot User ID opens the page with heading Forgot User ID. | Functional | Testable; entry is setup for the selected cases, not a separate selected outcome. |
| FR-FUID-001.2 | §1 | The recovery flow offers Debit Card and Credit Card choices; this POC uses Debit Card only. | UI | Testable; Debit Card is setup for selected cases. Credit Card is outside selected scope. |
| FR-FUID-001.3 | §1 | The Debit Card form contains Customer ID, card number, expiry month/year, ATM PIN, and Continue. | UI | Testable; controls are setup for selected cases. |
| FR-FUID-001.4 | §1 | A Know your Customer ID link is shown below Customer ID. | UI | Testable; outside the four selected intents and owned by the separate KCID flow. |
| FR-FUID-002.1 | §2 | Empty Customer ID shows exactly “Please provide your Customer Id to proceed” on Continue. | Validation | Testable; selected by RIB_FUID_001. |
| FR-FUID-002.2 | §2 | Empty card number shows exactly “Please provide your card number to proceed” on Continue. | Validation | Testable; selected by RIB_FUID_001. |
| FR-FUID-002.3 | §2 | No expiry month selected shows exactly “Please provide your card expiry month to proceed” on Continue. | Validation | Testable; selected by RIB_FUID_001. |
| FR-FUID-002.4 | §2 | Empty ATM PIN shows exactly “Please provide your ATM pin to proceed” on Continue. | Validation | Testable; selected by RIB_FUID_001. |
| FR-FUID-002.5 | §2 | Applicable required messages appear together directly below their corresponding fields after Continue. | UI | Testable; selected by RIB_FUID_001. No other blur/live validation is established. |
| FR-FUID-002.6 | §2 | The current year is preselected in the year dropdown; no missing-year message is required. | UI / business rule | Testable; outside the four selected case outcomes. |
| FR-FUID-003.1 | §2 | Card number accepts at most 16 digits; additional input is blocked for both typing and pasting. | Validation | Testable; selected by RIB_FUID_002. Requires approved test-only digit samples. |
| FR-FUID-004.1 | §2 | A valid ATM PIN has exactly four digits. | Validation | Partly covered by RIB_FUID_003, which verifies a three-digit PIN is rejected but does not assert four-digit acceptance. |
| FR-FUID-004.2 | §2 | On Continue, a nonempty PIN below four digits shows exactly “ATM pin should have 4 digits. Please enter a valid ATM pin.” | Validation | Testable; selected by RIB_FUID_003. Other required fields must be populated to isolate this outcome. |
| FR-FUID-005.1 | §2 | Expiry month/year dropdowns provide future date options. | Functional | Testable; selected by RIB_FUID_006 with the exact user-supplied range rules below. |
| FR-FUID-005.2 | §2 | An expired expiry date cannot be selected. | Validation | Testable; selected by RIB_FUID_004 using date-relative options observed at runtime. |
| USER-FUID-EXP-001.1 | User instruction, 17 November 2026 | The expiry-year dropdown shows every year from the current year through current year plus 10, inclusive. | Functional / boundary | Testable; selected by RIB_FUID_006. This produces 11 year options, for example 2026 through 2036 inclusive. |
| USER-FUID-EXP-001.2 | User instruction, 17 November 2026 | When the current year is selected, the month dropdown shows only the current month and later months in that year. | Functional / validation | Testable; selected by RIB_FUID_006 using the runtime date. |
| USER-FUID-EXP-001.3 | User instruction, 17 November 2026 | When a future year is selected, the month dropdown shows all 12 months. | Functional | Testable; selected by RIB_FUID_006 using the earliest available future year. |
| FR-FUID-006.1 | §2 | A valid Customer ID and otherwise valid debit-card details for a card not associated with that Customer ID are accepted through initial submission and open OTP verification. | Functional / validation | Testable; selected by RIB_FUID_005. Requires an owner-provisioned mismatched Customer ID/card profile. |
| FR-FUID-006.2 | §2 | After the correct OTP is submitted for the mismatched-card flow, an Error modal opens. | Functional / validation | Testable; selected by RIB_FUID_005. Requires access to the registered OTP channel. |
| FR-FUID-006.3 | §2 | The mismatched-card Error modal shows an error icon, title “Error”, exact message “Debit card detail is incorrect. Please enter correct details.”, and an “Okay” button. | UI | Testable; selected by RIB_FUID_005 from the supplied screenshot. |

## Gaps and exclusions

- Successful User ID recovery and delivery of the recovered User ID remain deferred because the complete successful flow and associated valid debit-card details are unavailable.
- RIB_FUID_005 requires an approved encrypted profile containing a valid Customer ID and a valid debit card associated with a different customer, plus authorized access to the OTP delivered for the active challenge.
- FR-FUID-003.1 requires explicitly approved synthetic digit-only samples; none currently exist in the UAT data inventory.
- RIB_FUID_003 needs an approved test-data/setup path for Customer ID, card number, non-expired expiry, and a nonempty three-digit PIN. The FSD does not establish whether those inputs remain client-side or could reach backend authentication.
- The empty-required-fields case does not assert a missing-year message because the current year is preselected.
