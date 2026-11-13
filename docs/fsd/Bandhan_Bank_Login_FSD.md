# Bandhan Bank Login Functional Specification

Version 1.9 | 13 November 2026 | Status: Draft for functional review

## 1 Purpose and scope

This specification defines login to Bandhan Bank Online Banking using a User ID and password. It covers input validation, Terms and Conditions acceptance, successful login, login errors, recovery navigation, and opening the virtual keyboard. Requirement identifiers provide implementation and test traceability.

### Scope

In scope: User ID login; mandatory credentials; User ID validation on blur; Terms and Conditions acceptance; the always enabled Proceed button; successful redirection to Home Dashboard after valid OTP verification; recovery navigation; virtual keyboard opening; the specified error modals and invalid credentials modal dismissal.

Outside this specification: Customer ID login; completion of User ID recovery or password reset; registration and activation; account unlock; dashboard functionality; Help, footer links, promotional content, password visibility toggle, and CAPTCHA behavior.

### Preconditions and dependencies

- The user can access the Online Banking login page.
- A registered account and its valid User ID and password are available for successful login verification.
- Authentication can return success or invalid credentials, and the recovery pages are available.
- Incorrect-password verification uses a validly formatted User ID and a nonempty incorrect password. Empty-password behavior is verified separately.

### Revision and POC context

This revision preserves FR-LOG-001 through FR-LOG-013 and OBS-LOG-001, adds the confirmed OTP input length, and clarifies invalid-OTP UI feedback from the user's report and supplied screenshot. It supersedes version 1.7's report of no visible OTP error feedback.

Sources: Login FSD v1.5; user-supplied login, OTP, dashboard and invalid-OTP error screens; user confirmations through 13 November 2026. No live portal execution was performed while writing this document. Environment: TEST_ENV=uat, BANK=bandhan, LOCALE=en-in. Login entry is the supplied UAT prelogin portal. Account names, account numbers and balances in screenshots are not test fixtures or expected baselines.

Login uses manual OTP entry during the POC until the bank provides its OTP API logic.

## 2 Login screen and input rules

### Screen elements

| Element | Display or interaction | Requirement |
| --- | --- | --- |
| Page heading | Login to Online Banking | FR-LOG-001 |
| Login method | User ID and Customer ID options; User ID selected | FR-LOG-001 |
| User ID | Required text input labelled User ID* | FR-LOG-002, FR-LOG-003 |
| Forgot User ID | Link below the User ID field | FR-LOG-007 |
| Password | Required input labelled Password* | FR-LOG-004 |
| Keyboard icon | Icon within the Password field | FR-LOG-009 |
| Forgot Password | Link below the Password field | FR-LOG-008 |
| Terms acceptance | Checkbox with “I agree to the Terms and Conditions of online banking”; initially unchecked | FR-LOG-005 |
| Login action | Button labelled Proceed; always enabled | FR-LOG-006, FR-LOG-012 |

### Validation requirements

**FR-LOG-001 — Login presentation.** The login page shall provide the User ID login controls identified above and allow the user to use the User ID method.

**FR-LOG-002 — Allowed characters.** User ID shall allow letters only, digits only, or a combination of letters and digits. Whitespace, including leading, trailing, or embedded spaces, is not alphanumeric and shall make the value invalid. Punctuation and special characters shall also make the value invalid.

User ID is case sensitive during authentication. The entered User ID shall match the registered User ID exactly, including letter case.

**FR-LOG-003 — User ID length.** User ID shall contain 5 to 50 characters, inclusive. Values shorter than 5 or longer than 50 shall be invalid. Passing format validation does not establish that an account exists or that credentials are correct.

**FR-LOG-004 — Required credentials.** User ID and password shall be entered before login can succeed. Empty required fields or an invalid User ID shall prevent successful login.

User ID blur feedback shall depend on the interaction sequence defined in FR-LOG-011. An empty User ID shall not always display a validation message on blur. Absence of a message does not make an empty User ID valid for login.

When the User ID is validly formatted and Terms and Conditions are accepted, clicking Proceed with an empty password shall display the invalid credentials modal defined in FR-LOG-010. Empty-password validation shall occur on Proceed, rather than on password input blur. When Terms and Conditions are unchecked, the terms acceptance error in FR-LOG-005 shall take precedence.

No password length, composition, or complexity rules shall be validated during login. The entered password shall be checked against the credentials associated with the User ID.

**FR-LOG-011 — User ID validation behavior.** User ID validation shall depend on the entered value and the preceding interaction. The following sequences begin on the prelogin page. Moving focus from User ID to Password triggers User ID input blur.

| Interaction sequence | Expected User ID feedback |
| --- | --- |
| Focus User ID, leave it empty, then focus Password | No validation message |
| Focus User ID, enter a valid value, clear it before leaving the field, then focus Password | No validation message |
| Focus User ID, enter a nonempty invalid value, then focus Password | “Only Alpha numeric values and length 5-50 are allowed” |
| After the preceding invalid-value message is displayed, return to User ID, clear it, then focus Password | “Please enter 5 to 50 character” |

