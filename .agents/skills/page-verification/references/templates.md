# RIB implementation contracts

- [AccountsPage](../../../../src/pages/AccountsPage.ts) scopes account rows by an exact masked identifier.
- [AccountsVerifications](../../../../src/verifications/AccountsVerifications.ts) checks identity and the expected balance text with web-first assertions.
- [TransfersPage](../../../../src/pages/TransfersPage.ts) performs one guarded submission attempt.
- [Fixture registry](../../../../src/fixtures/index.ts) creates page objects and verification fixtures lazily.
- [ApiInterceptor](../../../../src/core/ApiInterceptor.ts) remains available when a verified guaranteed browser call needs correlation.

```ts
import type { Page } from '@playwright/test';
import selectors from '../locators/accounts.json' with { type: 'json' };
import { BasePage } from './BasePage.js';
```

Bank pages receive `(page)`. BasePage receives `(page, selectors)` and resolves the owning required selectors when used. Playwright supplies the browser context and optional storage state. Add any extra dependency only to actual consumers. The application locator values shipped in JSON are `__REQUIRED__`, so they cannot silently become working guessed selectors.

```ts
await expect(this.accounts.balanceFor(maskedNumber)).toHaveText(expectedText);
```

Expected values come from approved data. Text messages take a scenario label key and resolve with `getLabel`. Pages hold actions. Verification classes remain read-only and use web-first assertions. Use `toBeHidden` for hidden states and `toHaveValue`/`toHaveText` for exact values. A filename or reference-presence check proves only that specific outcome.

The data fixture merges encrypted values without eagerly decrypting unrelated data. A thin binding calls `getByKey<T>(data, key)` for its required entity. No selector, assertion or raw browser call belongs in the binding. Native `selectOption` methods are starter adapters and must be replaced in their owning page if verified bank UI uses a custom control.

Before adding a committing action, confirm it belongs to the approved case. Use `assertMutationAllowed('securityChange')` or `assertMutationAllowed('fundsMovement')` from runtime.ts in the owning method. Confirm the actual commit point from the FSD and browser evidence. A label saying Review does not establish that an action is read-only.

For an optional API wait, create an owning registry only from approved browser network evidence. Register the handle before the action, then await it. Scope method, origin and path, with a non-sensitive correlation predicate when several calls can match. Conditional/cached/server-side calls use approved UI readiness. Network waits do not establish ledger settlement.

Shared components require demonstrated reuse. Register fixtures lazily, preserve existing consumers, and clean up resources the fixture creates. Run `npm run check`, list the selected tests and execute them with native Playwright commands after wiring a complete change.
