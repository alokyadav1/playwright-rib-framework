# Bandhan Bank Login test cases

- **Source:** `docs/fsd/Bandhan_Bank_Login_FSD.md`, version 1.7, 12 November 2026
- **Scope:** The five intents in §6 only.
- **Status:** Approved by the user. IDs RIB_LOG_006 and RIB_LOG_007 were approved as proposed.
- **Open questions:** CP2 inputs remain for secured credentials and invalid OTP request identification.

## RIB_LOG_001 - Verify valid credentials and manual OTP reach Home Dashboard

- **Test Case ID** — RIB_LOG_001
- **Title** — Verify valid credentials and manual OTP reach Home Dashboard
- **Requirement(s)** — FR-LOG-006, FR-LOG-013
- **Short description** — Sign in with an authorized account, enter its received OTP manually, and verify the authenticated destination.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT; registered customer.
- **Preconditions** — Login page is accessible. Authorized customer credentials and access to the registered OTP channel are available. The OTP is obtained during execution and is not stored as a reusable fixture.
- **Data required** — `credentials.registeredUser` (registered User ID and password; sensitive values held in approved encrypted local data); access to the registered OTP channel for a valid one-time code.
- **Steps**
  1. The user opens the login page and uses the User ID method.
  2. The user enters the registered User ID and its password.
  3. The user accepts the Terms and Conditions.
  4. The user selects Proceed.
  5. The user verifies the OTP page and its specified controls.
  6. The user manually enters the valid OTP received through the registered channel.
  7. The user selects Submit.
- **Expected result**
  1. The system opens the Login OTP page with the specified instruction, Enter OTP field, and Submit control. [FR-LOG-013]
  2. After valid OTP verification, the system redirects the user to Home Dashboard. [FR-LOG-006]
- **Open items** — `NEEDS INPUT: Confirm the existing local registered-user fixture is authorized for UAT and provide access to its OTP channel (bank test-environment owner)`.

## RIB_LOG_002 - Verify unchecked terms show the specified Error modal

- **Test Case ID** — RIB_LOG_002
- **Title** — Verify unchecked terms show the specified Error modal
- **Requirement(s)** — FR-LOG-005.1, FR-LOG-005.2, FR-LOG-012
- **Short description** — Submit with terms unchecked and invalid credentials to verify the terms error takes precedence.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank login page.
- **Preconditions** — Login page is accessible.
- **Data required** — None; leave credentials empty and terms unchecked.
- **Steps**
  1. The user leaves User ID and password empty.
  2. The user leaves the Terms and Conditions checkbox unchecked.
  3. The user selects Proceed.
- **Expected result**
  1. Proceed remains enabled with empty credentials and unchecked terms, including after submission. [FR-LOG-012]
  2. The system displays an Error modal with an error icon, the title Error, the exact message “Please agree to the Terms and Conditions to proceed”, and an Okay button. [FR-LOG-005.1]
  3. The terms Error modal appears despite the empty credentials; login does not complete. [FR-LOG-005.2]
- **Open items** — None for case design.

## RIB_LOG_003 - Verify nonempty incorrect password shows invalid credentials modal

- **Test Case ID** — RIB_LOG_003
- **Title** — Verify nonempty incorrect password shows invalid credentials modal
- **Requirement(s)** — FR-LOG-010.1
- **Short description** — Submit a validly formatted registered User ID with a nonempty incorrect password and accepted terms.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT; registered customer.
- **Preconditions** — Login page is accessible. A test account and a nonempty incorrect password are available in the approved test environment.
- **Data required** — `credentials.registeredUser` (registered, validly formatted User ID and correct password); `credentials.incorrectPassword` (nonempty incorrect password; sensitive values held in approved encrypted local data).
- **Steps**
  1. The user enters the registered, validly formatted User ID.
  2. The user enters the nonempty incorrect password.
  3. The user accepts the Terms and Conditions.
  4. The user selects Proceed.
- **Expected result**
  1. The system displays the invalid credentials modal with heading “Uh-oh! Looks like the credentials entered are incorrect”, supporting text “Please check the entered details and try again.”, and a Try Again button. [FR-LOG-010.1]
  2. Login does not complete and the user remains on the login page. [FR-LOG-010.1]
- **Open items** — `NEEDS INPUT: Owner-provisioned test account and secured nonempty incorrect-password value (bank test-environment owner)`.

## RIB_LOG_006 - Verify User ID boundary-length blur validation

- **Test Case ID** — RIB_LOG_006 (proposed)
- **Title** — Verify User ID boundary-length blur validation
- **Requirement(s)** — FR-LOG-003, FR-LOG-011
- **Short description** — Blur User ID values at the four specified boundary lengths and verify the resulting format feedback.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank login page.
- **Preconditions** — Login page is accessible. The test uses nonempty alphanumeric inputs and does not submit credentials.
- **Data required** — `userIds.boundarySamples` (synthetic letters-only values made from `A` repeated to lengths 4, 5, 50, and 51; no account registration is needed for blur-only checks).
- **Steps**
  1. The user enters the example User ID value.
  2. The user moves focus to Password.
- **Expected result**
  1. For length 4, the system displays “Only Alpha numeric values and length 5-50 are allowed”. [FR-LOG-003, FR-LOG-011]
  2. For length 5, the User ID passes format validation without the invalid-format message. [FR-LOG-003, FR-LOG-011]
  3. For length 50, the User ID passes format validation without the invalid-format message. [FR-LOG-003, FR-LOG-011]
  4. For length 51, the system displays “Only Alpha numeric values and length 5-50 are allowed”. [FR-LOG-003, FR-LOG-011]
- **Open items** — None; the user approved these synthetic boundary samples.

## RIB_LOG_007 - Characterize incorrect OTP response and UI feedback

- **Test Case ID** — RIB_LOG_007 (proposed)
- **Title** — Characterize incorrect OTP response and UI feedback
- **Requirement(s)** — OBS-LOG-001
- **Short description** — Submit an authorized invalid OTP and characterize the associated response and visible UI behavior.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT; characterization of reported behavior, not an assertion of desired behavior.
- **Preconditions** — Login page is accessible. An authorized test account can reach OTP verification, and the test environment permits use of an invalid OTP.
- **Data required** — `credentials.registeredUser` (authorized registered User ID and password, held in approved encrypted local data); an authorized invalid OTP supplied through the approved test-environment method, never persisted as a reusable fixture.
- **Steps**
  1. The user signs in with authorized credentials and accepts the Terms and Conditions.
  2. The user enters an authorized invalid OTP through the approved test-environment method.
  3. The user selects Submit.
- **Expected result**
  1. The OTP submission response is HTTP 417 Expectation Failed. [OBS-LOG-001]
  2. No validation message or error modal appears on screen for that response, matching the reported current behavior. [OBS-LOG-001]
- **Open items** — `NEEDS INPUT: Confirm the existing local registered-user fixture is authorized for UAT; provide an approved invalid-OTP test method and a verified way to identify the OTP submission response (bank test-environment owner)`. This case characterizes a reported feedback gap; it does not establish that silent failure is acceptable.
