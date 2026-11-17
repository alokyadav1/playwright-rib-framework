# Bandhan Bank Forgot User ID test cases

- **Source:** `docs/fsd/Bandhan_Bank_Forgot_User_ID_FSD.md`, version 1.2, 17 November 2026
- **Scope:** The five intents in §3 only.
- **Status:** Four existing case designs were approved by the user on 16 November 2026. RIB_FUID_005 was approved by the user after review of the 17 November 2026 design; implementation awaits its UAT profile and OTP access. Existing automation results remain unchanged; see the traceability record.
- **Change (17 November 2026):** Added RIB_FUID_005 for a valid debit card that is not associated with the submitted Customer ID.
- **Amendment (16 November 2026):** The user approved an 18-digit paste sample for RIB_FUID_002; the expected field cap remains 16 digits.
- **Open questions:** NEEDS INPUT: owner-provisioned encrypted mismatched Customer ID/debit-card profile and authorized access to the correct OTP for RIB_FUID_005. Runtime UI locators for the new flow must be verified after case approval.

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
- **Short description** — Verify 15- and 16-digit values are retained, a 17th typed digit is blocked, and an 18-digit paste does not exceed the 16-digit cap.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT.
- **Preconditions** — The Forgot User ID Debit Card form is open. This case does not select Continue or submit card details.
- **Data required** — `fuidInputs.cardBoundarySamples` (encrypted, synthetic digit-only samples with lengths 15, 16, 17, and 18; non-routable and used only for field-cap checks).
- **Steps**
  1. The user enters the approved 15-digit sample.
  2. The user enters the approved 16-digit sample.
  3. The user attempts to type a 17th digit after the 16-digit value.
  4. The user pastes the approved 18-digit sample into the card number field.
- **Expected result**
  1. The card number field retains the 15-digit value. [FR-FUID-003.1]
  2. The card number field retains the 16-digit value. [FR-FUID-003.1]
  3. Typing beyond 16 digits is blocked and the value remains at 16 digits. [FR-FUID-003.1]
  4. Pasting the 18-digit sample does not exceed 16 digits; the field retains 16 digits. [FR-FUID-003.1]
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

## RIB_FUID_005 - Verify an unassociated debit card shows the specified Error modal after OTP

- **Test Case ID** — RIB_FUID_005
- **Title** — Verify an unassociated debit card shows the specified Error modal after OTP
- **Requirement(s)** — FR-FUID-006.1, FR-FUID-006.2, FR-FUID-006.3
- **Short description** — Submit a valid Customer ID with valid debit-card details for a card associated with a different customer, complete verification with the correct OTP, and verify the specified Error modal.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT.
- **Preconditions** — The Forgot User ID Debit Card form is open. An owner-approved UAT profile provides a valid Customer ID and a valid, non-expired debit card associated with a different customer. The user has authorized access to the OTP channel used by the active challenge.
- **Data required** — `NEEDS INPUT: fuidInputs.unassociatedCardProfile` in the approved encrypted data source, containing the valid Customer ID and the other customer's valid card number, selectable expiry month/year, and valid ATM PIN; the correct OTP is received through the authorized channel and is not persisted; `label loginErrorModalTitle` (existing label: “Error”); `label fuidIncorrectDebitCardMessage` (exact FSD text: “Debit card detail is incorrect. Please enter correct details.”); `label loginOkayButton` (existing label: “Okay”).
- **Steps**
  1. The user enters the valid Customer ID from the approved mismatched profile.
  2. The user enters the valid debit-card details associated with the other customer.
  3. The user selects Continue.
  4. The user enters the correct OTP received through the authorized channel.
  5. The user submits the OTP.
- **Expected result**
  1. The system opens OTP verification after the debit-card form is submitted. [FR-FUID-006.1]
  2. After the correct OTP is submitted, the system opens an Error modal. [FR-FUID-006.2]
  3. The Error modal displays an error icon, `label loginErrorModalTitle` with title “Error”, `label fuidIncorrectDebitCardMessage` with exact text “Debit card detail is incorrect. Please enter correct details.”, and `label loginOkayButton` with text “Okay”. [FR-FUID-006.3]
- **Open items** — NEEDS INPUT: provision `fuidInputs.unassociatedCardProfile` in the approved encrypted source and confirm authorized access to the correct OTP channel. Locators must be observed and verified during implementation; none are inferred from the screenshot.
