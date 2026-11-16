# Bandhan Bank Know Your Customer ID test cases

- **Source:** `docs/fsd/Bandhan_Bank_Know_Customer_ID_FSD.md`, version 1.1, 12 November 2026
- **Scope:** The five intents in §4 only.
- **Status:** Five case designs approved by the user on 16 November 2026; implementation in progress. The source FSD is draft for functional review. No cases are verified.
- **Open questions:** None for case design. RIB_KCID_005 requires the user to enter the active OTP manually during headed UAT execution; no reusable OTP value is stored.

## RIB_KCID_001 - Verify required mobile and date of birth messages appear together

- **Test Case ID** — RIB_KCID_001
- **Title** — Verify required mobile and date of birth messages appear together
- **Requirement(s)** — FR-KCID-002.1, FR-KCID-002.2, FR-KCID-002.3
- **Short description** — Submit the Date of Birth verification form with both required fields empty and verify the two specified inline messages.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT.
- **Preconditions** — The Know your Customer ID form is available with Date of Birth verification selected.
- **Data required** — `label kcidRequiredMobileMessage` (exact FSD text: “Please provide your Mobile number to proceed”); `label kcidRequiredDateOfBirthMessage` (exact FSD text: “Please provide your Date of birth to proceed”).
- **Steps**
  1. The user leaves the mobile number empty.
  2. The user leaves the date of birth empty.
  3. The user selects Continue.
- **Expected result**
  1. The system displays `label kcidRequiredMobileMessage` with exact text “Please provide your Mobile number to proceed” directly below the mobile input. [FR-KCID-002.1, FR-KCID-002.3]
  2. The system displays `label kcidRequiredDateOfBirthMessage` with exact text “Please provide your Date of birth to proceed” directly below the date-of-birth input, at the same time as the mobile message. [FR-KCID-002.2, FR-KCID-002.3]
- **Open items** — None for case design.

## RIB_KCID_002 - Verify the mobile input accepts up to 17 characters

- **Test Case ID** — RIB_KCID_002
- **Title** — Verify the mobile input accepts up to 17 characters
- **Requirement(s)** — FR-KCID-003.1, FR-KCID-003.2, FR-KCID-003.3
- **Short description** — Enter nonnumeric mobile input at the specified length boundaries and verify the 17-character maximum.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT.
- **Preconditions** — The Know your Customer ID form is available with Date of Birth verification selected. This case does not submit the form.
- **Data required** — `kcidLookup.mobileSamples.length16`, `kcidLookup.mobileSamples.length17`, and `kcidLookup.mobileSamples.eighteenthCharacter` (synthetic nonnumeric values for the 16- and 17-character inputs and the attempted extra character; no registered customer data is needed).
- **Steps**
  1. The user enters the 16-character sample in the mobile input.
  2. The user extends the mobile input to 17 characters.
  3. The user attempts to enter an 18th character.
- **Expected result**
  1. The mobile input accepts nonnumeric characters and the 16-character sample. [FR-KCID-003.1, FR-KCID-003.2]
  2. The mobile input accepts the 17-character value. [FR-KCID-003.2]
  3. The attempted 18th character is blocked and the input remains at 17 characters. [FR-KCID-003.3]
- **Open items** — None.

## RIB_KCID_003 - Verify nonmatching mobile and date of birth show Error modal

- **Test Case ID** — RIB_KCID_003
- **Title** — Verify nonmatching mobile and date of birth show Error modal
- **Requirement(s)** — FR-KCID-004.1
- **Short description** — Submit validly formatted but nonmatching mobile and date-of-birth details and verify the specified Error modal.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT.
- **Preconditions** — The Know your Customer ID form is available with Date of Birth verification selected.
- **Data required** — `kcidLookup.nonmatchingDetails` (synthetic 10-digit mobile number and valid date of birth before 2020, stored encrypted); existing labels `loginErrorModalTitle` and `loginOkayButton`; `label kcidDetailsMismatchMessage` (exact FSD text: “Details do not match with entered mobile number.”).
- **Steps**
  1. The user enters the synthetic 10-digit mobile number.
  2. The user enters the synthetic date of birth before 2020.
  3. The user selects Continue.
