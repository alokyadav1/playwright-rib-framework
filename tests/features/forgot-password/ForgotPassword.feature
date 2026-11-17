Feature: Bandhan Bank Forgot Password

    Scenario: RIB_FPWD_001 - Empty required fields show all required messages
        Given The user opens Forgot Password from prelogin
        When The user selects Continue for Forgot Password
        Then The user sees Forgot Password required-field messages together
        And The user sees no Forgot Password expiry validation feedback

    Scenario: RIB_FPWD_002 - Entering 17 debit card digits keeps only 16 digits
        Given The user opens Forgot Password from prelogin
        When The user enters the Forgot Password card sample from "fpwdInputs.cardBoundarySamples.length17"
        Then The user sees 16 digits in the Forgot Password card number field

    Scenario: RIB_FPWD_003 - Short ATM PIN shows a length error
        Given The user opens Forgot Password from prelogin
        When The user enters the Customer ID for Forgot Password from "fpwdInputs.shortLengthInputs.customerId"
        And The user enters the Forgot Password card sample from "fpwdInputs.shortLengthInputs.cardNumber"
        And The user selects the earliest available non-expired Forgot Password expiry month
        And The user enters the short ATM PIN for Forgot Password from "fpwdInputs.shortLengthInputs.atmPin"
        And The user selects Continue for Forgot Password
        Then The user sees the Forgot Password ATM PIN length message "fpwdInvalidAtmPinLengthMessage"

    Scenario: RIB_FPWD_004 - Expired card dates are not available for selection
        Given The user opens Forgot Password from prelogin
        When The user opens the Forgot Password expiry year options
        Then The user sees no expired Forgot Password year options
        When The user opens the Forgot Password expiry month options
        Then The user sees no expired Forgot Password month options for current year
