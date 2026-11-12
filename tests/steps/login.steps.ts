import { Given, Then, When, test } from '../../src/fixtures/index.js';
import { getByKey } from '../../src/core/data-key.js';

Given('The user opens the Bandhan Bank login page', async ({ loginPage }) => {
  test.setTimeout(90_000);
  await loginPage.open();
});

Then('The user sees the Terms and Conditions checkbox unchecked', async ({ loginVerify }) => {
  await loginVerify.termsCheckboxIsUnchecked();
});

Then('The user sees the Proceed button enabled', async ({ loginVerify }) => {
  await loginVerify.proceedIsEnabled();
});

When(
  'The user enters the registered User ID {string}',
  async ({ loginPage, data }, dataKey: string) => {
    const credentials = getByKey<{ userId: string }>(data, dataKey);
    await loginPage.enterUserId(credentials.userId);
  },
);

When(
  'The user enters the password {string}',
  async ({ loginPage, data }, dataKey: string) => {
    const password = getByKey<string>(data, dataKey);
    await loginPage.enterPassword(password);
  },
);

When('The user focuses the User ID field', async ({ loginPage }) => {
  await loginPage.focusUserIdField();
});

When('The user focuses the password field', async ({ loginPage }) => {
  await loginPage.focusPasswordField();
});

When('The user selects Proceed', async ({ loginPage }) => {
  await loginPage.selectProceed();
});

Then(
  'The user sees the Terms Error modal {string} with message {string}',
  async ({ loginVerify }, titleKey: string, messageKey: string) => {
    await loginVerify.showsTermsErrorModal(titleKey, messageKey);
  },
);

Then('The user sees the error icon in the Terms Error modal', async ({ loginVerify }) => {
  await loginVerify.showsTermsErrorIcon();
});

Then(
  'The user sees the Okay button in the Terms Error modal {string}',
  async ({ loginVerify }, labelKey: string) => {
    await loginVerify.termsErrorModalShowsOkayButton(labelKey);
  },
);

When('The user clicks outside the Terms Error modal', async ({ loginPage }) => {
  await loginPage.clickOutsideTermsErrorModal();
});

Then('The user sees the Terms Error modal remains open', async ({ loginVerify }) => {
  await loginVerify.termsErrorModalRemainsOpen();
});

When('The user presses Escape while the Terms Error modal is open', async ({ loginPage }) => {
  await loginPage.pressEscape();
});

When(
  'The user selects Okay in the Terms Error modal {string}',
  async ({ loginPage }, labelKey: string) => {
    await loginPage.selectTermsErrorOkay(labelKey);
  },
);

Then(
  'The user sees the login page after the Terms Error modal closes',
  async ({ loginVerify }) => {
    await loginVerify.loginPageIsVisibleAfterTermsError();
  },
);

Then('The user sees the password field is masked', async ({ loginVerify }) => {
  await loginVerify.passwordIsMasked();
});

Then('The user sees the password field is empty', async ({ loginVerify }) => {
  await loginVerify.passwordIsCleared();
});

Then(
  'The user sees the registered User ID retained for {string}',
  async ({ loginVerify, data }, dataKey: string) => {
    const credentials = getByKey<{ userId: string }>(data, dataKey);
    await loginVerify.retainsUserId(credentials.userId);
  },
);

Then('The user sees Terms and Conditions remain unchecked', async ({ loginVerify }) => {
  await loginVerify.termsCheckboxIsUnchecked();
});
