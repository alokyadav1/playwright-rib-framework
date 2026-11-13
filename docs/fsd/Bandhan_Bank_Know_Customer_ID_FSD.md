# Bandhan Bank — Know Your Customer ID Functional Specification

Version 1.1 | 12 November 2026 | Status: Draft for functional review

## Document basis and execution context

Sources: user-supplied prelogin/functionality screenshots and direct behavior confirmations through 12 November 2026. This is a focused POC FSD based on the supplied evidence, not a claim of complete bank requirements or independently executed verification. Environment: `TEST_ENV=uat`, `BANK=demo`, `LOCALE=en-in`. Use the supplied UAT portal; the page query below is recorded from its screenshot, not a new endpoint assumption.

Input limits and messages retain the user's exact wording. This FSD contains confirmed behavior and selected POC coverage. Test case intents below are not detailed cases, approval records or automation. No fixtures, bindings, selectors or code are generated. Sensitive values remain in authorized local/encrypted sources.

## 1 Scope, entry and form

**FR-KCID-001 — Entry.** On prelogin, the user selects the **Customer ID** radio option, then selects **Know your Customer ID**. The destination heading is **Know your Customer ID** (`?page=know-your-customer`). The selected flow uses **Date of Birth** verification; PAN verification is visible but outside this POC's selected path.

The form shows a mobile country-code selector (the supplied screen shows +91 India), mobile input, Date of Birth/PAN verification options, a date input with DD/MM/YYYY placeholder and Continue.

## 2 Input rules and nonmatching details

**FR-KCID-002 — Required fields.** Mobile number and date of birth are required for the selected flow.

Required-field validation occurs when the user selects **Continue**. Applicable messages appear together, directly below their corresponding input fields. This does not establish other undocumented blur or live-validation behavior.

| Field / state | Exact inline message |
| --- | --- |
| Empty mobile number | Please provide your Mobile number to proceed |
| Empty date of birth | Please provide your Date of birth to proceed |

**FR-KCID-003 — Mobile input behavior.** The mobile input accepts any character and has a maximum of **17 characters**. Input exceeding 17 characters is blocked. This is the supplied input behavior, not a claim that all character sequences are valid registered numbers. Do not invent digits-only filtering or a ten-digit limit.

**FR-KCID-004 — Invalid or nonmatching details.** On Continue, invalid mobile/DOB details or details not matching the mobile number display an Error modal with an error icon, title **Error**, exact message **Details do not match with entered mobile number.**, and **Okay** button. For the POC, a validly formatted nonmatching DOB/mobile combination can exercise this result without needing to specify impossible-date entry mechanics.

## 3 OTP and retrieval

**FR-KCID-005 — Matching details.** Matching registered mobile number and DOB advance to the OTP page (`?page=otp-verification-prelogin`). OTP is entered manually in this POC.

**FR-KCID-006 — Invalid OTP.** Incorrect OTP displays an Error modal with title **Error**, exact message **Please Enter Valid One Time Password**, an error icon and **Okay** button. Do not reuse the silent-OTP behavior reported for Login or Unlock.

**FR-KCID-007 — Successful retrieval.** Valid OTP displays a success modal with a green success icon, heading:

> You have successfully retrieved your Customer ID!

Supporting text:

> Your Customer ID has been sent to your registered mobile number and email ID.

The modal provides **Continue to Login**. This specification verifies the displayed confirmation only. Actual SMS/email delivery needs separate evidence and is outside selected coverage.

## 4 Selected POC coverage — five case intents

| Intent | Type | Traceability |
| --- | --- | --- |
| Empty mobile and DOB show both inline messages together on Continue | Negative | FR-KCID-002 |
| Input at 16/17 characters and attempted 18th character respects the cap, including nonnumeric input | Boundary | FR-KCID-003 |
| Nonmatching mobile/DOB details show the specified Error modal | Negative | FR-KCID-004 |
| Matching details followed by incorrect OTP show the specified OTP Error modal | Negative | FR-KCID-005, FR-KCID-006 |
| Matching details followed by valid manual OTP show retrieval success confirmation | Positive | FR-KCID-005, FR-KCID-007 |
