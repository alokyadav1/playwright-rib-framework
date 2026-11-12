# RIB authoring patterns

[FrameworkSmoke.feature](../../../../tests/features/framework/FrameworkSmoke.feature) and [framework.steps.ts](../../../../tests/steps/framework.steps.ts) are the executable framework-only reference.

The following account example requires its own approved bank FSD, case and provisioned inputs. It is an authoring pattern and is not collected as a live bank test.

```gherkin
@accounts
Feature: Account summary

  @smoke
  Scenario: RIB_ACC_001 - Verify the customer can view an owned account
    Given The user opens the account summary "navigation.accountsPath"
    Then The user sees the account "accounts.source"
    And The user sees the expected balance for "accounts.source"
```

Set `AUTH_STATE=auth/<env>/<bank>/<locale>/customer.json` only when this case is intended to reuse an authenticated session. A restored session is a precondition for this case. Login and MFA need separate fresh-session cases.

```ts
import { Then } from '../../src/fixtures/index.js';
import { getByKey } from '../../src/core/data-key.js';

Then('The user sees the account {string}', async ({ accountsVerify, data }, key: string) => {
  const account = getByKey<{ maskedNumber: string }>(data, key);
  await accountsVerify.showsAccount(account.maskedNumber);
});
```

That binding already exists in `accounts.steps.ts`. Reuse it rather than copying it.

| Approved outcome | Owning step file | Verification |
|---|---|---|
| The exact owned account is shown | accounts.steps.ts | AccountsVerifications.showsAccount |
| The approved balance is shown | accounts.steps.ts | AccountsVerifications.hasBalance |

A transfer scenario may use account and beneficiary preconditions, followed by separate source selection, beneficiary selection, rail selection, amount entry, review, authorization and submission intents. Every action stays in its owning module. Add a bank-specific challenge step only when the approved adapter contract exists. Do not collapse these intents to satisfy a one-When preference.

An outline may vary `accounts.source` and another provisioned account key when the same approved behavior applies. Each row owns its state. Compare the expected number of rows multiplied by selected projects with `npm run test:list`. Case IDs appear only in scenario/outline titles. Expected status copy uses a label key.
