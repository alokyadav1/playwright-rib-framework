import { getByKey } from '../../src/core/data-key.js';
import { Given, Then, When } from '../../src/fixtures/index.js';

Given(
  'The user opens the Bandhan Bank Forgot User ID Debit Card form {string}',
  async ({ forgotUserIdPage, data }, pathKey: string) => {
    await forgotUserIdPage.openForm(getByKey<string>(data, pathKey));
  },
);

When('The user selects Continue for Forgot User ID', async ({ forgotUserIdPage }) => {
  await forgotUserIdPage.submit();
});

Then('The user sees Forgot User ID required-field messages together', async ({ forgotUserIdVerify }) => {
  await forgotUserIdVerify.showsRequiredMessagesTogether();
});

When(
  'The user enters the card sample from {string}',
  async ({ forgotUserIdPage, data }, dataKey: string) => {
    await forgotUserIdPage.enterCardSample(getByKey<string>(data, dataKey));
  },
);

Then(
  'The user sees the Forgot User ID card number value from {string}',
  async ({ forgotUserIdVerify, data }, dataKey: string) => {
    await forgotUserIdVerify.showsCardNumber(getByKey<string>(data, dataKey));
  },
);

When(
  'The user types the final card digit from {string}',
  async ({ forgotUserIdPage, data }, dataKey: string) => {
    await forgotUserIdPage.typeFinalCardDigit(getByKey<string>(data, dataKey));
  },
);

When(
  'The user pastes the card sample from {string}',
  async ({ forgotUserIdPage, data }, dataKey: string) => {
    await forgotUserIdPage.pasteCardSample(getByKey<string>(data, dataKey));
  },
);

When(
  'The user enters the Customer ID from {string}',
  async ({ forgotUserIdPage, data }, dataKey: string) => {
    await forgotUserIdPage.enterCustomerId(getByKey<string>(data, dataKey));
  },
);

When('The user selects the earliest available non-expired expiry month', async ({ forgotUserIdPage }) => {
  await forgotUserIdPage.selectEarliestAvailableExpiryMonth();
});

When(
  'The user enters the short ATM PIN from {string}',
  async ({ forgotUserIdPage, data }, dataKey: string) => {
    await forgotUserIdPage.enterAtmPin(getByKey<string>(data, dataKey));
  },
);

Then(
  'The user sees the Forgot User ID ATM PIN length message {string}',
  async ({ forgotUserIdVerify }, messageKey: string) => {
    await forgotUserIdVerify.showsInvalidAtmPinLengthMessage(messageKey);
  },
);

When('The user opens the Forgot User ID expiry year options', async ({ forgotUserIdPage }) => {
  await forgotUserIdPage.openExpiryYearOptions();
});

Then('The user sees no expired Forgot User ID year options', async ({ forgotUserIdVerify }) => {
  await forgotUserIdVerify.showsNoExpiredYearOptions();
});

When('The user opens the Forgot User ID expiry month options', async ({ forgotUserIdPage }) => {
  await forgotUserIdPage.openExpiryMonthOptions();
});

Then('The user sees no expired Forgot User ID month options for the current year', async ({ forgotUserIdVerify }) => {
  await forgotUserIdVerify.showsNoExpiredMonthOptions();
});