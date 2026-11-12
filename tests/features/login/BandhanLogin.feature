@prelogin
Feature: Bandhan Bank login

  Scenario: BND_LOG_002 - Verify Terms and Conditions are required before login
    Given The user opens the Bandhan Bank login page
    Then The user sees the Terms and Conditions checkbox unchecked
    And The user sees the Proceed button enabled
    When The user enters the registered User ID "credentials.registeredUser"
    And The user enters the password "credentials.incorrectPassword"
    And The user selects Proceed
    Then The user sees the Terms Error modal "loginErrorModalTitle" with message "loginTermsAcceptanceError"
    And The user sees the error icon in the Terms Error modal
    And The user sees the Okay button in the Terms Error modal "loginOkayButton"
    When The user clicks outside the Terms Error modal
    Then The user sees the Terms Error modal remains open
    When The user presses Escape while the Terms Error modal is open
    Then The user sees the Terms Error modal remains open
    When The user selects Okay in the Terms Error modal "loginOkayButton"
    Then The user sees the login page after the Terms Error modal closes
    And The user sees the password field is masked
    When The user focuses the password field
    Then The user sees the password field is empty
    And The user sees the registered User ID retained for "credentials.registeredUser"
    And The user sees Terms and Conditions remain unchecked

  Scenario: BND_LOG_006 - Verify the password is masked on blur and cleared on focus
    Given The user opens the Bandhan Bank login page
    When The user enters the password "credentials.incorrectPassword"
    And The user focuses the User ID field
    Then The user sees the password field is masked
    When The user focuses the password field
    Then The user sees the password field is empty
