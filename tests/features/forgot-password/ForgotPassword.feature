Feature: Bandhan Bank Forgot Password

    Scenario: RIB_FPWD_001 - Verify required-field messages appear together
        Given The user opens the Bandhan Bank Forgot Password Debit Card verification form "navigation.fpwdPath"
        When The user selects Continue for Forgot Password
        Then The user sees Forgot Password required-field messages together
        And The user sees no Forgot Password expiry validation feedback

    Scenario: RIB_FPWD_002 - Verify card number input is capped at 16 digits
        Given The user opens the Bandhan Bank Forgot Password Debit Card verification form "navigation.fpwdPath"
        When The user enters the Forgot Password card sample from "fpwdInputs.cardBoundarySamples.length15"
        Then The user sees the Forgot Password card number value from "fpwdInputs.cardBoundarySamples.length15"
        When The user enters the Forgot Password card sample from "fpwdInputs.cardBoundarySamples.length16"
        Then The user sees the Forgot Password card number value from "fpwdInputs.cardBoundarySamples.length16"
        When The user types the final Forgot Password card digit from "fpwdInputs.cardBoundarySamples.length17"
        Then The user sees the Forgot Password card number value from "fpwdInputs.cardBoundarySamples.length16"
        When The user pastes the overlength Forgot Password card sample from "fuidInputs.cardBoundarySamples.length18"
        Then The user sees the Forgot Password card number value from "fpwdInputs.cardBoundarySamples.length16"

    Scenario: RIB_FPWD_003 - Verify short ATM PIN shows the specified length message
        Given The user opens the Bandhan Bank Forgot Password Debit Card verification form "navigation.fpwdPath"
        When The user enters the Customer ID for Forgot Password from "fpwdInputs.shortLengthInputs.customerId"
        And The user enters the Forgot Password card sample from "fpwdInputs.shortLengthInputs.cardNumber"
        And The user selects the earliest available non-expired Forgot Password expiry month
        And The user enters the short ATM PIN for Forgot Password from "fpwdInputs.shortLengthInputs.atmPin"
        And The user selects Continue for Forgot Password
        Then The user sees the Forgot Password ATM PIN length message "fpwdInvalidAtmPinLengthMessage"

    Scenario: RIB_FPWD_004 - Verify expired expiry choices cannot be selected
        Given The user opens the Bandhan Bank Forgot Password Debit Card verification form "navigation.fpwdPath"
        When The user opens the Forgot Password expiry year options
        Then The user sees no expired Forgot Password year options
        When The user opens the Forgot Password expiry month options
        Then The user sees no expired Forgot Password month options for current year
