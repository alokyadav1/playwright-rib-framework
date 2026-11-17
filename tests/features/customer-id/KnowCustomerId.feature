Feature: Bandhan Bank Know Your Customer ID

  Scenario: RIB_KCID_001 - Empty mobile number and date of birth show required messages
    Given The user opens Know Your Customer ID from prelogin
    When The user selects Continue for Customer ID retrieval
    Then The user sees Customer ID required messages together

  Scenario: RIB_KCID_002 - Mobile number accepts no more than 17 characters
    Given The user opens Know Your Customer ID from prelogin
    When The user enters the mobile sample from "kcidLookup.mobileSamples.length16"
    Then The user sees the Customer ID mobile value from "kcidLookup.mobileSamples.length16"
    When The user enters the mobile sample from "kcidLookup.mobileSamples.length17"
    Then The user sees the Customer ID mobile value from "kcidLookup.mobileSamples.length17"
    When The user types an additional Customer ID mobile character from "kcidLookup.mobileSamples.eighteenthCharacter"
    Then The user sees the Customer ID mobile value from "kcidLookup.mobileSamples.length17"

  Scenario: RIB_KCID_003 - Unmatched mobile number and date of birth show an error
    Given The user opens Know Your Customer ID from prelogin
    When The user enters Customer ID lookup details from "kcidLookup.nonmatchingDetails"
    And The user selects Continue for Customer ID retrieval
    Then The user sees the Customer ID Error modal "kcidDetailsMismatchMessage"

  Scenario: RIB_KCID_004 - Incorrect OTP shows an error
    Given The user opens Know Your Customer ID from prelogin
    When The user enters registered Customer ID lookup details
    And The user selects Continue for Customer ID retrieval
    Then The user sees Customer ID OTP verification
    When The user enters a generated incorrect OTP
    And The user submits the OTP
    Then The user sees the Customer ID Error modal "kcidInvalidOtpMessage"

  Scenario: RIB_KCID_005 - Correct OTP confirms Customer ID retrieval
    Given The user opens Know Your Customer ID from prelogin
    When The user enters registered Customer ID lookup details
    And The user selects Continue for Customer ID retrieval
    Then The user sees Customer ID OTP verification
    When The user enters the received OTP
    And The user submits the OTP
    Then The user sees the Customer ID retrieval success confirmation "kcidSuccessHeading" "kcidSuccessMessage" "kcidContinueToLoginButton"