For a nonempty User ID containing disallowed characters or a length outside 5 to 50 characters, the message shown on blur shall be exactly:

> Only Alpha numeric values and length 5-50 are allowed

When the user clears the field after an invalid-value message has been displayed and then moves focus to Password, the message shall be exactly:

> Please enter 5 to 50 character

**FR-LOG-012 — Proceed availability.** Proceed shall always remain enabled, including when credentials are empty, User ID is invalid, or Terms and Conditions are unchecked. Its enabled state shall not indicate that the inputs are valid or that login can succeed.

## 3 Login and error flows

### Successful login

**FR-LOG-006 — Submit and sign in.** With valid credentials and Terms and Conditions accepted, selecting Proceed shall open OTP verification. Login completes after valid OTP verification and redirects the user to Home Dashboard. OTP verification is required.

1. The user opens the login page and uses the User ID login method.
2. The user enters a User ID that meets the character and length rules.
3. The user enters the password associated with that User ID.
4. The user selects the Terms and Conditions checkbox.
5. The user selects Proceed.
6. The system authenticates the credentials.
7. The system opens the Login OTP page.
8. The user manually enters the received valid OTP.
9. The user selects Submit.
10. The system redirects the user to Home Dashboard.

**Postcondition:** After valid OTP verification, login succeeds and the user is redirected to Home Dashboard. The supplied successful-login screen shows Home navigation, a welcome heading and Logout. Verify the authenticated destination without hardcoding the screenshot’s customer identity or financial details.

### Terms and Conditions not accepted

**FR-LOG-005 — Mandatory acceptance.** Selecting Proceed without accepting Terms and Conditions shall display an Error modal containing exactly:

> Please agree to the Terms and Conditions to proceed

The modal shall contain an error icon, the title **Error**, the message above, and an **Okay** button.

1. The user enters a validly formatted User ID.
2. The user enters a password.
3. The user leaves the Terms and Conditions checkbox unchecked.
4. The user selects Proceed.
5. The system displays the Error modal with the specified message.

If Terms and Conditions are unchecked and the credentials are also invalid, the system shall display the same Error modal with **“Please agree to the Terms and Conditions to proceed”**. The terms acceptance error shall take precedence over the invalid credentials modal.

Selecting **Okay** shall dismiss the Terms Error modal and reveal the login page. The entered User ID, password, and Terms and Conditions checkbox state shall be retained. Clicking outside the modal or pressing Escape shall not dismiss it.

**Postcondition:** Login does not complete and the user does not reach Home Dashboard. After Okay, the login page retains the entered values and unchecked terms state.

### Invalid credentials

**FR-LOG-010 — Authentication failure.** With a validly formatted User ID and accepted Terms and Conditions, the system shall display the invalid credentials modal over the login page when the credentials are incorrect or the submitted password is empty.

1. The user enters a User ID that meets the character and length rules.
2. The user enters a nonempty password that does not authenticate with that User ID.
3. The user selects the Terms and Conditions checkbox.
4. The user selects Proceed.
5. The system displays the invalid credentials modal.

The modal shall show the heading **“Uh-oh! Looks like the credentials entered are incorrect”**, supporting text **“Please check the entered details and try again.”**, and a **Try Again** button.

Selecting **Try Again** shall dismiss the modal and reveal the login page. Clicking outside the modal shall not dismiss it. Pressing Escape shall not dismiss it. These dismissal rules apply to the invalid credentials modal.

After Try Again dismisses the modal, the entered User ID, password, and Terms and Conditions checkbox state shall be retained.

**Postcondition:** Login does not complete and the user does not reach Home Dashboard. The user returns to the login page with the submitted credentials and terms acceptance retained.

## 4 Recovery navigation and virtual keyboard

### Forgot User ID

**FR-LOG-007 — Open User ID recovery.** Selecting Forgot User ID from the login page shall open the Forgot User ID page. The destination shall show the **Forgot User ID** heading. Recovery processing and validation are outside this specification.

### Forgot Password

**FR-LOG-008 — Open password recovery.** Selecting Forgot Password from the login page shall open the Forgot Password page. The destination shall show the **Forgot Password** heading. Verification and password reset are outside this specification.

### Virtual keyboard

**FR-LOG-009 — Open virtual keyboard.** Clicking the keyboard icon within the Password field shall open the virtual keyboard.

### Acceptance coverage

