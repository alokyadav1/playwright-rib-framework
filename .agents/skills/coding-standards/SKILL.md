---
name: gherkin-bdd
description: Write and maintain readable, consistent Gherkin feature files and map every step to a step definition. Reuse scenarios and steps across the entire suite before creating new ones, and use data keys to avoid near-duplicate steps. Use whenever creating or editing .feature files or step definitions, converting approved test cases into scenarios, or when the user mentions Gherkin, BDD, scenarios, steps, Given, When or Then.
---

# Gherkin and step mapping

Feature files are the readable contract. Step definitions are thin glue to the page layer.

Keep scenario descriptions accurate, language consistent and each distinct business intent backed by one reusable step definition across the suite.

## Inputs and outputs

- Input: **approved** test cases (`docs/test-cases/<slug>.test-cases.md`). No approved test cases, no scenarios.
- Output:
  - `tests/features/<area>/<FeatureName>.feature`
  - New or updated owning step files in `tests/steps/<area>.steps.ts`
  - `docs/agent-runs/<slug>/step-map.md`
- Feature filenames are PascalCase (`AccountSummary.feature`, not `account-summary.feature`). Area folders stay lowercase.
- One test case becomes one `Scenario`, or one `Scenario Outline` when the same test case runs with several data keys.
- Reuse bindings from other modules directly. A feature does not need its own step file when all required bindings already exist.

## Before writing anything

1. Read the approved cases and identify their preconditions, individual user actions and expected outcomes.

2. Run:
   - `npx --no-install bddgen export`
   - `npm run agent:inventory -- steps`

   Use the export as the authoritative list of defined expressions. Inspect the binding implementations before deciding they are suitable for reuse.

3. Search `tests/features` for the exact approved case ID at the start of a scenario title (`RIB_TRF_001 - `). Also inspect legacy tags to avoid duplicating an existing case. If the scenario exists, update it; never add a second one.

4. Inspect terminology and sentence patterns across the suite. Apply the scenario accuracy, consistent language and suite-wide reuse rules below before adding or changing steps.

## Scenario accuracy

- Scenario titles and optional descriptions must accurately describe what their steps perform and verify.
- Use simple, straightforward language that a reader can understand without knowing the automation framework.
- Every behavior claimed by the title or description must have corresponding steps and observable assertions.
- Do not claim a successful login, completed transfer or other final outcome when the steps only enter data, submit a form or verify an intermediate state.
- Keep the scenario focused on its approved case. Do not add unrelated actions or assertions to make an inaccurate title appear correct.
- Preserve the exact approved case ID and case title.
- If the approved title conflicts with the approved actions or outcomes, flag the mismatch and request clarification before implementing the affected scenario. Do not silently rename the approved case or invent missing behavior.
- Keep selectors, fixtures, method names, API payloads and internal implementation terms out of titles, descriptions and step wording.

**Reason:** The scenario description must state exactly what the scenario proves.

## Consistent terms and sentence structure

- Use one established term for each business concept and one sentence structure for each repeated intent across the suite.
- Follow approved requirement terminology and established suite vocabulary. Flag conflicts before introducing another term.
- Use third-person `The user`, present tense and consistent phrasing.
- Do not alternate between synonyms for the same intent, such as `enters`, `types` and `provides`, or `sees`, `views` and `observes`. Reuse the established expression.
- Keep wording consistent across positive, negative and boundary scenarios. Express input and expected-message variations through data keys and label keys.
- Use different wording only when it represents a different business action, state or outcome.
- Do not force different business concepts into the same expression merely because their UI interactions look similar.

**Reason:** Consistent wording makes scenarios easier to read and prevents equivalent steps from multiplying.

## Suite-wide step reuse

Search the entire suite before creating a step definition, regardless of feature, area or owning module.

1. Search the binding export, all step-definition files and all feature files for the same business intent. Search synonyms as well as exact wording.

2. Compare behavior, inputs, preconditions and outcomes. A different method name, expression or file path does not justify another implementation.

3. Reuse an existing expression and binding when they represent the required intent.

