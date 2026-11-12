# Banking implementation rules

Use the supplied FSD for ordinary UI expectations. For selected compliance-specific cases, use a supplied or verified applicable source and resolve its interpretation. Missing future compliance metadata does not block unrelated FSD-driven UI work.

## Intake and requirements

Record bank category, channel, customer/account segment, release date, FSD revision, control-register revision, enabled features/rails and test environment. Identify view-only and transaction-enabled roles from the actual product. Route conflicting sources or unknown applicability to the bank's owner. Preserve all original checkpoints, no-invention rules, case IDs, outcome mapping, evidence and repair safeguards.

Keep regulation, scheme rules, bank policy and optional features distinct. Store limits, cooling/activation windows, timeouts, failed-attempt thresholds, challenge choices, fees, holidays and status mappings as approved policy inputs. Each compliance case records its control source, provision, applicable version and expected evidence. Infrastructure, audit, fraud-engine and operational requirements need their own evidence owner and disposition.

## Runtime and readiness

Use `TEST_ENV`, `BANK` and `LOCALE`. The runtime defaults are `dev/demo/en-in`, while `.env.example` sets `TEST_ENV=uat` for the current setup. Configure the supplied UAT portal as `BASE_URL` or `baseURL` in `src/config/environments/uat.json`. An API endpoint is optional and remains unset until needed. Never guess an API base URL from the portal URL.

Keep `src/config/banks/<bank>.json` minimal, with mutation permissions and an empty `policies` object. The portal URL configures Playwright baseURL. Module ownership remains in the page, locator, verification and step files. There is no banking service or duplicate module/rail registry.

Bank category, revision, approval references, dates and detailed policies are future optional settings. Their absence must not block ordinary FSD-driven UI cases. When an approved case needs a policy value, supply and verify that specific value. If a case claims regulatory coverage, first resolve the applicable source and interpretation for that case. Unknown compliance inputs block the affected assertion rather than all UI work.

Playwright creates a fresh browser context for each test. To reuse a provisioned session, set AUTH_STATE to the owner-provided file path. Leave it unset for fresh login and session cases. Reused state cannot prove login or challenge behavior. Verify the state is usable without reading token values.

Review the data paths, labels, locators and any expected policy values actually consumed by the selected cases. getByKey/getLabel reject missing or pending values. Exact translation assertions require approved locale-specific text. Verify native/custom UI controls and frames against the portal. Create additional modules only from approved cases.

## Authentication and sensitive data

Keep passwords, PINs, customer/account identifiers, tokens and personal data encrypted or in an approved local secret source. `secret:check` catches configured sensitive key names in data JSON. It cannot prove that every arbitrary field name or document is free of sensitive data. Never store a reusable OTP as ordinary fixture data or send credentials through CLI arguments. Implement an approved challenge adapter only after its test-system contract is provided. Do not solve production CAPTCHA, disable MFA or replace transaction authorization with a fake success.

Trace, screenshot and video capture default to off. Raw reports, browser state and downloads remain local, ignored and potentially sensitive. Obtain the bank's approval before enabling richer artifacts and follow its retention and access policy. Record masked identifiers and sanitized evidence. Do not query real customer records to generate test data.

## Transactions and isolation

Keep ordinary cases within their approved actions. Guard beneficiary addition and transfer submission with the corresponding mutation switch in the bank settings. Record data ownership, initial state, cleanup and reconciliation for cases that change bank state. One worker and zero retries are the baseline. The guard covers supplied actions. Review each new committing action and guard it at the owning page as part of implementation.

Use exact decimal strings for amounts and integer paise for calculations. `rupeesToPaise` in `src/utils/utils.ts` supports signed plain INR decimals, including invalid-business-value negative tests, without floating-point rounding. Currency formatting, available/ledger balance distinctions, fees, tax and expected debit/credit values come from the approved case. Never infer them from a toast.

Verify the reviewed source account, beneficiary identity, rail, amount and currency. After submission correlate reference and status with an approved read-only evidence source. Pending, failed, rejected, reversed and completed states retain their actual approved meanings. A reference's presence alone does not prove settlement or absence of a duplicate debit. Failed/timed-out submission has an uncertain financial effect until reconciled. Do not auto-retry, resume at the submit step, or invent a compensating reverse transfer. Intentional duplicate-submission tests require their own approved case and resolution plan.

Each mutating case owns its sandbox users, accounts and beneficiary state. Define initial balances, holds/limits, setup, cleanup/reset and reconciliation. Cleanup is an authorized business operation with an observable outcome. A separate browser context alone does not isolate server-side financial state.

## Ownership and verification

| Module | Owns |
|---|---|
| Login | Credential entry and challenge interaction |
| Session | Logout, expiry and session state assertions |
| Accounts | Account identity, balances and account state |
| Beneficiaries | Payee details, name lookup and payee lifecycle |
| Transfers | Rail selection, review, authorization/submission and transfer UI result |
| Statements | Statement request, download and approved contents checks |
| Optional modules | Cards, Deposits, Loans, Profile, ServiceRequests, Complaints or other features only when required by approved cases |

Keep prerequisites in their owning files even when a transfer scenario uses them. Verification methods assert only the named outcome. A filename check does not verify statement contents. A visible marker does not prove server-side access control. Add the authorized oracle when the approved outcome requires it, or report that outcome blocked.

The included FrameworkPage and FW_001 prove runner plumbing only. They do not certify banking or regulatory compliance. Collect exact title IDs, review the outcome-to-assertion map and report verified/failed/blocked cases separately. Test the authoring flow in each supported IDE's coding mode.
