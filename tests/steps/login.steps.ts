import { Given, Then, When, test } from '../../src/fixtures/index.js';
import { getByKey } from '../../src/core/data-key.js';

Given('The user opens the Bandhan Bank login page', async ({ loginPage }) => {
  await loginPage.openLoginPage();
});

Given('The user opens Unlock Access from prelogin', async ({ loginPage }) => {
  await loginPage.openUnlockAccessFromPrelogin();
});

Given('The user opens Forgot User ID from prelogin', async ({ loginPage }) => {
  await loginPage.openForgotUserIdFromPrelogin();
});

Given('The user opens Forgot Password from prelogin', async ({ loginPage }) => {
  await loginPage.openForgotPasswordFromPrelogin();
});

Given('The user opens Know Your Customer ID from prelogin', async ({ loginPage }) => {
  await loginPage.openKnowCustomerIdFromPrelogin();
});

Then('The user sees Proceed enabled', async ({ loginVerify }) => {
  await loginVerify.proceedIsEnabled();
});

When('The user selects Proceed', async ({ loginPage }) => {
  await loginPage.submitLogin();
});

Then(
  'The user sees the terms Error modal {string}',
  async ({ loginVerify }, messageKey: string) => {
    await loginVerify.showsTermsError(messageKey);
  },
);

Then('The user sees the terms Error icon', async ({ loginVerify }) => {
  await loginVerify.showsTermsErrorIcon();
});

Then('The user remains on the login page', async ({ loginVerify }) => {
  await loginVerify.remainsOnLoginPage();
});

When(
  'The user enters the User ID value from {string}',
  async ({ loginPage, data }, dataKey: string) => {
    await loginPage.enterUserId(getByKey<string>(data, dataKey));
  },
);

When(
  'The user enters the registered User ID from {string}',
  async ({ loginPage, data }, dataKey: string) => {
    const credentials = getByKey<{ userId: string }>(data, dataKey);
    await loginPage.enterUserId(credentials.userId);
  },
);

When(
  'The user enters the registered password from {string}',
  async ({ loginPage, data }, dataKey: string) => {
    const credentials = getByKey<{ password: string }>(data, dataKey);
    await loginPage.enterPassword(credentials.password);
  },
);

When(
  'The user enters the nonempty incorrect password from {string}',
  async ({ loginPage, data }, dataKey: string) => {
    await loginPage.enterPassword(getByKey<string>(data, dataKey));
  },
);

When('The user accepts the Terms and Conditions', async ({ loginPage }) => {
  await loginPage.acceptTerms();
});

When('The user moves focus to Password', async ({ loginPage }) => {
  await loginPage.focusPassword();
});

Then(
  'The user sees the User ID format message {string} as {string}',
  async (
    { loginVerify },
    labelKey: string,
    visibility: string,
  ) => {
    if (visibility !== 'visible' && visibility !== 'hidden') {
      throw new Error(`Unknown User ID format message visibility: "${visibility}"`);
    }
    await loginVerify.userIdFormatMessageState(labelKey, visibility);
  },
);

Then(
  'The user sees the invalid credentials modal {string} and {string}',
  async ({ loginVerify }, headingKey: string, messageKey: string) => {
    test.setTimeout(90_000);
    await loginVerify.showsInvalidCredentialsModal(headingKey, messageKey);
  },
);

Then('The user sees the login OTP page', async ({ loginVerify }) => {
  test.setTimeout(90_000);
  await loginVerify.showsLoginOtpPage();
});

Then('The user sees Home Dashboard', async ({ loginVerify }) => {
  await loginVerify.showsHomeDashboard();
});

Then(
  'The user sees the invalid OTP Error modal {string} {string} {string}',
  async (
    { loginVerify },
    titleKey: string,
    messageKey: string,
    buttonKey: string,
  ) => {
    await loginVerify.showsInvalidOtpModal(titleKey, messageKey, buttonKey);
  },
);