4. If only the input or expected message varies, parameterize using data keys or label keys. Preserve the meaning and behavior of every existing consumer.

5. If an existing expression is unnecessarily page-specific or uses inconsistent wording, rename it to a clear, reusable business expression:
   - Search every consumer before changing it.
   - Update all consuming features, including Background steps and outline templates.
   - Update the binding and affected step-map references.
   - Preserve the existing behavior.
   - Remove the superseded expression. Do not retain redundant aliases.

6. Keep the binding in its owning module. If underlying logic needs extraction, follow coding-standards for shared components, utilities and module ownership.

7. Add a new expression only when no existing expression represents the required business intent.

Never create equivalent bindings under different wording, parameter names, Given/When/Then registrations or module paths.

Never broaden an existing binding in a way that silently changes other scenarios.

Apply renaming to the affected expressions and their consumers. Do not migrate unrelated scenarios.

**Reason:** Each distinct business intent must have one reusable binding across the entire suite.

## Scenario rules

- Every newly authored `Scenario` and `Scenario Outline` title starts with the exact approved case ID followed by ` - ` and the approved case title. Preserve separators and digits.

  Example:

  ```gherkin
  Scenario: RIB_TRF_001 - Verify user can review an approved transfer
  ```

- Never add a case ID as a tag, including `@RIB_TRF_001` or `@TC-RIB_TRF_001`. Tags describe approved area, suite or execution grouping, such as `@accounts`, `@smoke`, `@regression` and `@i18n`.

- Requirement traceability lives in the cases, step map and STATE.md. Preserve unrelated existing features unless the task calls for their migration.

- `Given` sets state or establishes preconditions. `When` describes one user action. `Then` describes an observable outcome. `And` and `But` continue the previous keyword.

- Use one action per `When` or action `And`. Split navigation, data entry and submission when they are separate user intents. Multiple action steps are allowed. Never collapse them merely to have one `When`.

- Capitalize Gherkin keywords and use third-person `The user`.

- Use declarative, present-tense business language. For example, `The user opens the account summary "navigation.accountsPath"` describes business intent. Keep UI mechanics inside the owning page.

- Do not include selectors, CSS, literal URL paths or waits.

- Use `Background` only for steps shared by every scenario in the file.

- Keep scenarios independent. None relies on another having run.

- Use data keys for accounts, beneficiaries, credentials and other varying business inputs. Keep credential values, tokens and expected UI copy out of feature files.

- A count explicitly specified by the approved case may use an integer parameter.

- Use `Scenario Outline` only for the same flow over different data. Examples columns hold data keys, never raw business values.

- Map every individual approved expected outcome to a `Then` or assertion `And`, a binding and a verification method.

- Trace every assertion back to an approved outcome. Verify entity identity and values as well as counts when required.

## Steps use data keys, not literals

Describe the intent in the step text and pass variation as a data key:

```gherkin
Given The user opens fund transfers "navigation.transfersPath"
When The user selects the source account "accounts.source"
And The user selects the beneficiary "beneficiaries.existing"
And The user selects the transfer rail "transferRails.neft"
And The user enters the transfer amount for "transfers.domestic"
And The user reviews the transfer
Then The user sees the reviewed beneficiary "beneficiaries.existing"
And The user sees the reviewed amount for "transfers.domestic"
```

- `{string}` carries a data key, normally a full path such as `"credentials.customer"` or `"beneficiaries.existing"`.
- Preserve a short-key convention only when the reused binding explicitly defines its group prefix.
- `{int}` carries approved counts.
- Use Cucumber expressions. Avoid regular expressions in step patterns.
- Resolve data keys with `getByKey(data, key)`. Missing keys and unresolved placeholders must fail with an error naming the key.
- Do not over-generalise. `When The user clicks {string}` and `Then The user sees the text {string}` are anti-patterns: they move UI mechanics into feature files and weaken business meaning.
- Parameterize by business entity or input role, not by arbitrary UI element.
- Keep one responsibility per step. Do not join separate actions with "and" inside step text.
- Search and update every consumer when renaming an expression.

