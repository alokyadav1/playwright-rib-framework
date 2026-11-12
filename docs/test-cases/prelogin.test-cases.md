# Bandhan Bank Prelogin Test Cases

Source: [Bandhan Bank Login FSD](../fsd/Bandhan_Bank_Login_FSD.md), version 1.6, 12 November 2026.

**Selection update:** The user confirmed the password blur/refocus rule and chose to replace BND_LOG_005. BND_LOG_005 is retained below as deprecated; BND_LOG_006 replaces it. Five cases remain active.

## Open questions

- **BND_LOG_001:** NEEDS INPUT: provide an authorized environment where Home Dashboard access is available to verify the final redirect.
- **BND_LOG_003:** NEEDS INPUT: provide a registered test account whose User ID contains at least one letter, so a case-only variant can be tested.

## Coverage summary — five active cases

| FSD requirement | Covered by | Coverage |
|---|---|---|
| FR-LOG-001 | BND_LOG_001 | User ID method and selected state in the successful login flow |
| FR-LOG-002 | BND_LOG_001, BND_LOG_003 | Valid User ID in successful login; case-sensitive authentication. Invalid character classes are not covered by the active set. |
| FR-LOG-003 | BND_LOG_001 | Successful login uses a validly formatted User ID. Length boundaries are not covered by the active set. |
| FR-LOG-004 | BND_LOG_001, BND_LOG_004 | Required credentials and empty-password rejection |
| FR-LOG-005 | BND_LOG_002 | Terms error, precedence, modal dismissal, retained User ID and checkbox state, masked password |
| FR-LOG-006 | BND_LOG_001 | Successful authentication and redirect without OTP; final destination verification is blocked |
| FR-LOG-010 | BND_LOG_003, BND_LOG_004 | Invalid-credential modal for incorrect credentials and empty password |
| FR-LOG-011 | None | Not covered after BND_LOG_005 was deprecated |
| FR-LOG-012 | BND_LOG_002 | Proceed remains enabled when Terms are unchecked |
| FR-LOG-013 | BND_LOG_002, BND_LOG_006 | Password is masked while unfocused and cleared on refocus |

**Not covered in this five-case selection:** FR-LOG-007 and FR-LOG-008 (recovery navigation), FR-LOG-009 (virtual keyboard), and FR-LOG-011 (User ID blur feedback). User ID length boundaries and disallowed character classes in FR-LOG-002 and FR-LOG-003 are also not covered by the active set.

## Test cases

### BND_LOG_001 - Verify successful User ID login redirects to Home Dashboard

- **Test Case ID** — BND_LOG_001
- **Title** — Verify successful User ID login redirects to Home Dashboard
- **Priority** — P1. Login is the critical prelogin journey.
- **Requirement(s)** — FR-LOG-001, FR-LOG-002, FR-LOG-003, FR-LOG-004, FR-LOG-005, FR-LOG-006
- **Short description** — Sign in with a registered User ID, its associated password, and accepted Terms and Conditions.
- **Context** — Bandhan Bank Online Banking, prelogin, User ID method.
- **Preconditions** — Login page is accessible. A registered account with a valid User ID and associated password is available. The account is authorized for the test environment.
- **Data required** — `credentials.registeredUser` (`userId`, `password`): authorized registered account; do not record credential values. `label.userIdOption`, `label.termsAcceptance`, `label.proceed`: exact labels specified in FR-LOG-001, FR-LOG-005, and FR-LOG-006.
- **Steps**
  1. Open the Online Banking login page.
  2. Confirm the User ID login method is selected.
  3. Enter the registered User ID and its associated password.
  4. Accept the Terms and Conditions.
  5. Select Proceed.
- **Expected result**
  1. The User ID login method is available and selected. [FR-LOG-001]
  2. The Terms and Conditions checkbox is initially unchecked. [FR-LOG-005]
  3. The registered User ID and associated password are accepted as the login credentials; the User ID match is case-sensitive and its format is 5 to 50 alphanumeric characters. [FR-LOG-002, FR-LOG-003, FR-LOG-004]
  4. Login succeeds and the system redirects to Home Dashboard without OTP verification. [FR-LOG-006]
- **Open items** — NEEDS INPUT: provide an authorized environment where Home Dashboard access is available to verify the final redirect. The dashboard URL and contents are outside the FSD.

### BND_LOG_002 - Verify Terms and Conditions are required before login