| Acceptance check | Expected outcome | Traceability |
| --- | --- | --- |
| Valid credentials and accepted terms | OTP verification followed by Home Dashboard redirect | FR-LOG-006 |
| Terms unchecked on submission | Modal shows error icon, Error title, exact terms message, and Okay button | FR-LOG-005 |
| Terms unchecked and credentials invalid | Terms and Conditions Error modal with the same exact terms message | FR-LOG-005 |
| Okay selected on Terms Error modal | Modal dismisses; User ID, password, and checkbox state are retained | FR-LOG-005 |
| Outside click on Terms Error modal | Modal remains open | FR-LOG-005 |
| Escape on Terms Error modal | Modal remains open | FR-LOG-005 |
| Invalid credentials and accepted terms | Invalid credentials modal with specified copy | FR-LOG-010 |
| Try Again selected | Invalid credentials modal dismisses; User ID, password, and terms acceptance are retained | FR-LOG-010 |
| Outside click on invalid credentials modal | Modal remains open | FR-LOG-010 |
| Escape on invalid credentials modal | Modal remains open | FR-LOG-010 |
| Letters-only, digits-only, or mixed User ID of valid length | Passes User ID format validation | FR-LOG-002, FR-LOG-003 |
| User ID differs from the registered value only by letter case, with the correct password and accepted terms | Authentication fails and the invalid credentials modal opens | FR-LOG-002, FR-LOG-010 |
| Nonempty password entered during login | No length, composition, or complexity validation; authentication determines whether it is correct | FR-LOG-004 |
| User ID at 5 and 50 characters | Passes length validation | FR-LOG-003 |
| User ID at 4 and 51 characters, then blur | Shows “Only Alpha numeric values and length 5-50 are allowed” | FR-LOG-003, FR-LOG-011 |
| User ID contains whitespace or special characters, then blur | Shows “Only Alpha numeric values and length 5-50 are allowed” | FR-LOG-002, FR-LOG-011 |
| Focus empty User ID on the prelogin page, then focus Password without entering a value | No User ID validation message | FR-LOG-011 |
| Enter a valid User ID, clear it before leaving the field, then focus Password | No User ID validation message | FR-LOG-011 |
| Enter a nonempty invalid User ID, then focus Password | Shows “Only Alpha numeric values and length 5-50 are allowed” | FR-LOG-011 |
| After the invalid-value message appears, clear User ID and focus Password | Shows “Please enter 5 to 50 character” | FR-LOG-011 |
| Validly formatted User ID, empty password, accepted terms, then click Proceed | Invalid credentials modal appears and login does not complete | FR-LOG-004, FR-LOG-010 |
| Empty User ID or password | Cannot complete login | FR-LOG-004 |
| Credentials empty or invalid, or terms unchecked | Proceed remains enabled | FR-LOG-012 |
| Forgot User ID selected | Forgot User ID page opens | FR-LOG-007 |
| Forgot Password selected | Forgot Password page opens | FR-LOG-008 |
| Password keyboard icon selected | Virtual keyboard opens | FR-LOG-009 |

## 5 OTP verification and invalid-OTP feedback

**FR-LOG-013 — Login OTP page.** The page heading is **Login**. It displays “We've just sent an OTP to your registered mobile number”, an **Enter OTP*** field and **Submit**. Valid OTP completes FR-LOG-006. OTP entry is manual for this POC.

**FR-LOG-014 — OTP input length.** A valid OTP is a six-digit number. The OTP input field allows a maximum of six digits.

**OBS-LOG-001 — Incorrect OTP feedback.** When the user submits an incorrect login OTP, the system displays an Error modal containing an error icon, the title **Error**, the message **Invalid OTP**, and an **Okay** button. This behavior is based on the user's report and supplied UAT screenshot dated 13 November 2026.

The user reports that a related API response also appears in the network tab. The selected POC verifies the visible modal only; HTTP status and response payload are not asserted.

## 6 Selected POC coverage — five case intents

| Intent | Type | Requirement / observation |
| --- | --- | --- |
| Valid credentials, accepted terms and valid manual OTP reach Home Dashboard | Positive | FR-LOG-006, FR-LOG-013 |
| Unchecked terms show the specified terms Error modal | Negative | FR-LOG-005, FR-LOG-012 |
| Nonempty incorrect password shows the invalid credentials modal | Negative | FR-LOG-010 |
| User ID lengths 4, 5, 50 and 51 follow the stated format/blur rules | Boundary | FR-LOG-003, FR-LOG-011 |
| Incorrect OTP displays the specified Error modal | Negative / UI observation | OBS-LOG-001 |

These are coverage intents, not newly allocated test case IDs. When the case set is revised, preserve existing IDs: RIB_LOG_001 for successful login, RIB_LOG_002 for terms and RIB_LOG_003 for incorrect credentials. Existing RIB_LOG_004 (empty password) and RIB_LOG_005 (blur interaction history) remain historical designs; do not silently reuse their IDs for different cases. The old five-case file must be revised before implementation because it contains the superseded no-OTP expectation.

## 7 POC scope boundary

Customer ID login itself, dashboard functions, CAPTCHA and password visibility are outside this selected POC. The Continue-click validation clarification applies to the recovery forms; it does not replace the User ID blur behavior in FR-LOG-011.