## Expected text comes from label keys

A step that verifies UI text takes a label key:

```gherkin
Then The user sees the session expiry message "sessionExpiredMessage"
```

- The step text identifies the business state or message location.
- The `{string}` parameter is a key in `src/labels/{bank}/{locale}.json`.
- The verification method resolves it with `getLabel(labels, key)`, allowing the same scenario to verify the correct text in each locale.
- Never write literal expected UI text in a feature file or verification class.
- Never hard-code a label key inside a verification method.
- A different message in the same location uses another label key through the existing binding.
- Add a new expression only when the business intent or message location differs, such as an error banner versus an empty state.
- Label keys follow coding-standards: camelCase with an area prefix.

## Step definitions

- Keep one step file per owning module in `tests/steps/<area>.steps.ts`.
- Import `Given`, `When` and `Then` as needed from `../../src/fixtures/index.js`.
- Login bindings belong to Login, account operations to Accounts and beneficiary operations to Beneficiaries, even when a Transfers feature uses all three.
- Create a missing owning file rather than placing prerequisites in the current feature's module.
- Keep bindings thin: destructure required fixtures, resolve data keys and call one page or verification method.
- Do not use `page.` calls, selectors or `expect` in step definitions. Assertions belong in verification classes; see page-verification.
- Reuse existing page and verification implementations according to coding-standards.
- Use Cucumber expressions. Optional text in parentheses is acceptable, such as `{int} item(s)`.
- Never define the same pattern or an equivalent business-intent binding twice anywhere in the suite.

## Step map

Write `docs/agent-runs/<slug>/step-map.md` with one row per distinct step used by the new or updated scenarios:

| Case / requirement / expected outcome | Step text | Definition | Calls | New / reused |
|---|---|---|---|---|
| RIB_TRF_001 / FR-TRF-01 / review the selected transfer | `The user reviews the transfer` | `tests/steps/transfers.steps.ts` | `TransfersPage.review()` | reused |

- Include all applicable case, requirement and outcome references when several scenarios share a step.
- Mark each binding as **new** or **reused**.
- For a renamed existing binding, mark it **reused** and record the previous expression and affected consumers below the table.
- Keep the map aligned with the final expressions, owning files and method calls.
- Account for every approved expected outcome.

## Checks before handing over

1. Confirm there is one scenario or outline per in-scope approved case, with the exact case ID and title. Never add case ID tags.

2. Read every title and optional description against its steps and assertions. Confirm each claimed behavior is performed and verified. Resolve any conflict with the approved case before implementing the affected scenario.

3. Confirm repeated concepts and intents use consistent terminology and sentence structure across affected scenarios.

4. Review new and renamed expressions against the entire suite. Confirm there are no duplicate patterns or equivalent bindings. Confirm all consumers and affected step maps were updated after renaming.

5. Map bindings first, then implement missing steps with their owning dependencies and fixture wiring. Do not deliberately leave unresolved methods for another stage.

6. Run:
   - `npx --no-install bddgen`
   - `npm run check`
   - `npx --no-install bddgen export`

   Generation and checks must pass. Inspect the export for duplicate or near-duplicate expressions introduced by the change.

7. Confirm feature text contains no literal business test data, credentials or expected UI copy. Use data keys and label keys instead.

8. Confirm feature filenames are PascalCase.

9. Use native Playwright listing and execution with the case ID title filter:
   - `npm run test:list -- --grep "<case ID> -"`
   - `npm test -- --grep "<case ID> -"`

   Compare collected case IDs and expected example/project counts with approved cases. Include affected existing cases when shared bindings or implementations change.

10. Inspect execution results and the outcome map. A classified failure remains failed. A skipped or blocked case remains unverified.

A successful binding export establishes available expressions. Passing execution and the outcome map establish verified coverage.

See `references/example.md` for a complete authoring pattern, step file and step map.

## RIB rules

Apply [the banking implementation rules](../framework-knowledge/references/banking-rules.md) for bank applicability, policy inputs, authentication, data protection, transaction reconciliation and module ownership.