- **Test Case ID** — BND_LOG_002
- **Title** — Verify Terms and Conditions are required before login
- **Priority** — P1. Enforces the explicitly mandatory consent step and its precedence over credential errors.
- **Requirement(s)** — FR-LOG-005, FR-LOG-012, FR-LOG-013
- **Short description** — Submit with Terms and Conditions unchecked and verify the specified error response and masked password after dismissal.
- **Context** — Bandhan Bank Online Banking UAT, prelogin; the browser test context grants geolocation permission before navigation.
- **Preconditions** — Login page is accessible.
- **Data required** — `credentials.registeredUser` (`userId`): authorized test account; store the identifier encrypted. `credentials.incorrectPassword` (`password`): nonempty password that does not authenticate with the registered User ID; store it encrypted. `label loginUserIdField`, `label loginPasswordField`, `label loginTermsAcceptance`, `label loginProceedButton`, `label loginTermsAcceptanceError`, `label loginErrorModalTitle`, `label loginOkayButton`: exact text specified in FR-LOG-001, FR-LOG-005, and FR-LOG-006.
- **Steps**
  1. Enter the registered User ID and `credentials.incorrectPassword`.
  2. Leave the Terms and Conditions checkbox unchecked.
  3. Select Proceed.
  4. Attempt to dismiss the modal by clicking outside it.
  5. Attempt to dismiss the modal by pressing Escape.
  6. Select Okay.
  7. Focus the password field again.
- **Expected result**
  1. Proceed remains enabled while Terms and Conditions are unchecked. [FR-LOG-012]
  2. An Error modal appears with an error icon, the title **Error**, the exact message “Please agree to the Terms and Conditions to proceed”, and an Okay button. [FR-LOG-005]
  3. The Terms and Conditions error appears even when the entered credentials are invalid; it takes precedence over the invalid credentials modal. [FR-LOG-005]
  4. Clicking outside the modal or pressing Escape does not dismiss it. [FR-LOG-005]
  5. Selecting Okay dismisses the modal and reveals the login page. The entered User ID and unchecked checkbox state are retained. The password is shown in masked form while the field remains unfocused. Login does not complete. [FR-LOG-005, FR-LOG-013]
  6. Focusing the password field after Okay clears it. [FR-LOG-013]
- **Open items** — None.

### BND_LOG_003 - Verify authentication rejects mismatched credentials

- **Test Case ID** — BND_LOG_003
- **Title** — Verify authentication rejects mismatched credentials
- **Priority** — P1. Protects the authentication boundary and verifies the specified failure response.
- **Requirement(s)** — FR-LOG-002, FR-LOG-010, FR-LOG-013
- **Short description** — Submit an incorrect nonempty password and a User ID differing from the registered ID only by letter case; verify both are rejected.
- **Context** — Bandhan Bank Online Banking, prelogin.
- **Preconditions** — Login page is accessible. A registered test account is available, and its User ID contains at least one letter.
- **Data required** — `credentials.registeredUser` (`userId`, `password`): authorized account; do not record credential values. `credentials.incorrectPassword`: nonempty password that does not authenticate with the registered User ID. `credentials.caseVariantUserId`: same registered User ID with only letter case changed. `label.invalidCredentialsHeading`, `label.invalidCredentialsSupportingText`, `label.tryAgain`: exact text specified in FR-LOG-010.
- **Steps**
  1. Enter the registered User ID and `credentials.incorrectPassword`.
  2. Accept the Terms and Conditions.
  3. Select Proceed.
  4. Attempt to dismiss the modal by clicking outside it.
  5. Attempt to dismiss the modal by pressing Escape.
  6. Select Try Again after confirming the invalid credentials modal.
  7. Replace the User ID with `credentials.caseVariantUserId` and enter the registered password.
  8. Select Proceed.
- **Expected result**
  1. The incorrect nonempty password is rejected. The modal shows the heading “Uh-oh! Looks like the credentials entered are incorrect”, supporting text “Please check the entered details and try again.”, and a Try Again button. Login does not complete. [FR-LOG-010]
  2. Clicking outside the invalid credentials modal or pressing Escape does not dismiss it. [FR-LOG-010]
  3. Selecting Try Again dismisses the modal and reveals the login page. The submitted User ID and accepted Terms and Conditions state are retained. The password is shown in masked form while its field remains unfocused. [FR-LOG-010, FR-LOG-013]
  4. The User ID that differs only by letter case is rejected with the same invalid credentials modal. Login does not complete. [FR-LOG-002, FR-LOG-010]
- **Open items** — NEEDS INPUT: provide a registered test account whose User ID contains at least one letter, so a case-only variant can be tested.

### BND_LOG_004 - Verify an empty password is rejected on Proceed

- **Test Case ID** — BND_LOG_004
- **Title** — Verify an empty password is rejected on Proceed
- **Priority** — P1. Prevents successful login without a required credential and verifies the specified validation timing.
- **Requirement(s)** — FR-LOG-004, FR-LOG-010
- **Short description** — Submit a validly formatted User ID with Terms accepted and no password.
- **Context** — Bandhan Bank Online Banking, prelogin.
- **Preconditions** — Login page is accessible. A validly formatted registered User ID is available.
- **Data required** — `credentials.registeredUser` (`userId`): authorized account; do not record credential values. `label.invalidCredentialsHeading`, `label.invalidCredentialsSupportingText`, `label.tryAgain`: exact text specified in FR-LOG-010.
- **Steps**
  1. Enter the registered User ID.
  2. Leave the password empty.
  3. Move focus away from the password field.
  4. Accept the Terms and Conditions.
  5. Select Proceed.
