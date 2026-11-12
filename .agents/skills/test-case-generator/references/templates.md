# RIB requirements, cases and traceability templates

These examples show structure and require the actual approved sources before implementation.

## Requirements register

| ID | Parent ID | Source and revision | Atomic behavior | Type | Applicability / effective date | Disposition |
|---|---|---|---|---|---|---|
| RIB-ACC-01 | none | Supplied account FSD section | The customer can view an owned account | Functional | Confirm customer segment | UI, pending approval |
| RIB-CONTROL-01 | none | Approved control register provision | Approved control interpretation | Security/compliance | Bank category, decision owner and date required | UI / integration / audit / blocked |

Record ambiguous limits, UI copy, permissions and missing evidence separately. Stable child IDs split compound requirements. Never infer a bank policy from a feature available at another bank.

## Test case

### RIB_ACC_001 - Verify the customer can view an owned account

- **Test Case ID** — RIB_ACC_001
- **Title** — Verify the customer can view an owned account
- **Requirement(s)** — RIB-ACC-01, linked to the supplied source
- **Short description** — A provisioned retail customer views the approved account summary.
- **Context** — Confirm env/bank/locale, policy revision, customer segment and account type.
- **Preconditions** — An authorized test account, owned sandbox bank account, approved balance baseline and usable test session exist.
- **Data required** — `navigation.accountsPath`, `accounts.source` with maskedNumber and expectedBalanceText. Account identifiers are locally provisioned and encrypted.
- **Steps**
  1. Open the account summary.
- **Expected result**
  1. The exact owned account is shown. [RIB-ACC-01]
  2. The account's approved expected balance is shown with its specified balance type and currency. [RIB-ACC-01]
- **Open items** — NEEDS INPUT for the real FSD, bank policy, expected baseline, selectors, sandbox endpoints and session arrangement.
- **Execution safety** — Read-only account checks, with the intended fresh or reused session recorded.

The examples are not approved business requirements. Write the final fields from the bank's actual FSD and approved control register.

## Mutation-specific additions

For a transfer or beneficiary mutation, record the state changes and supported rail, authentication/authorization stages, committing action, account/data owner, isolated initial state, fees/tax expectations, correlation identity, expected financial states, reconciliation evidence source and resolution plan. Keep unavailable expected outcomes blocked. Do not assume a confirmation page proves settlement.

## Traceability and outcome map

| Requirement / control | Case | Expected outcome | Then / binding / verification | Evidence source | State |
|---|---|---|---|---|---|
| RIB-ACC-01 | RIB_ACC_001 | Exact owned account appears | Populate from approved implementation | Verified account summary | Designed, awaiting approval |
| RIB-ACC-01 | RIB_ACC_001 | Expected balance appears | Populate from approved implementation | Independent expected balance plus UI | Blocked until baseline supplied |

Summarize open questions at the top of the case file. Every testable outcome is covered or has an explicit uncovered/blocked reason. Keep designed, approved, implemented and verified statuses distinct. Deprecated requirements and cases remain traceable. Execution treatment requires an explicit decision.
