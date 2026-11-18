Feature: Bandhan Bank unlock online banking access

  Scenario: RIB_UNL_001 - Invalid PAN shows an error below the PAN field
    Given The user opens Unlock Access from prelogin
    When The user enters personal details from "unlockAccess.invalidPanCase"
    And The user selects Continue for unlock access
    Then The user sees invalid PAN feedback "unlockInvalidPanMessage" below PAN

  @manual-otp
  Scenario: RIB_UNL_002 - Incorrect personal details show an error after a correct OTP
    Given The user opens Unlock Access from prelogin
    When The user enters personal details from "unlockAccess.incorrectPersonalDetails"
    And The user selects Continue for unlock access
    Then The user sees unlock OTP verification
    When The user enters the received OTP
    And The user submits the OTP
    Then The user sees unlock fetch Error modal "unlockFetchErrorMessage"

  Scenario: RIB_UNL_003 - Incorrect OTP shows an error
    Given The user opens Unlock Access from prelogin
    When The user enters personal details from "unlockAccess.incorrectOtpCase"
    And The user selects Continue for unlock access
    Then The user sees unlock OTP verification
    When The user enters a generated incorrect OTP
    And The user submits the OTP
    Then The user sees the invalid OTP Error modal "loginErrorModalTitle" "loginInvalidOtpMessage" "loginOkayButton"

  @manual-otp
  Scenario: RIB_UNL_004 - User with active online banking sees an information message
    Given The user opens Unlock Access from prelogin
    When The user enters personal details from "unlockAccess.alreadyUnlockedUser"
    And The user selects Continue for unlock access
    Then The user sees unlock OTP verification
    When The user enters the received OTP
    And The user submits the OTP
    Then The user sees the already-unlocked information modal "unlockAlreadyUnlockedMessage"
