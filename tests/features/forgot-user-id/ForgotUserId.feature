Feature: Bandhan Bank Forgot User ID

    Scenario: RIB_FUID_001 - Verify required-field messages appear together
        Given The user opens the Bandhan Bank Forgot User ID Debit Card form "navigation.fuidPath"
        When The user selects Continue for Forgot User ID
        Then The user sees Forgot User ID required-field messages together

    Scenario: RIB_FUID_002 - Verify card number input is capped at 16 digits
        Given The user opens the Bandhan Bank Forgot User ID Debit Card form "navigation.fuidPath"
        When The user enters the card sample from "fuidInputs.cardBoundarySamples.length15"
        Then The user sees the Forgot User ID card number value from "fuidInputs.cardBoundarySamples.length15"
        When The user enters the card sample from "fuidInputs.cardBoundarySamples.length16"
        Then The user sees the Forgot User ID card number value from "fuidInputs.cardBoundarySamples.length16"
        When The user enters the card sample from "fuidInputs.cardBoundarySamples.length17"
        Then The user sees the Forgot User ID card number value from "fuidInputs.cardBoundarySamples.length17"
        When The user pastes the card sample from "fuidInputs.cardBoundarySamples.length18"
        Then The user sees the Forgot User ID card number value from "fuidInputs.cardBoundarySamples.length18"

    Scenario: RIB_FUID_003 - Verify short ATM PIN shows the specified length message
        Given The user opens the Bandhan Bank Forgot User ID Debit Card form "navigation.fuidPath"
        When The user enters the Customer ID from "credentials.registeredUser.customerId"
        And The user enters the card sample from "fuidInputs.cardBoundarySamples.length16"
        And The user selects the earliest available non-expired expiry month
        And The user enters the short ATM PIN from "fuidInputs.shortLengthInputs.atmValue"
        And The user selects Continue for Forgot User ID
        Then The user sees the Forgot User ID ATM PIN length message "fuidInvalidAtmPinLengthMessage"

    Scenario: RIB_FUID_004 - Verify expired expiry dates cannot be selected
        Given The user opens the Bandhan Bank Forgot User ID Debit Card form "navigation.fuidPath"
        When The user opens the Forgot User ID expiry year options
        Then The user sees no expired Forgot User ID year options
        When The user opens the Forgot User ID expiry month options
        Then The user sees no expired Forgot User ID month options for the current year

    Scenario: RIB_FUID_005 - Verify an unassociated debit card shows the specified Error modal after OTP
        Given The user opens the Bandhan Bank Forgot User ID Debit Card form "navigation.fuidPath"
        When The user enters the Customer ID from "fuidInputs.unassociatedCardProfile.customerId"
        And The user enters the card sample from "fuidInputs.unassociatedCardProfile.cardNumber"
        And The user selects the expiry from "fuidInputs.unassociatedCardProfile"
        And The user enters the ATM PIN from "fuidInputs.unassociatedCardProfile.atmPin"
        And The user selects Continue for Forgot User ID
        Then The user sees Forgot User ID OTP verification
        When The user enters the received OTP
        And The user submits the OTP
        Then The user sees the Forgot User ID Error modal "fuidIncorrectDebitCardMessage"
