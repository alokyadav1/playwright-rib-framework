Feature: Bandhan Bank Know Your Customer ID

  Scenario: RIB_KCID_001 - Verify required mobile and date of birth messages appear together
    Given The user opens the Bandhan Bank Customer ID form "navigation.kcidPath"
    When The user selects Continue for Customer ID retrieval
    Then The user sees Customer ID required messages together

  Scenario: RIB_KCID_002 - Verify the mobile input accepts up to 17 characters
    Given The user opens the Bandhan Bank Customer ID form "navigation.kcidPath"
    When The user enters the mobile sample from "kcidLookup.mobileSamples.length16"
    Then The user sees the Customer ID mobile value from "kcidLookup.mobileSamples.length16"
    When The user enters the mobile sample from "kcidLookup.mobileSamples.length17"
    Then The user sees the Customer ID mobile value from "kcidLookup.mobileSamples.length17"
    When The user types an additional Customer ID mobile character from "kcidLookup.mobileSamples.eighteenthCharacter"
    Then The user sees the Customer ID mobile value from "kcidLookup.mobileSamples.length17"

  Scenario: RIB_KCID_003 - Verify nonmatching mobile and date of birth show Error modal
    Given The user opens the Bandhan Bank Customer ID form "navigation.kcidPath"
    When The user enters Customer ID lookup details from "kcidLookup.nonmatchingDetails"
    And The user selects Continue for Customer ID retrieval
    Then The user sees the Customer ID Error modal "kcidDetailsMismatchMessage"

  Scenario: RIB_KCID_004 - Verify incorrect OTP shows the specified Error modal
    Given The user opens the Bandhan Bank Customer ID form "navigation.kcidPath"
    When The user enters registered Customer ID lookup details
    And The user selects Continue for Customer ID retrieval
    Then The user sees Customer ID OTP verification
    When The user enters a generated incorrect OTP
    And The user selects OTP Submit
    Then The user sees the Customer ID Error modal "kcidInvalidOtpMessage"

  Scenario: RIB_KCID_005 - Verify valid manual OTP shows Customer ID retrieval confirmation
    Given The user opens the Bandhan Bank Customer ID form "navigation.kcidPath"
    When The user enters registered Customer ID lookup details
    And The user selects Continue for Customer ID retrieval
    Then The user sees Customer ID OTP verification
    When The user enters the received login OTP
    And The script submits the received login OTP
    Then The user sees the Customer ID retrieval success confirmation "kcidSuccessHeading" "kcidSuccessMessage" "kcidContinueToLoginButton"