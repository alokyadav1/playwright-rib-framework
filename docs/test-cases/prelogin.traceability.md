# Traceability: Bandhan Bank prelogin

- Source: [Bandhan Bank Login FSD](../fsd/Bandhan_Bank_Login_FSD.md), version 1.6, 12 November 2026.
- Active cases: BND_LOG_001, BND_LOG_002, BND_LOG_003, BND_LOG_004, BND_LOG_006.
- Deprecated case: BND_LOG_005, retained for traceability and replaced by BND_LOG_006 per user decision.

| Requirement | Active case(s) | Expected outcome | State |
|---|---|---|---|
| FR-LOG-001 | BND_LOG_001 | User ID method is available and selected. | Designed |
| FR-LOG-002 | BND_LOG_001, BND_LOG_003 | Valid User ID supports login; case-only mismatch is rejected. Invalid character classes are not covered by the active set. | Designed |
| FR-LOG-003 | BND_LOG_001 | Registered User ID meets format rules. Length boundaries are not covered by the active set. | Designed |
| FR-LOG-004 | BND_LOG_001, BND_LOG_004 | Required credentials are used; empty password is rejected on Proceed. | Designed |
| FR-LOG-005 | BND_LOG_002 | Terms Error modal takes precedence, resists outside/Escape dismissal, and Okay returns to login with User ID and unchecked terms retained. Password is masked while unfocused. | Verified |
| FR-LOG-006 | BND_LOG_001 | Successful login redirects to Home Dashboard without OTP. | Partly blocked: dashboard access unavailable |
| FR-LOG-007 | None | Forgot User ID page opens with the specified heading. | Not covered by active selection |
| FR-LOG-008 | None | Forgot Password page opens with the specified heading. | Not covered by active selection |
| FR-LOG-009 | None | Virtual keyboard opens from the Password field. | Not covered by active selection |
| FR-LOG-010 | BND_LOG_003, BND_LOG_004 | Incorrect credentials and empty password produce the specified modal. | Designed |
| FR-LOG-011 | None | Ordered User ID blur-feedback sequences produce specified messages. | Not covered; BND_LOG_005 deprecated |
| FR-LOG-012 | BND_LOG_002 | Proceed remains enabled when terms are unchecked. | Implemented |
| FR-LOG-013 | BND_LOG_002, BND_LOG_006 | Password is masked after blur; subsequent focus clears the field. | Both cases verified |

## Outcome-to-assertion map

| Case / requirement / outcome | Scenario assertion | Binding | Verification | State |
|---|---|---|---|---|
| BND_LOG_002 / FR-LOG-005 / password shown masked after Okay | `The user sees the password field is masked` | `tests/steps/login.steps.ts` | `LoginVerifications.passwordIsMasked()` | Verified |
| BND_LOG_002 / FR-LOG-013 / password cleared after refocus | `The user sees the password field is empty` | `tests/steps/login.steps.ts` | `LoginVerifications.passwordIsCleared()` | Verified |
| BND_LOG_002 / FR-LOG-005 / User ID retained | `The user sees the registered User ID retained for "credentials.registeredUser"` | `tests/steps/login.steps.ts` | `LoginVerifications.retainsUserId()` | Verified |
| BND_LOG_006 / FR-LOG-013 / password shown masked after blur | `The user sees the password field is masked` | `tests/steps/login.steps.ts` | `LoginVerifications.passwordIsMasked()` | Verified |
| BND_LOG_006 / FR-LOG-013 / password cleared on refocus | `The user sees the password field is empty` | `tests/steps/login.steps.ts` | `LoginVerifications.passwordIsCleared()` | Verified |

Other approved case outcomes remain designed but are not automated in this implementation scope.
