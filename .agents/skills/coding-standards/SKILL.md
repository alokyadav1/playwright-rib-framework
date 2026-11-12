---
name: coding-standards
description: Code, naming, formatting and review standards for TypeScript, JSON and Gherkin in this repository. Use whenever writing or editing any code, locator, label or data JSON, or feature file, and as a final self-review before declaring any task done.
---

# Coding standards

Each rule has a reason so you can apply it to cases not listed here.

## TypeScript

| Rule | Reason |
|---|---|
| `strict` mode; no `any` (use `unknown` and narrow); avoid `!` unless a comment says why it is safe | Types are the cheapest test |
| `async`/`await` only; every promise is awaited or returned (no floating promises) | A floating promise is a race the test cannot see |
| No `waitForTimeout`, `networkidle`, `page.pause()`, `test.only`, `test.skip` without approval | Slow, flaky or silently reduces coverage |
| No `console.log`; use `test.step` for readable reports. Only `console.warn` is allowed (loader warnings) and only in `src/core` | Logs leak data and add noise |
| Prefer web-first assertions on locators (`await expect(locator).toHaveText(...)`) | They retry; reading a value first does not |
| Relative imports with `.js` extensions, ordered node, third-party, local. Import JSON with `with { type: 'json' }` | Matches the ESM / NodeNext compiler configuration |
| Functions do one thing, usually around 30 lines or fewer. Review pages over about 250 lines for cohesive methods. Extract a shared component only when actual consumers share that UI | Keeps files reviewable without speculative components |
| Comments explain why, never what; no commented-out code; no TODO without an ID | Code history lives in git |
| Error messages name the key, file or expectation involved, never a secret value | Debuggable without leaking |

## Naming

| Thing | Convention | Example |
|---|---|---|
| Page class and file | `<Name>Page` | `AccountsPage.ts` |
| Verification class and file | `<Name>Verifications` | `AccountsVerifications.ts` |
| Component | `<Name>` | `Header.ts` |
| Page method | verb for the user intent | `reviewTransfer()` |
| Verification method | the outcome; text checks take a label key | `showsAccount(maskedNumber)`, `showsExpiry(labelKey)` |
| Fixture | `<area>Page`, `<area>Verify` | `accountsPage`, `accountsVerify` |
| Locator JSON file | lowercase, matches the page | `accounts.json` |
| Locator key | camelCase + type suffix `Btn Input Link Text Msg Row List Select Checkbox Tab Img` | `submitBtn` |
| Label key | camelCase, area prefix | `sessionExpiredMessage` |
| Data group, entity, attribute | camelCase, named for the role not the value. **No JSON key ever contains a dot**, space or hyphen. The dot appears only in code and scenarios, as a path into nested data | key `customer` inside object `credentials` is referenced as `credentials.customer`; its attribute is `credentials.customer.customerId` |
| Registry key | camelCase, endpoint intent | `accountSummary` |
| Feature file | PascalCase, named for the feature | `AccountSummary.feature` |
| Scenario title | Exact approved case ID followed by ` - ` and title | `RIB_TRF_001 - Verify user can review an approved transfer` |
| Tags | Area, suite or execution grouping. Never add a case ID as a tag | `@accounts @smoke @regression @i18n` |

## JSON

2-space indent, trailing newline, no duplicate keys, no comments, no trailing commas. Locale filenames are lowercase (`en-in.json`). No key contains a dot (group related data in nested objects instead). Keep the existing key order; add new keys in a logical group. Never put values you were not given (see data-generator).

## Tests

Independent and parallel-safe: no scenario relies on another, no shared mutable data. One behaviour per scenario. Deterministic data requires approved dedicated accounts or approved synthetic values for anything a test mutates. Record ownership, setup, reset, cleanup and retry behavior. Keep one worker and zero retries until isolation is demonstrated.

## Before you say "done"

1. `npm run check` passes (typecheck, lint and secrets check).
2. `npm run test:list -- --grep "<case ID> -"` lists selected tests. Compare their IDs and expected example/project counts with approved cases, then run `npm test -- --grep "<case ID> -"` and inspect the results. A classified failure remains failed, and a skipped or blocked case remains unverified.
3. Search your diff for: `any`, `waitForTimeout`, `console.log`, `.only`, hard-coded selectors in TS, literal test data in steps, plaintext credentials.
4. Re-read each new file as a reviewer: is anything here not traceable to a requirement, a stored snapshot, or an existing convention?
5. Do not run `git commit`, `git push` or any other history-changing git command. Write a suggested commit message, format `<type>(<scope>): <summary>` (for example `test(transfers): add RIB_TRF_001 and RIB_TRF_002`), into STATE.md and the final report. The user commits.

Read the owning Gherkin and page skills for third-person steps, one action per step, validated label resolution and module ownership. These rules also apply when a scenario spans Login, Session, Accounts, Beneficiaries, Transfers and Statements. `test.only` is forbidden by runner configuration. Do not bypass that gate.

## RIB rules

Apply [the banking implementation rules](../framework-knowledge/references/banking-rules.md) for bank applicability, policy inputs, authentication, data protection, transaction reconciliation and module ownership.
