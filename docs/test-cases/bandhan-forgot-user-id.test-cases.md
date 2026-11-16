# Bandhan Bank Forgot User ID test cases

- **Source:** `docs/fsd/Bandhan_Bank_Forgot_User_ID_FSD.md`, version 1.1, 12 November 2026
- **Scope:** The four intents in §3 only.
- **Status:** Four case designs approved by the user on 16 November 2026; data keys are ready for implementation. The source FSD is draft for functional review. No cases are automated or verified.
- **Open questions:** None for data design. Runtime UI locators and month/year options must be verified before assertions are implemented.

## RIB_FUID_001 - Verify required-field messages appear together

- **Test Case ID** — RIB_FUID_001
- **Title** — Verify required-field messages appear together
- **Requirement(s)** — FR-FUID-002.1, FR-FUID-002.2, FR-FUID-002.3, FR-FUID-002.4, FR-FUID-002.5
- **Short description** — Submit the Debit Card form with Customer ID, card number, expiry month, and ATM PIN empty and verify all applicable required messages together.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT.
- **Preconditions** — The Forgot User ID Debit Card form is open in its initial state. The year dropdown remains at its FSD-specified preselected current year; no expiry month is selected.
- **Data required** — `label fuidRequiredCustomerIdMessage` (exact FSD text: “Please provide your Customer Id to proceed”); `label fuidRequiredCardNumberMessage` (exact FSD text: “Please provide your card number to proceed”); `label fuidRequiredExpiryMonthMessage` (exact FSD text: “Please provide your card expiry month to proceed”); `label fuidRequiredAtmPinMessage` (exact FSD text: “Please provide your ATM pin to proceed”). No customer or card values.
- **Steps**
  1. The user leaves Customer ID empty.
  2. The user leaves card number empty.
  3. The user leaves expiry month unselected.
  4. The user leaves ATM PIN empty.
  5. The user selects Continue.
- **Expected result**
  1. The system displays `label fuidRequiredCustomerIdMessage` with exact text “Please provide your Customer Id to proceed” directly below Customer ID. [FR-FUID-002.1, FR-FUID-002.5]
  2. The system displays `label fuidRequiredCardNumberMessage` with exact text “Please provide your card number to proceed” directly below card number. [FR-FUID-002.2, FR-FUID-002.5]
  3. The system displays `label fuidRequiredExpiryMonthMessage` with exact text “Please provide your card expiry month to proceed” directly below expiry month. [FR-FUID-002.3, FR-FUID-002.5]
  4. The system displays `label fuidRequiredAtmPinMessage` with exact text “Please provide your ATM pin to proceed” directly below ATM PIN, with all four applicable messages shown together. [FR-FUID-002.4, FR-FUID-002.5]
- **Open items** — None for data. The year is preselected; no year-required message is expected.

## RIB_FUID_002 - Verify card number input is capped at 16 digits

- **Test Case ID** — RIB_FUID_002
- **Title** — Verify card number input is capped at 16 digits
- **Requirement(s)** — FR-FUID-003.1
- **Short description** — Verify 15- and 16-digit values are retained and a 17th digit is blocked when typed or pasted.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT.
- **Preconditions** — The Forgot User ID Debit Card form is open. This case does not select Continue or submit card details.
- **Data required** — `fuidInputs.cardBoundarySamples` (encrypted, synthetic digit-only samples with lengths 15, 16, and 17; non-routable and used only for field-cap checks).
- **Steps**
  1. The user enters the approved 15-digit sample.
  2. The user enters the approved 16-digit sample.
  3. The user attempts to type a 17th digit after the 16-digit value.
  4. The user pastes the approved 17-digit sample into the card number field.
- **Expected result**
  1. The card number field retains the 15-digit value. [FR-FUID-003.1]
  2. The card number field retains the 16-digit value. [FR-FUID-003.1]
  3. Typing beyond 16 digits is blocked and the value remains at 16 digits. [FR-FUID-003.1]
  4. Pasting more than 16 digits is blocked and the value remains at 16 digits. [FR-FUID-003.1]
- **Open items** — None; the case does not submit card details.

## RIB_FUID_003 - Verify short ATM PIN shows the specified length message

- **Test Case ID** — RIB_FUID_003
- **Title** — Verify short ATM PIN shows the specified length message
- **Requirement(s)** — FR-FUID-004.1, FR-FUID-004.2
- **Short description** — Submit a nonempty three-digit PIN with other required form inputs populated and verify the specified PIN-length message.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT.
- **Preconditions** — The Forgot User ID Debit Card form is open. The user approved reuse of the existing encrypted Customer ID, synthetic test-only card/PIN values, and client-side validation before backend authentication. A non-expired month/year choice is available in the form.
- **Data required** — `credentials.registeredUser.customerId` (existing encrypted UAT value); `fuidInputs.cardBoundarySamples.length16` (encrypted synthetic non-routable 16-digit value); `fuidInputs.shortLengthInputs.atmValue` (encrypted synthetic three-digit PIN); a currently selectable non-expired month/year from the form (selected at runtime, no static date assumed); `label fuidInvalidAtmPinLengthMessage` (exact FSD text: “ATM pin should have 4 digits. Please enter a valid ATM pin.”).
- **Steps**
  1. The user enters the approved Customer ID.
  2. The user enters the approved test-only card number.
  3. The user selects a currently non-expired expiry month and year.
  4. The user enters the approved nonempty three-digit ATM PIN.
  5. The user selects Continue.
- **Expected result**
  1. The system displays `label fuidInvalidAtmPinLengthMessage` with exact text “ATM pin should have 4 digits. Please enter a valid ATM pin.” [FR-FUID-004.1, FR-FUID-004.2]
- **Open items** — None for data design. Verify the form continues to enforce short-PIN validation before any backend authentication during implementation.

## RIB_FUID_004 - Verify expired expiry dates cannot be selected

- **Test Case ID** — RIB_FUID_004
- **Title** — Verify expired expiry dates cannot be selected
- **Requirement(s)** — FR-FUID-005.2
- **Short description** — Verify the expiry controls do not offer or permit a date that has already expired.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT.
- **Preconditions** — The Forgot User ID Debit Card form is open. Use the current date and the available month/year choices shown by the form; do not rely on a fixed year or month fixture.
- **Data required** — None; the candidate expired date is determined from the current date and the UI options at execution time.
- **Steps**
  1. The user opens the expiry year options.
  2. The user opens the expiry month options for the currently selected year.
- **Expected result**
  1. No year before the current year is offered. [FR-FUID-005.2]
  2. No month before the current month is offered for the current year, so an expired date cannot be selected. [FR-FUID-005.2]
- **Open items** — None for data. Future-option coverage and the current-year preselection are not separate outcomes in the selected POC.