- **Expected result**
  1. The system displays an Error modal with an error icon, `loginErrorModalTitle` with exact text “Error”, `label kcidDetailsMismatchMessage` with exact text “Details do not match with entered mobile number.”, and `loginOkayButton` with exact text “Okay”. [FR-KCID-004.1]
- **Open items** — Invalid-format mobile/DOB behavior is not covered by this selected case.

## RIB_KCID_004 - Verify incorrect OTP shows the specified Error modal

- **Test Case ID** — RIB_KCID_004
- **Title** — Verify incorrect OTP shows the specified Error modal
- **Requirement(s)** — FR-KCID-005.1, FR-KCID-006.1
- **Short description** — Use matching registered details, submit a generated incorrect OTP, and verify the specified Error modal.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT; registered customer.
- **Preconditions** — The Know your Customer ID form is available with Date of Birth verification selected. The registered profile can reach OTP verification.
- **Data required** — `credentials.registeredUser.mobile` and `credentials.registeredUser.dateOfBirth` (matching registered details, stored encrypted); existing labels `loginErrorModalTitle` and `loginOkayButton`; `label kcidInvalidOtpMessage` (exact FSD text: “Please Enter Valid One Time Password”). The incorrect OTP is generated once in memory using the existing Login flow.
- **Steps**
  1. The user enters the matching registered mobile number and date of birth.
  2. The user selects Continue.
  3. The test flow enters a generated incorrect OTP for the active challenge.
  4. The user submits the OTP.
- **Expected result**
  1. The system advances to the OTP page after the matching details are submitted. [FR-KCID-005.1]
  2. The system displays an Error modal with an error icon, `loginErrorModalTitle` with exact text “Error”, `label kcidInvalidOtpMessage` with exact text “Please Enter Valid One Time Password”, and `loginOkayButton` with exact text “Okay”. [FR-KCID-006.1]
- **Open items** — None. The generated incorrect OTP is not persisted.

## RIB_KCID_005 - Verify valid manual OTP shows Customer ID retrieval confirmation

- **Test Case ID** — RIB_KCID_005
- **Title** — Verify valid manual OTP shows Customer ID retrieval confirmation
- **Requirement(s)** — FR-KCID-005.1, FR-KCID-005.2, FR-KCID-007.1
- **Short description** — Use matching registered details, enter the received OTP manually, and verify the specified retrieval success confirmation.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT; registered customer.
- **Preconditions** — The Know your Customer ID form is available with Date of Birth verification selected. The registered profile can reach OTP verification, and the user can access its registered OTP channel.
- **Data required** — `credentials.registeredUser.mobile` and `credentials.registeredUser.dateOfBirth` (matching registered details, stored encrypted); manual access to the valid OTP received for the active challenge; `label kcidSuccessHeading` (exact FSD text: “You have successfully retrieved your Customer ID!”); `label kcidSuccessMessage` (exact FSD text: “Your Customer ID has been sent to your registered mobile number and email ID.”); `label kcidContinueToLoginButton` (exact FSD text: “Continue to Login”).
- **Steps**
  1. The user enters the matching registered mobile number and date of birth.
  2. The user selects Continue.
  3. The user manually enters the valid OTP received through the registered channel.
  4. The user submits the OTP.
- **Expected result**
  1. The system advances to the OTP page after the matching details are submitted. [FR-KCID-005.1]
  2. The OTP is entered manually during this POC flow. [FR-KCID-005.2]
  3. The system displays a success modal with a green success icon, `label kcidSuccessHeading` with exact text “You have successfully retrieved your Customer ID!”, `label kcidSuccessMessage` with exact text “Your Customer ID has been sent to your registered mobile number and email ID.”, and `label kcidContinueToLoginButton` with exact text “Continue to Login”. [FR-KCID-007.1]
- **Open items** — No data questions remain. This case verifies the displayed confirmation only; actual SMS/email delivery is outside selected coverage.