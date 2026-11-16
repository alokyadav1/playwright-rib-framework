import { getByKey } from "../../src/core/data-key.js";
import { Given, Then, When } from "../../src/fixtures/index.js";

Given(
  "The user opens the Bandhan Bank Forgot Password Debit Card verification form {string}",
  async ({ forgotPasswordPage, data }, pathKey: string) => {
    await forgotPasswordPage.openForm(getByKey<string>(data, pathKey));
  },
);

When(
  "The user selects Continue for Forgot Password",
  async ({ forgotPasswordPage }) => {
    await forgotPasswordPage.submit();
  },
);

Then(
  "The user sees Forgot Password required-field messages together",
  async ({ forgotPasswordVerify }) => {
    await forgotPasswordVerify.showsRequiredMessagesTogether();
  },
);

Then(
  "The user sees no Forgot Password expiry validation feedback",
  async ({ forgotPasswordVerify }) => {
    await forgotPasswordVerify.showsNoExpiryValidationFeedback();
  },
);

When(
  "The user enters the Forgot Password card sample from {string}",
  async ({ forgotPasswordPage, data }, dataKey: string) => {
    await forgotPasswordPage.enterCardSample(getByKey<string>(data, dataKey));
  },
);

Then(
  "The user sees the Forgot Password card number value from {string}",
  async ({ forgotPasswordVerify, data }, dataKey: string) => {
    await forgotPasswordVerify.showsCardNumber(getByKey<string>(data, dataKey));
  },
);

When(
  "The user types the final Forgot Password card digit from {string}",
  async ({ forgotPasswordPage, data }, dataKey: string) => {
    await forgotPasswordPage.typeFinalCardDigit(
      getByKey<string>(data, dataKey),
    );
  },
);

When(
  "The user pastes the overlength Forgot Password card sample from {string}",
  async ({ forgotPasswordPage, data }, dataKey: string) => {
    await forgotPasswordPage.pasteCardSample(getByKey<string>(data, dataKey));
  },
);

When(
  "The user enters the Customer ID for Forgot Password from {string}",
  async ({ forgotPasswordPage, data }, dataKey: string) => {
    await forgotPasswordPage.enterCustomerId(getByKey<string>(data, dataKey));
  },
);

When(
  "The user selects the earliest available non-expired Forgot Password expiry month",
  async ({ forgotPasswordPage }) => {
    await forgotPasswordPage.selectEarliestAvailableExpiryMonth();
  },
);

When(
  "The user enters the short ATM PIN for Forgot Password from {string}",
  async ({ forgotPasswordPage, data }, dataKey: string) => {
    await forgotPasswordPage.enterAtmPin(getByKey<string>(data, dataKey));
  },
);

Then(
  "The user sees the Forgot Password ATM PIN length message {string}",
  async ({ forgotPasswordVerify }, messageKey: string) => {
    await forgotPasswordVerify.showsInvalidAtmPinLengthMessage(messageKey);
  },
);

When(
  "The user opens the Forgot Password expiry year options",
  async ({ forgotPasswordPage }) => {
    await forgotPasswordPage.openExpiryYearOptions();
  },
);

Then(
  "The user sees no expired Forgot Password year options",
  async ({ forgotPasswordVerify }) => {
    await forgotPasswordVerify.showsNoExpiredYearOptions();
  },
);

When(
  "The user opens the Forgot Password expiry month options",
  async ({ forgotPasswordPage }) => {
    await forgotPasswordPage.openExpiryMonthOptions();
  },
);

Then(
  "The user sees no expired Forgot Password month options for current year",
  async ({ forgotPasswordVerify }) => {
    await forgotPasswordVerify.showsNoExpiredMonthOptions();
  },
);
