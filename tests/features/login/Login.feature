Feature: Bandhan Bank login

  Scenario: RIB_LOG_002 - Verify unchecked terms show the specified Error modal
    Given The user opens the Bandhan Bank login page
    When The user selects Proceed
    Then The user sees Proceed enabled
    And The user sees the terms Error modal "loginTermsAcceptanceError"
    And The user sees the terms Error icon
    And The user remains on the login page

  Scenario Outline: RIB_LOG_006 - Verify User ID boundary-length blur validation
    Given The user opens the Bandhan Bank login page
    When The user enters the User ID value from "<userIdKey>"
    And The user moves focus to Password
    Then The user sees the User ID format message "<messageKey>" as "<visibility>"

    Examples:
      | userIdKey                            | messageKey                | visibility |
      | userIds.boundarySamples.length4     | loginUserIdFormatMessage | visible    |
      | userIds.boundarySamples.length5     | loginUserIdFormatMessage | hidden     |
      | userIds.boundarySamples.length50    | loginUserIdFormatMessage | hidden     |
      | userIds.boundarySamples.length51    | loginUserIdFormatMessage | visible    |

  Scenario: RIB_LOG_003 - Verify nonempty incorrect password shows invalid credentials modal
    Given The user opens the Bandhan Bank login page
    When The user enters the registered User ID from "credentials.registeredUser"
    And The user enters the nonempty incorrect password from "credentials.incorrectPassword"
    And The user accepts the Terms and Conditions
    And The user selects Proceed
    Then The user sees the invalid credentials modal "loginInvalidCredentialsHeading" and "loginInvalidCredentialsMessage"
    And The user remains on the login page