- **Expected result**
  1. Moving focus away from the empty password field does not display empty-password validation. [FR-LOG-004]
  2. Selecting Proceed displays the invalid credentials modal with the exact heading “Uh-oh! Looks like the credentials entered are incorrect”, supporting text “Please check the entered details and try again.”, and a Try Again button. Login does not complete. [FR-LOG-004, FR-LOG-010]
- **Open items** — None.

### DEPRECATED — BND_LOG_005 - Verify User ID format and blur validation

- **Status** — DEPRECATED by user decision; replaced in the active five-case selection by BND_LOG_006. Preserved for traceability.

- **Test Case ID** — BND_LOG_005
- **Title** — Verify User ID format and blur validation
- **Priority** — P2. Covers specified format boundaries and interaction-dependent feedback before authentication.
- **Requirement(s)** — FR-LOG-002, FR-LOG-003, FR-LOG-004, FR-LOG-011
- **Short description** — Check allowed and disallowed User ID values, inclusive length limits, and the specified blur-message sequences.
- **Context** — Bandhan Bank Online Banking, prelogin.
- **Preconditions** — Login page is accessible.
- **Data required** — `login.userId.lettersOnly`, `login.userId.digitsOnly`, `login.userId.mixedAlphanumeric`, `login.userId.fiveCharacters`, `login.userId.fiftyCharacters`, `login.userId.fourCharacters`, `login.userId.fiftyOneCharacters`, `login.userId.withWhitespace`, `login.userId.withSpecialCharacter`, `login.userId.invalidThenCleared`: test values matching their key descriptions; no actual credential values. `label.invalidUserIdFormat`: exact text specified in FR-LOG-011. `label.clearedInvalidUserId`: exact text specified in FR-LOG-011.
- **Steps**
  1. Focus User ID, leave it empty, and move focus to Password.
  2. Enter `login.userId.lettersOnly`, then move focus to Password.
  3. Repeat with `login.userId.digitsOnly`, `login.userId.mixedAlphanumeric`, `login.userId.fiveCharacters`, and `login.userId.fiftyCharacters`.
  4. Repeat with `login.userId.fourCharacters`, `login.userId.fiftyOneCharacters`, `login.userId.withWhitespace`, and `login.userId.withSpecialCharacter`, moving focus to Password after each value.
  5. Enter a valid User ID, clear it before leaving the field, and move focus to Password.
  6. Enter `login.userId.invalidThenCleared` and move focus to Password.
  7. After the invalid-value message appears, clear the User ID and move focus to Password.
  8. Enter `login.userId.withSpecialCharacter`, enter a valid password, accept the Terms and Conditions, and select Proceed.
- **Expected result**
  1. An empty User ID does not show a validation message on the initial blur. [FR-LOG-011]
  2. Letters-only, digits-only, mixed alphanumeric, 5-character, and 50-character User IDs pass format validation. [FR-LOG-002, FR-LOG-003]
  3. Four-character, 51-character, whitespace-containing, special-character-containing, and other nonempty invalid User IDs show “Only Alpha numeric values and length 5-50 are allowed” on blur. [FR-LOG-002, FR-LOG-003, FR-LOG-011]
  4. Entering a valid User ID, clearing it before leaving the field, and then blurring shows no validation message. [FR-LOG-011]
  5. Clearing the User ID after the invalid-value message has appeared and then blurring shows “Please enter 5 to 50 character”. [FR-LOG-011]
  6. Proceed remains enabled with an invalid User ID. The login does not succeed. [FR-LOG-004, FR-LOG-012]
- **Open items** — None.

### BND_LOG_006 - Verify the password is masked on blur and cleared on focus

- **Test Case ID** — BND_LOG_006
- **Title** — Verify the password is masked on blur and cleared on focus
- **Priority** — P1. Prevents the entered password from remaining visible after focus leaves the field and verifies clearing on refocus.
- **Requirement(s)** — FR-LOG-013
- **Short description** — Enter a nonempty password, move focus away to verify masking, then focus the password field again and verify it is cleared.
- **Context** — Bandhan Bank Online Banking, prelogin.
- **Preconditions** — Login page is accessible.
- **Data required** — `credentials.incorrectPassword` (password): nonempty value for field-state testing, stored encrypted; it is not submitted for authentication.
- **Steps**
  1. Enter `credentials.incorrectPassword` in the password field.
  2. Focus the User ID field to move focus away from the password field.
  3. Focus the password field again.
- **Expected result**
  1. After focus leaves the password field, the password is shown in masked form. [FR-LOG-013]
  2. When the password field is focused again, it is cleared. [FR-LOG-013]
- **Open items** — None.
