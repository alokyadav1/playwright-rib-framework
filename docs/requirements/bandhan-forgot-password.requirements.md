# Bandhan Bank Forgot Password requirements

- **Source:** `docs/fsd/Bandhan_Bank_Forgot_Password_FSD.md`, version 1.1, 12 November 2026
- **Source status:** Draft for functional review
- **FSD source context:** TEST_ENV=uat, BANK=bandhan, LOCALE=en-in
- **Scope:** Only the four case intents in §3. Credit Card verification and the reset-password stage are outside selected coverage.

| ID | Source | Atomic behavior | Type | Testability and disposition |
|---|---|---|---|---|
| FR-FPWD-001.1 | §1 | Selecting Forgot Password on prelogin opens the Forgot Password page (`?page=user-information`). | Functional | Testable; entry/setup only, not a separate selected outcome. |
| FR-FPWD-001.2 | §1 | The page shows the Verify your details and Reset password stages. | UI | Testable; outside the four selected outcomes. |
| FR-FPWD-001.3 | §1 | The Debit Card verification form contains Customer ID, Card Number, Expiry month/year, ATM PIN, and Continue. | UI | Testable; Debit Card form is setup for the selected cases; independent control coverage is outside scope. |
| FR-FPWD-001.4 | §1 | Know your Customer ID navigation leads to its separately owned flow. | Functional | Testable; outside the four selected outcomes. |
| FR-FPWD-002.1 | §2 | Empty Customer ID displays exactly “Please provide your Customer Id to proceed” after Continue. | Validation | Testable; selected by RIB_FPWD_001. |
| FR-FPWD-002.2 | §2 | Empty card number displays exactly “Please provide your card number to proceed” after Continue. | Validation | Testable; selected by RIB_FPWD_001. |
| FR-FPWD-002.3 | §2 | Empty ATM PIN displays exactly “Please provide your ATM pin to proceed” after Continue. | Validation | Testable; selected by RIB_FPWD_001. |
| FR-FPWD-002.4 | §2 | Applicable required messages appear together directly below their corresponding fields after Continue. | UI | Testable; selected by RIB_FPWD_001. |
| OBS-FPWD-001 | §2 | The current form behavior reports no expiry validation feedback. | UI observation | Testable; selected by RIB_FPWD_001. No other expiry feedback or validation timing is specified. |
| FR-FPWD-003.1 | §2 | Card number input is capped at 16 digits; input beyond 16 digits is blocked. | Validation | Testable; selected by RIB_FPWD_002 using user-approved encrypted test samples. |
| FR-FPWD-004.1 | §2 | ATM PIN must contain exactly four digits. | Validation | Partly covered by RIB_FPWD_003, which checks a nonempty value below four digits; four-digit acceptance is not selected. |
| FR-FPWD-004.2 | §2 | A nonempty ATM PIN below four digits displays exactly “ATM pin should have 4 digits. Please enter a valid ATM pin.” after Continue. | Validation | Testable; selected by RIB_FPWD_003 with user-approved encrypted UAT inputs and client-side validation confirmation. |
| FR-FPWD-005.1 | §2 | Only future expiry options are provided. | Functional | Testable; selected by RIB_FPWD_004 as the absence of selectable expired options. |
| FR-FPWD-005.2 | §2 | Expired expiry dates cannot be selected. | Validation | Testable; selected by RIB_FPWD_004 using date-relative options at execution time. |

## Gaps and exclusions

- Successful debit-card verification and password-reset completion are deferred by the FSD; valid debit-card information is unavailable.
- Credit Card verification and the Know your Customer ID flow are outside the four selected intents.
