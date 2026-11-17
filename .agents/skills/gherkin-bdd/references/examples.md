# RIB authoring patterns

[FrameworkSmoke.feature](../../../../tests/features/framework/FrameworkSmoke.feature) and [framework.steps.ts](../../../../tests/steps/framework.steps.ts) are the framework-only executable references.

The following account example is an authoring pattern. It requires its own approved bank FSD, approved test case and provisioned inputs before becoming a live bank test.

The case ID, title and requirement references below are illustrative. Use the exact approved identifiers and title when applying this pattern.

## Approved behavior

The example case requires the user to:

1. Open the account summary with an authenticated session.
2. See the exact owned account.
3. See that account's expected balance.

The scenario title describes both outcomes. Its assertions verify both outcomes.

## Feature file

Target: `tests/features/accounts/AccountSummary.feature`

```gherkin
@accounts
Feature: Account summary

  @smoke
  Scenario: RIB_ACC_001 - Verify the user can view an owned account and its balance
    Given The user opens the account summary "navigation.accountsPath"
    Then The user sees the account "accounts.source"
    And The user sees the expected balance for "accounts.source"
```

Use tags only when approved. The case ID belongs in the scenario title, never in a tag.

Set `AUTH_STATE=auth/<env>/<bank>/<locale>/customer.json` only when the case is intended to reuse an authenticated session.

A restored authenticated session is a precondition for this example. Login and MFA require separate fresh-session cases.

The scenario must not claim to verify login because it reuses an existing session.

## Find reusable bindings first

Before adding these bindings:

1. Run `npx --no-install bddgen export`.
2. Run `npm run agent:inventory -- steps`.
3. Search all step-definition files and feature files for these business intents.
4. Reuse matching bindings from their owning modules.
5. Add only bindings that do not already exist.

The expressions below define the wording used throughout this example. Existing suite wording takes precedence when it expresses the same intent and follows the language rules.

## Step-definition pattern

Target: `tests/steps/accounts.steps.ts`

The following assumes the existing fixture, data resolver and page contracts shown by the example. Adapt to verified repository contracts instead of introducing duplicate helpers or methods.

```ts
import { Given, Then } from '../../src/fixtures/index.js';
import { getByKey } from '../../src/core/data-key.js';

type AccountExpectation = {
  maskedNumber: string;
  balance: string;
};

Given(
  'The user opens the account summary {string}',
  async ({ accountsPage, data }, key: string) => {
    const accountSummaryPath = getByKey<string>(data, key);

    await accountsPage.open(accountSummaryPath);
  },
);

Then(
  'The user sees the account {string}',
  async ({ accountsVerify, data }, key: string) => {
    const account = getByKey<AccountExpectation>(data, key);

    await accountsVerify.showsAccount(account.maskedNumber);
  },
);

Then(
  'The user sees the expected balance for {string}',
  async ({ accountsVerify, data }, key: string) => {
    const account = getByKey<AccountExpectation>(data, key);

    await accountsVerify.hasBalance(account.maskedNumber, account.balance);
  },
);
```

These bindings:

- Resolve data keys.
- Delegate navigation to AccountsPage.
- Delegate assertions to AccountsVerifications.
- Identify the account when checking its balance.
- Contain no selectors, direct browser interactions or assertions.
- Reuse the same expressions when the account data key changes.

The verification methods must use the repository's established account and balance types. The example's string balance is illustrative; do not replace an existing money representation merely to match it.

Do not copy a binding that already exists.

## Data contracts

| Key | Required content |
|---|---|
| `navigation.accountsPath` | Approved account-summary navigation path |
| `accounts.source.maskedNumber` | Expected masked identity of the provisioned owned account |
| `accounts.source.balance` | Approved expected balance in the format required by the existing verification method |

Store actual values in the appropriate data file. Do not put account values or navigation paths directly into feature steps.

A missing key or unresolved placeholder must fail through the established data resolver.

## Step map

Target: `docs/agent-runs/<slug>/step-map.md`

