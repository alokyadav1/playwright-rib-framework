# Bandhan Bank Forgot Password test cases

- **Source:** `docs/fsd/Bandhan_Bank_Forgot_Password_FSD.md`, version 1.1, 12 November 2026
- **Scope:** Only the four intents in §3.
- **Amendment (17 November 2026):** RIB_FPWD_002 now checks only that entering 17 digits retains the first 16 digits.
- **Status:** Four case designs are approved and verified in UAT, including the amended RIB_FPWD_002. The source FSD is draft for functional review.
- **Open questions:**
  - None for the four selected outcomes. Successful verification and password reset remain deferred by the FSD.

## RIB_FPWD_001 - Empty required fields show all required messages

- **Test Case ID** — RIB_FPWD_001
- **Title** — Verify required-field messages appear together
- **Requirement(s)** — FR-FPWD-002.1, FR-FPWD-002.2, FR-FPWD-002.3, FR-FPWD-002.4, OBS-FPWD-001
- **Short description** — Submit the Debit Card verification form with Customer ID, card number, and ATM PIN empty; verify the three specified messages appear together and no expiry validation feedback appears.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT.
- **Preconditions** — The Forgot Password Debit Card verification form is open. Customer ID, card number, and ATM PIN are empty. Leave expiry controls in their initial state.
- **Data required** — `navigation.fpwdPath` (`?page=user-information`, FSD §1); `label fpwdRequiredCustomerIdMessage` (exact text: “Please provide your Customer Id to proceed”); `label fpwdRequiredCardNumberMessage` (exact text: “Please provide your card number to proceed”); `label fpwdRequiredAtmPinMessage` (exact text: “Please provide your ATM pin to proceed”).
- **Steps**
  1. The user leaves Customer ID empty.
  2. The user leaves card number empty.
  3. The user leaves ATM PIN empty.
  4. The user leaves expiry controls in their initial state.
  5. The user selects Continue.
- **Expected result**
  1. The system displays `label fpwdRequiredCustomerIdMessage` directly below Customer ID. [FR-FPWD-002.1, FR-FPWD-002.4]
  2. The system displays `label fpwdRequiredCardNumberMessage` directly below card number. [FR-FPWD-002.2, FR-FPWD-002.4]
  3. The system displays `label fpwdRequiredAtmPinMessage` directly below ATM PIN, with all three required messages shown together. [FR-FPWD-002.3, FR-FPWD-002.4]
  4. The system displays no expiry validation feedback. [OBS-FPWD-001]
- **Open items** — None for test data. Do not assert an expiry message; the FSD reports none for this form.

## RIB_FPWD_002 - Entering 17 debit card digits keeps only 16 digits

- **Test Case ID** — RIB_FPWD_002
- **Title** — Entering 17 debit card digits keeps only 16 digits
- **Requirement(s)** — FR-FPWD-003.1
- **Short description** — Enter a 17-digit debit card number and verify the field retains only 16 digits.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT.
- **Preconditions** — The Forgot Password Debit Card verification form is open. This case does not select Continue or submit card details.
- **Data required** — `navigation.fpwdPath` (`?page=user-information`, FSD §1); `fpwdInputs.cardBoundarySamples.length17` (user-approved encrypted 17-digit test sample).
- **Steps**
  1. The user enters the approved 17-digit sample.
- **Expected result**
  1. The card number field retains only 16 digits. [FR-FPWD-003.1]
- **Open items** — None. The approved samples are encrypted and this case does not submit card details.

## RIB_FPWD_003 - Short ATM PIN shows a length error

- **Test Case ID** — RIB_FPWD_003
- **Title** — Verify short ATM PIN shows the specified length message
- **Requirement(s)** — FR-FPWD-004.1, FR-FPWD-004.2
- **Short description** — Submit a nonempty three-digit ATM PIN with the other required verification inputs populated and verify the specified length message.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT.
- **Preconditions** — The Forgot Password Debit Card verification form is open. An approved test setup can populate Customer ID, card number, and a future expiry without reaching backend authentication.
- **Data required** — `navigation.fpwdPath` (`?page=user-information`, FSD §1); `fpwdInputs.shortLengthInputs` (approved nonempty Customer ID, card number, and nonempty three-digit ATM PIN; **INFERRED (basis: §2 specifies four digits and §3 selects a value below four digits)**; a currently available non-expired expiry option is selected from the UI; no values recorded here); `label fpwdInvalidAtmPinLengthMessage` (exact text: “ATM pin should have 4 digits. Please enter a valid ATM pin.”).
- **Steps**
  1. The user enters the approved nonempty Customer ID.
  2. The user enters the approved nonempty card number.
  3. The user selects a currently available non-expired expiry option.
  4. The user enters a nonempty three-digit ATM PIN.
  5. The user selects Continue.
- **Expected result**
  1. The system displays `label fpwdInvalidAtmPinLengthMessage` with exact text “ATM pin should have 4 digits. Please enter a valid ATM pin.” [FR-FPWD-004.1, FR-FPWD-004.2]
- **Open items** — None. The user approved the encrypted UAT test setup and confirmed short-PIN validation does not reach backend authentication.

## RIB_FPWD_004 - Expired card dates are not available for selection

- **Test Case ID** — RIB_FPWD_004
- **Title** — Verify expired expiry choices cannot be selected
- **Requirement(s)** — FR-FPWD-005.1, FR-FPWD-005.2
- **Short description** — Verify no expiry option representing a date before the current month can be selected.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT.
- **Preconditions** — The Forgot Password Debit Card verification form is open. Determine expired year/month combinations from the current date and the options shown at execution time; do not use fixed dates.
- **Data required** — `navigation.fpwdPath` (`?page=user-information`, FSD §1); current date and expiry choices available in the form.
- **Steps**
  1. The user opens the expiry year options.
  2. The user opens the expiry month options for the current year.
- **Expected result**
  1. No expiry option representing a date before the current month is selectable. [FR-FPWD-005.1, FR-FPWD-005.2]
- **Open items** — None for test data. Use current UI options and date-relative comparison; do not assume a fixed year or month.
