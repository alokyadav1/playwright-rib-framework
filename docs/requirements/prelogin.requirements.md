# Requirements register: Bandhan Bank prelogin

- Source: [Bandhan Bank Login FSD](../fsd/Bandhan_Bank_Login_FSD.md), version 1.6, 12 November 2026.
- Scope: UI behavior for the five active prelogin cases.

| ID | Source and section | Atomic behavior | Type | Disposition |
|---|---|---|---|---|
| FR-LOG-001 | FSD §2, Login presentation | Provide the specified login controls and allow the User ID method. | UI | Testable; designed in BND_LOG_001. |
| FR-LOG-002 | FSD §2, Allowed characters | Accept alphanumeric User IDs; reject whitespace and special characters; authenticate case-sensitively. | Validation | Partly covered by BND_LOG_001 and BND_LOG_003. Invalid character classes are not covered by the active set. |
| FR-LOG-003 | FSD §2, User ID length | Accept User IDs from 5 through 50 characters inclusive; reject values outside that range. | Validation | Partly covered by valid-format login in BND_LOG_001. Boundaries are not covered by the active set. |
| FR-LOG-004 | FSD §2, Required credentials | Require User ID and password for successful login; evaluate empty password on Proceed when terms are accepted. | Validation | Designed in BND_LOG_001 and BND_LOG_004. Empty or invalid User ID rejection is not independently covered by the active set. |
| FR-LOG-005 | FSD §3, Terms and Conditions not accepted | Show the specified Terms Error modal, give terms precedence, preserve the User ID and unchecked terms state, and show the password masked after Okay. | UI | Implemented and verified in BND_LOG_002. |
| FR-LOG-006 | FSD §3, Successful login | Authenticate valid credentials with accepted terms and redirect to Home Dashboard without OTP. | Functional | Partly testable; BND_LOG_001 is designed, but final destination verification is blocked by dashboard access. |
| FR-LOG-007 | FSD §4, Forgot User ID | Open the Forgot User ID page and show its specified heading. | Navigation | Testable; not covered by the active five-case selection. |
| FR-LOG-008 | FSD §4, Forgot Password | Open the Forgot Password page and show its specified heading. | Navigation | Testable; not covered by the active five-case selection. |
| FR-LOG-009 | FSD §4, Virtual keyboard | Open the virtual keyboard from the Password field. | UI | Testable; not covered by the active five-case selection. |
| FR-LOG-010 | FSD §3, Invalid credentials | Show and dismiss the specified invalid credentials modal for incorrect credentials or an empty password, preserving the User ID and terms state while masking the password. | Functional | Designed in BND_LOG_003 and BND_LOG_004. |
| FR-LOG-011 | FSD §2, User ID validation behavior | Show the specified feedback for the ordered User ID focus, entry, clear, and blur sequences. | Validation | Not covered by the active set; BND_LOG_005 is deprecated. |
| FR-LOG-012 | FSD §2, Proceed availability | Keep Proceed enabled for empty or invalid inputs and unchecked terms. | UI | Partly covered by BND_LOG_002; invalid User ID state is not covered by the active set. |
| FR-LOG-013 | FSD §2, Password masking and refocus clearing | Mask a nonempty password on blur and clear the field on subsequent focus throughout prelogin flows. | Security / UI | Implemented and verified in BND_LOG_002 and BND_LOG_006. |

## Gaps and decisions

- The user chose to keep five active cases and replace BND_LOG_005. BND_LOG_005 remains in the test-case file as deprecated; BND_LOG_006 covers FR-LOG-013.
- No exact password mask glyph or count is specified. The assertion checks that the field is a nonempty password-type input, without reading or reporting its value.
- Home Dashboard access is required to verify the final redirect in FR-LOG-006.
