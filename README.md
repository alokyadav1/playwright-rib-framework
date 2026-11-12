# Playwright RIB framework

Use an IDE coding assistant to turn an FSD into reviewed cases, Gherkin, step definitions, page actions and verification methods. Start with AGENTS.md and load only the skills needed for the current stage.

## Setup

Requires Node.js 24 and npm.

```bash
npm ci
npx --no-install playwright install chromium
```

Copy `.env.example` to `.env` and set BASE_URL to your UAT portal URL. The initial context is TEST_ENV=uat, BANK=demo, LOCALE=en-in. An API URL is optional and is supplied only when a verified API test or browser request wait needs it. The supplied URL placeholders must be replaced before actual portal execution.

Store verified data in `src/data/<env>/<bank>/common.json` with optional locale overrides. UI text lives in `src/labels/<bank>/<locale>.json`. Locators live in the owning module JSON. Unknown values remain `__REQUIRED__`, and selected cases needing them remain blocked. Encrypt sensitive values locally with `npm run secret:encrypt`.

## Run

```bash
npm run check
npm run test:unit
npm run test:list
npm test
npm test -- --grep "RIB_ACC_001 -"
npm run report
```

The test command generates BDD specs and calls Playwright directly. It accepts ordinary Playwright filters and options. Compare listed case IDs and expected example/project counts with the approved cases. Inspect the report before claiming completion, including skips, failures and missing expected cases. Case IDs belong at the start of scenario and outline titles, followed by ` - `. Tags describe area or suite grouping.

Keep one worker and zero retries until test data isolation is demonstrated. Reconcile an uncertain transfer submission through the approved read-only source before any further submission. All application page adapters require verified selectors and approved FSD behavior.

## Authentication

Contexts start fresh by default. If an account-summary or other authenticated case should reuse a provisioned session, set AUTH_STATE to `auth/<env>/<bank>/<locale>/<role>.json`. Playwright loads that file through its storageState option. Leave AUTH_STATE unset for login, MFA and fresh-session tests. Use only the challenge arrangement required by the actual FSD and authorized test system.

## Structure

| Path | Purpose |
|---|---|
| docs/fsd, docs/requirements, docs/test-cases | Source specifications and reviewed design outputs |
| tests/features, tests/steps | Executable Gherkin and thin bindings |
| src/pages, src/verifications, src/fixtures | Module-owned actions, assertions and lazy wiring |
| src/data, src/labels, src/locators | Context data, expected copy and selectors |
| src/core/runtime.ts | Context loading, optional API config and mutation switches |
| src/utils/utils.ts | Supporting methods, including exact INR-to-paise conversion |
| scripts/agent/inventory.ts | Existing methods, steps and key discovery |

Login, Session, Accounts, Beneficiaries, Transfers and Statements own their respective files. Cross-module scenarios reuse these files. Add shared components only when actual consumers need them.

## Bank settings

Keep `src/config/banks/<bank>.json` for the two explicit mutation permissions and future policy values. Ordinary page actions need no profile metadata, module registry or execution manifest. The runtime checks the corresponding switch before beneficiary addition and transfer submission. Additional committing actions must use the same small helper in their owning page.

## Framework smoke

The optional FW_001 scenario uses an in-memory page to check BDD bindings, fixtures and browser assertions. Run `npm run test:framework` to select its @framework tag. It needs no portal login. FRAMEWORK_NEGATIVE_CONTROL=1 makes its assertion fail deliberately. Clear that variable before a normal run. A compatible local browser can be selected through PLAYWRIGHT_CHROMIUM_EXECUTABLE.

## Artifacts and reporting

Trace, screenshots and video default to off. Raw reports, auth state and downloads may contain sensitive data. Keep them in ignored local paths and follow the bank's approved handling rules. Record selected IDs, context, commands, missing inputs and sanitized results in STATE.md. Report verified, failed and blocked cases separately. A passing UI suite proves its asserted outcomes and does not certify regulatory compliance.
