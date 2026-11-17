import { getByKey } from '../../src/core/data-key.js';
import { Given, Then, When, test } from '../../src/fixtures/index.js';
import type { UnassociatedCardProfile } from '../../src/pages/ForgotUserIdPage.js';

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
  'The user sees {int} digits in the Forgot User ID card number field',
  async ({ forgotUserIdVerify }, digitCount: number) => {
    await forgotUserIdVerify.showsCardNumberDigitCount(digitCount);
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

When('The user selects the expiry from {string}', async ({ forgotUserIdPage, data }, dataKey: string) => {
  await forgotUserIdPage.selectExpiry(getByKey<UnassociatedCardProfile>(data, dataKey));
});

When('The user enters the ATM PIN from {string}', async ({ forgotUserIdPage, data }, dataKey: string) => {
  await forgotUserIdPage.enterAtmPin(getByKey<string>(data, dataKey));
});

Then('The user sees Forgot User ID OTP verification', async ({ forgotUserIdVerify }) => {
  test.setTimeout(90_000);
  await forgotUserIdVerify.showsOtpVerification();
});

Then('The user sees the Forgot User ID Error modal {string}', async ({ forgotUserIdVerify }, messageKey: string) => {
  await forgotUserIdVerify.showsIncorrectDebitCardModal(messageKey);
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

Then(
  'The user sees expiry years from the current year through the next 10 years',
  async ({ forgotUserIdVerify }) => {
    await forgotUserIdVerify.showsCurrentAndNextTenExpiryYears();
  },
);

When(
  'The user selects the current expiry year from the open options',
  async ({ forgotUserIdPage }) => {
    await forgotUserIdPage.selectCurrentExpiryYearFromOpenOptions();
  },
);

Then(
  'The user sees expiry months from the current month through December',
  async ({ forgotUserIdVerify }) => {
    await forgotUserIdVerify.showsCurrentAndRemainingExpiryMonths();
  },
);

When(
  'The user selects the earliest future expiry year from the open options',
  async ({ forgotUserIdPage }) => {
    await forgotUserIdPage.selectEarliestFutureExpiryYearFromOpenOptions();
  },
);

Then('The user sees all 12 expiry months', async ({ forgotUserIdVerify }) => {
  await forgotUserIdVerify.showsAllExpiryMonths();
});
