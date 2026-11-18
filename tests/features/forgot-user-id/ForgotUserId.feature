Feature: Bandhan Bank Forgot User ID

    Scenario: RIB_FUID_001 - Empty required fields show all required messages
        Given The user opens Forgot User ID from prelogin
        When The user selects Continue for Forgot User ID
        Then The user sees Forgot User ID required-field messages together

    Scenario: RIB_FUID_002 - Entering 17 debit card digits keeps only 16 digits
        Given The user opens Forgot User ID from prelogin
        When The user enters the card sample from "fuidInputs.cardBoundarySamples.length17"
        Then The user sees 16 digits in the Forgot User ID card number field

    Scenario: RIB_FUID_003 - Short ATM PIN shows a length error
        Given The user opens Forgot User ID from prelogin
        When The user enters the Customer ID from "credentials.registeredUser.customerId"
        And The user enters the card sample from "fuidInputs.cardBoundarySamples.length16"
        And The user selects the earliest available non-expired expiry month
        And The user enters the short ATM PIN from "fuidInputs.shortLengthInputs.atmValue"
        And The user selects Continue for Forgot User ID
        Then The user sees the Forgot User ID ATM PIN length message "fuidInvalidAtmPinLengthMessage"

    # Scenario: RIB_FUID_004 - Expired card dates are not available for selection
    #     Given The user opens Forgot User ID from prelogin
    #     When The user opens the Forgot User ID expiry year options
    #     Then The user sees no expired Forgot User ID year options
    #     When The user opens the Forgot User ID expiry month options
    #     Then The user sees no expired Forgot User ID month options for the current year

    @manual-otp
    Scenario: RIB_FUID_005 - Debit card not linked to the customer shows an error after OTP
        Given The user opens Forgot User ID from prelogin
        When The user enters the Customer ID from "fuidInputs.unassociatedCardProfile.customerId"
        And The user enters the card sample from "fuidInputs.unassociatedCardProfile.cardNumber"
        And The user selects the expiry from "fuidInputs.unassociatedCardProfile"
        And The user enters the ATM PIN from "fuidInputs.unassociatedCardProfile.atmPin"
        And The user selects Continue for Forgot User ID
        Then The user sees Forgot User ID OTP verification
        When The user enters the received OTP
        And The user submits the OTP
        Then The user sees the Forgot User ID Error modal "fuidIncorrectDebitCardMessage"

    Scenario: RIB_FUID_006 - Expiry options follow the selected year
        Given The user opens Forgot User ID from prelogin
        When The user opens the Forgot User ID expiry year options
        Then The user sees expiry years from the current year through the next 10 years
        When The user selects the current expiry year from the open options
        And The user opens the Forgot User ID expiry month options
        Then The user sees expiry months from the current month through December
        When The user opens the Forgot User ID expiry year options
        And The user selects the earliest future expiry year from the open options
        And The user opens the Forgot User ID expiry month options
        Then The user sees all 12 expiry months
