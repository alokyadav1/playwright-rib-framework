# Bandhan Bank Unlock Access test cases

- **Source:** `docs/fsd/Bandhan_Bank_Unlock_Access_FSD.md`, version 1.1, 12 November 2026
- **Scope:** The four case IDs selected from §4; RIB_UNL_003 has the user-approved amendment documented below.
- **Status:** Four case designs and IDs approved by the user. On 13 November 2026, the user approved removing icon outcomes from RIB_UNL_002 and RIB_UNL_004 and amending RIB_UNL_003 to check resource-not-found modal text after a generated six-digit OTP. FSD v1.1 remains unchanged; the former OBS-UNL-002 API/UI characterization is not covered by the amended case.
- **Open questions:**
  - The amended RIB_UNL_003 modal text is based on the user-provided screenshot and has not been exercised in a scenario run.

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
  2. After valid OTP verification, the system displays an Error modal with title “Error”, `label unlockFetchErrorMessage` with exact text “Error in fetching data.”, and an Okay button. The error icon is excluded by user-approved amendment. [OBS-UNL-001.2, FR-UNL-003.2]
- **Open items** — Manual OTP is entered by the user at runtime. Run headed and wait up to 60 seconds for the expected modal without a fixed sleep.

## RIB_UNL_003 - Verify resource not found modal after OTP submission

- **Test Case ID** — RIB_UNL_003
- **Title** — Verify resource not found modal after OTP submission
- **Requirement(s)** — FR-UNL-003.1; USER-AMEND-UNL-003 (user-approved case amendment, 13 November 2026)
- **Short description** — Submit a generated six-digit OTP for the approved unlock profile and verify the specified resource-not-found text in the Error modal.
- **Context** — TEST_ENV=uat, BANK=bandhan, LOCALE=en-in; Bandhan Bank UAT. This is the user-approved runtime context; the FSD source records BANK=demo.
- **Preconditions** — The owner-approved `unlockAccess.incorrectOtpCase` profile can reach OTP verification.
- **Data required** — `unlockAccess.incorrectOtpCase` (owner-approved profile; sensitive values stay in an approved encrypted local source); `label unlockResourceNotFoundText` (substring supplied by the user and shown in the attached modal screenshot).
- **Steps**
  1. The user enters the approved profile details.
  2. The user selects Continue and reaches OTP verification.
  3. The user enters a generated random six-digit OTP without waiting for manual entry.
  4. The user submits the OTP.
- **Expected result**
  1. The system opens OTP verification after Continue. [FR-UNL-003.1]
  2. After OTP submission, the Error modal displays text containing `label unlockResourceNotFoundText` (“Can't find resource”). No other modal text, icon, or API response is asserted. [USER-AMEND-UNL-003]
- **Open items** — The original FSD observations OBS-UNL-002.1 and OBS-UNL-002.2 are not covered by this amended case.

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
  2. After valid verification, the system displays an information modal with `label unlockAlreadyUnlockedMessage` with exact text “User ID is already unlocked” and a Continue to Login button. The information and close icons are excluded by user-approved amendment. [FR-UNL-003.2, FR-UNL-004.2]
- **Open items** — Manual OTP is entered by the user at runtime. Run headed and wait up to 60 seconds for the expected modal without a fixed sleep.
