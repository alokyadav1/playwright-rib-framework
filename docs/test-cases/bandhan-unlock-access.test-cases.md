# Bandhan Bank Unlock Access test cases

- **Source:** `docs/fsd/Bandhan_Bank_Unlock_Access_FSD.md`, version 1.1, 12 November 2026
- **Scope:** The four intents in §4 only.
- **Status:** Four case designs and proposed IDs approved by the user.
- **Open questions:**
  - NEEDS INPUT: The HTTP response assertion for RIB_UNL_003 remains blocked unless UI exposes the response state or API details are supplied. The response is an observation, not an expectation that UI errors remain silent.

## RIB_UNL_001 - Verify invalid PAN shows exact inline feedback

- **Test Case ID** — RIB_UNL_001
- **Title** — Verify invalid PAN shows exact inline feedback
- **Requirement(s)** — FR-UNL-002.1, FR-UNL-002.2
- **Short description** — Submit Personal details with an invalid PAN and verify the specified inline validation feedback.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT. This is the user-approved runtime context; the FSD source records BANK=demo.
- **Preconditions** — The UAT portal and Unlock Online Banking access page are available. An approved test profile supplies acceptable values for all other required fields.
- **Data required** — `unlockAccess.invalidPanCase` (approved test profile and invalid PAN sample; sensitive customer data stays in an approved encrypted local source); `label unlockInvalidPanMessage` (exact FSD text: “Please provide a valid PAN to proceed.”).
- **Steps**
  1. The user opens the Personal details verification form.
  2. The user enters the approved values for Customer ID, Date of birth, and Mother's maiden name.
  3. The user enters the approved invalid PAN sample.
  4. The user selects Continue.
- **Expected result**
  1. The system displays `label unlockInvalidPanMessage` with exact text “Please provide a valid PAN to proceed.” directly below the PAN field. [FR-UNL-002.1, FR-UNL-002.2]
- **Open items** — None for case design or data readiness.

## RIB_UNL_002 - Verify incorrect personal details show Error after valid OTP

- **Test Case ID** — RIB_UNL_002
- **Title** — Verify incorrect personal details show Error after valid OTP
- **Requirement(s)** — OBS-UNL-001.1, OBS-UNL-001.2, FR-UNL-003.1, FR-UNL-003.2
- **Short description** — Use valid Customer ID and PAN with an incorrect Mother's maiden name, then complete valid OTP verification.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT. This is the user-approved runtime context; the FSD source records BANK=demo.
- **Preconditions** — An owner-approved UAT profile has valid Customer ID and PAN, an incorrect Mother's maiden name, and access to its OTP channel.
- **Data required** — `unlockAccess.incorrectPersonalDetails` (owner-approved profile with an incorrect Mother's maiden name; sensitive values stay in an approved encrypted local source); manual access to a valid OTP at execution time; `label unlockFetchErrorMessage` (exact FSD text: “Error in fetching data.”).
- **Steps**
  1. The user enters the owner-approved Customer ID, Date of birth, PAN, and incorrect Mother's maiden name.
  2. The user selects Continue.
  3. The user manually enters the valid OTP received through the approved channel.
  4. The user completes OTP verification.
- **Expected result**
  1. The system advances to OTP verification without rejecting the incorrect personal-detail value(s) before OTP. [OBS-UNL-001.1, FR-UNL-003.1]
  2. After valid OTP verification, the system displays an Error modal with an error icon, title “Error”, `label unlockFetchErrorMessage` with exact text “Error in fetching data.”, and an Okay button. [OBS-UNL-001.2, FR-UNL-003.2]
- **Open items** — Manual OTP is entered by the user at runtime. Run headed and wait up to 60 seconds for the expected modal without a fixed sleep. Confirm how to identify the specified Error icon if semantic icon identity cannot be verified through the UI.

## RIB_UNL_003 - Characterize incorrect OTP response and UI feedback

- **Test Case ID** — RIB_UNL_003
- **Title** — Characterize incorrect OTP response and UI feedback
- **Requirement(s)** — OBS-UNL-002.1, OBS-UNL-002.2, FR-UNL-003.1
- **Short description** — Submit an authorized incorrect OTP, inspect the reported `unLockUserId` response, and record any UI feedback without treating silence as a requirement.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT. This is the user-approved runtime context; the FSD source records BANK=demo.
- **Preconditions** — An owner-approved UAT profile can reach OTP verification. An approved incorrect-OTP procedure and browser-network evidence source are available.
- **Data required** — `unlockAccess.incorrectOtpCase` (owner-approved test profile and approved incorrect-OTP procedure; do not store a reusable OTP); approved browser-network evidence source for `unLockUserId`.
- **Steps**
  1. The user enters the owner-approved details and advances to OTP verification.
  2. The user enters the owner-approved incorrect OTP.
  3. The user submits the OTP.
  4. The user records the observed UI feedback and the corresponding `unLockUserId` response.
- **Expected result**
  1. The `unLockUserId` response is HTTP 417 and contains `result: SUCCESSFUL` with nested `title: Invalid OTP`, `detail: Invalid OTP`, `code: DIGX_TFA_0004`, and `type: ERROR`. The outer result is not evidence of a successful unlock. [OBS-UNL-002.1]
  2. The UI feedback is recorded as observed; no assertion requires the UI to remain silent. [OBS-UNL-002.2]
- **Open items** — The existing `credentials.registeredUser` group has only User ID/password and is not used as the unlock profile. The HTTP response assertion is blocked unless the response state can be verified through the UI or API details are provided.

## RIB_UNL_004 - Verify already-unlocked user sees the information modal

- **Test Case ID** — RIB_UNL_004
- **Title** — Verify already-unlocked user sees the information modal
- **Requirement(s)** — FR-UNL-003.1, FR-UNL-003.2, FR-UNL-004.1, FR-UNL-004.2
- **Short description** — Complete the detail-entry and valid OTP flow for an already-unlocked user and verify the reported information modal.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT. This is the user-approved runtime context; the FSD source records BANK=demo.
- **Preconditions** — An owner-approved UAT profile is already unlocked, has the required personal details, and can receive OTP.
- **Data required** — `unlockAccess.alreadyUnlockedUser` (owner-approved profile; sensitive values stay in an approved encrypted local source); manual access to a valid OTP at execution time; `label unlockAlreadyUnlockedMessage` (exact FSD text: “User ID is already unlocked”).
- **Steps**
  1. The user enters the already-unlocked user's approved personal details.
  2. The user selects Continue.
  3. The user manually enters the valid OTP received through the approved channel.
  4. The user completes OTP verification.
- **Expected result**
  1. The system follows the OTP flow without an earlier already-unlocked check. [FR-UNL-003.1, FR-UNL-004.1]
  2. After valid verification, the system displays an information modal with an information icon, `label unlockAlreadyUnlockedMessage` with exact text “User ID is already unlocked”, a Continue to Login button, and a close icon. [FR-UNL-003.2, FR-UNL-004.2]
- **Open items** — Manual OTP is entered by the user at runtime. Run headed and wait up to 60 seconds for the expected modal without a fixed sleep. Confirm the specified information and close icons if semantic identity cannot be verified through the UI.