The example below assumes all three bindings were found and reused. Record **new** instead when a binding was actually added.

| Case / requirement / expected outcome | Step text | Definition | Calls | New / reused |
|---|---|---|---|---|
| RIB_ACC_001 / approved navigation precondition | `The user opens the account summary "navigation.accountsPath"` | `tests/steps/accounts.steps.ts` | `AccountsPage.open(path)` | reused |
| RIB_ACC_001 / exact owned account is shown | `The user sees the account "accounts.source"` | `tests/steps/accounts.steps.ts` | `AccountsVerifications.showsAccount(maskedNumber)` | reused |
| RIB_ACC_001 / expected balance for that account is shown | `The user sees the expected balance for "accounts.source"` | `tests/steps/accounts.steps.ts` | `AccountsVerifications.hasBalance(maskedNumber, balance)` | reused |

Replace descriptive requirement references with the actual approved requirement and expected-outcome identifiers when available.

## Accurate descriptions

| Description | Acceptable? | Reason |
|---|---|---|
| View an owned account and its balance | Yes | Both outcomes have assertions |
| Log in and view an owned account | No | The scenario restores a session and does not perform login |
| Transfer money from an owned account | No | The scenario performs no transfer |

If an approved title conflicts with its actions or outcomes, flag the mismatch before implementing the affected scenario. Do not silently change the title or add behavior.

## Consistent wording and suite-wide reuse

Use the same expression when only the account changes:

```gherkin
Then The user sees the account "accounts.source"
```

```gherkin
Then The user sees the account "accounts.secondary"
```

Do not introduce equivalent alternatives such as:

```gherkin
Then The user views the account "accounts.secondary"
```

```gherkin
Then The user observes the account "accounts.secondary"
```

Those expressions describe the same intent and would create redundant bindings.

If an existing expression needs renaming:

1. Find its binding and every consuming feature.
2. Choose the established suite wording or a clear replacement.
3. Update the binding, all consumers and affected step maps.
4. Remove the old expression.
5. Generate, check and execute affected cases.

## Cross-module scenarios

A transfer scenario may require account and beneficiary preconditions, followed by separate source selection, beneficiary selection, rail selection, amount entry, review, authorization and submission intents.

Keep every binding and implementation in its owning module:

| Intent | Owning module |
|---|---|
| Authentication | Login |
| Account-summary navigation and account verification | Accounts |
| Beneficiary management | Beneficiaries |
| Transfer entry, review and submission | Transfers |

Reuse these bindings across features. Do not copy Login or Accounts behavior into Transfers.

Add a bank-specific challenge step only when the approved adapter contract exists.

Do not collapse separate user intents to satisfy a one-When preference.

## Scenario Outline usage

Use an outline only when the same approved case follows the same flow with different data keys.

- Keep the approved case ID and title on the outline.
- Put data keys in Examples cells.
- Ensure each example has its own provisioned state.
- Verify that every example follows the same business rules.
- Compare the expected example count multiplied by selected projects with the collected tests.

Do not combine different business behaviors into an outline merely because some steps overlap.

## Expected messages

Use a label key when verifying UI copy:

```gherkin
Then The user sees the session expiry message "sessionExpiredMessage"
```

The binding passes the key to the owning verification method. That method resolves the text through `getLabel(labels, key)`.

Do not hard-code the expected message or its label key inside the verification method.

## Verification

For the illustrative account case:

```bash
npx --no-install bddgen
npm run check
npx --no-install bddgen export
npm run test:list -- --grep "RIB_ACC_001 -"
npm test -- --grep "RIB_ACC_001 -"
```

Before handoff, confirm:

- The title matches the performed actions and verified outcomes.
- Every approved outcome has a mapped assertion.
- Repeated intents use consistent wording.
- No equivalent binding was introduced anywhere in the suite.
- Renamed bindings have no outdated consumers.
- Collected tests match the approved case and expected example/project counts.
- Execution results support the reported coverage.

A failed case remains failed. A skipped or blocked case remains unverified.