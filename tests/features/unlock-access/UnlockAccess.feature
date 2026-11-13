Feature: Bandhan Bank unlock online banking access

  Scenario: RIB_UNL_001 - Verify invalid PAN shows exact inline feedback
    Given The user opens the Bandhan Bank unlock access form "navigation.unlockAccessPath"
    When The user enters personal details from "unlockAccess.invalidPanCase"
    And The user selects Continue for unlock access
    Then The user sees invalid PAN feedback "unlockInvalidPanMessage" below PAN

  Scenario: RIB_UNL_002 - Verify incorrect personal details show Error after valid OTP
    Given The user opens the Bandhan Bank unlock access form "navigation.unlockAccessPath"
    When The user enters personal details from "unlockAccess.incorrectPersonalDetails"
    And The user selects Continue for unlock access
    Then The user sees unlock OTP verification
    When The user enters the received unlock OTP
    And The script submits the received unlock OTP
    Then The user sees unlock fetch Error modal "unlockFetchErrorMessage"

  Scenario: RIB_UNL_003 - Verify invalid OTP shows the Error modal
    Given The user opens the Bandhan Bank unlock access form "navigation.unlockAccessPath"
    When The user enters personal details from "unlockAccess.incorrectOtpCase"
    And The user selects Continue for unlock access
    Then The user sees unlock OTP verification
    When The user enters a generated six-digit unlock OTP
    And The user submits the generated unlock OTP
    Then The user sees the invalid OTP Error modal "loginErrorModalTitle" "loginInvalidOtpMessage" "loginOkayButton"

  Scenario: RIB_UNL_004 - Verify already-unlocked user sees the information modal
    Given The user opens the Bandhan Bank unlock access form "navigation.unlockAccessPath"
    When The user enters personal details from "unlockAccess.alreadyUnlockedUser"
    And The user selects Continue for unlock access
    Then The user sees unlock OTP verification
    When The user enters the received unlock OTP
    And The script submits the received unlock OTP
    Then The user sees the already-unlocked information modal "unlockAlreadyUnlockedMessage"
