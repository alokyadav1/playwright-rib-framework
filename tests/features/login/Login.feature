Feature: Bandhan Bank login


  Scenario: RIB_LOG_001 - Correct login details and OTP open the Home Dashboard
    Given The user opens the Bandhan Bank login page
    When The user enters the registered User ID from "credentials.registeredUser"
    And The user enters the registered password from "credentials.registeredUser"
    And The user accepts the Terms and Conditions
    And The user selects Proceed
    Then The user sees the login OTP page
    When The user enters the received OTP
    And The user submits the OTP
    Then The user sees Home Dashboard

  Scenario: RIB_LOG_002 - Continuing without accepting the terms shows an error
    Given The user opens the Bandhan Bank login page
    When The user selects Proceed
    Then The user sees Proceed enabled
    And The user sees the terms Error modal "loginTermsAcceptanceError"
    And The user sees the terms Error icon
    And The user remains on the login page

  Scenario: RIB_LOG_003 - Incorrect password shows an invalid login details error
    Given The user opens the Bandhan Bank login page
    When The user enters the registered User ID from "credentials.registeredUser"
    And The user enters the nonempty incorrect password from "credentials.incorrectPassword"
    And The user accepts the Terms and Conditions
    And The user selects Proceed
    Then The user sees the invalid credentials modal "loginInvalidCredentialsHeading" and "loginInvalidCredentialsMessage"
    And The user remains on the login page

  Scenario Outline: RIB_LOG_006 - User ID length message appears outside the 5 to 50 character limit
    Given The user opens the Bandhan Bank login page
    When The user enters the User ID value from "<userIdKey>"
    And The user moves focus to Password
    Then The user sees the User ID format message "<messageKey>" as "<visibility>"

    Examples:
      | userIdKey                               | messageKey               | visibility |
      | boundaryInputs.boundarySamples.length4  | loginUserIdFormatMessage | visible    |
      | boundaryInputs.boundarySamples.length5  | loginUserIdFormatMessage | hidden     |
      | boundaryInputs.boundarySamples.length50 | loginUserIdFormatMessage | hidden     |
      | boundaryInputs.boundarySamples.length51 | loginUserIdFormatMessage | visible    |

  Scenario: RIB_LOG_007 - Incorrect OTP shows an error
    Given The user opens the Bandhan Bank login page
    When The user enters the registered User ID from "credentials.registeredUser"
    And The user enters the registered password from "credentials.registeredUser"
    And The user accepts the Terms and Conditions
    And The user selects Proceed
    Then The user sees the login OTP page
    When The user enters a generated incorrect OTP
    And The user submits the OTP
    Then The user sees the invalid OTP Error modal "loginErrorModalTitle" "loginInvalidOtpMessage" "loginOkayButton"
