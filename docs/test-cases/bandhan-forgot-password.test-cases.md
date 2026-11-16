# Bandhan Bank Forgot Password test cases

- **Source:** `docs/fsd/Bandhan_Bank_Forgot_Password_FSD.md`, version 1.1, 12 November 2026
- **Scope:** Only the four intents in §3.
- **Amendment (16 November 2026):** RIB_FPWD_002 now also checks an overlength paste, following RIB_FUID_002. The expected cap remains 16 digits.
- **Status:** Four case designs approved by the user on 16 November 2026. The user confirmed the paste outcome must retain 16 digits; RIB_FPWD_002 fails this check in UAT. RIB_FPWD_001, 003 and 004 passed after the amendment. The source FSD is draft for functional review.
- **Open questions:**
  - None for the four selected outcomes. Successful verification and password reset remain deferred by the FSD.

## RIB_FPWD_001 - Verify required-field messages appear together

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

## RIB_FPWD_002 - Verify card number input is capped at 16 digits

- **Test Case ID** — RIB_FPWD_002
- **Title** — Verify card number input is capped at 16 digits
- **Requirement(s)** — FR-FPWD-003.1
- **Short description** — Verify 15- and 16-digit values are retained, a typed 17th digit is blocked, and an 18-digit paste does not exceed the 16-digit cap.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT.
- **Preconditions** — The Forgot Password Debit Card verification form is open. This case does not select Continue or submit card details.
- **Data required** — `navigation.fpwdPath` (`?page=user-information`, FSD §1); `fpwdInputs.cardBoundarySamples` (user-approved encrypted test-only digit samples of lengths 15, 16, and 17); `fuidInputs.cardBoundarySamples.length18` (user-approved encrypted synthetic digit-only sample, reused from RIB_FUID_002 and used only for the field-cap check).
- **Steps**
  1. The user enters the approved 15-digit sample.
  2. The user enters the approved 16-digit sample.
  3. The user attempts to enter a 17th digit after the 16-digit value.
  4. The user pastes the approved 18-digit sample into the card number field.
- **Expected result**
  1. The card number field retains the 15-digit value. [FR-FPWD-003.1]
  2. The card number field retains the 16-digit value. [FR-FPWD-003.1]
  3. The 17th digit is blocked, and the card number field remains at 16 digits. [FR-FPWD-003.1]
  4. Pasting the 18-digit sample does not exceed the cap; the field retains 16 digits. [FR-FPWD-003.1]
- **Open items** — None. The approved samples are encrypted and this case does not submit card details.

## RIB_FPWD_003 - Verify short ATM PIN shows the specified length message

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

## RIB_FPWD_004 - Verify expired expiry choices cannot be selected

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
