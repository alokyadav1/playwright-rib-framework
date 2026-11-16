import { getByKey } from '../../src/core/data-key.js';
import { Given, Then, When, test } from '../../src/fixtures/index.js';
import type { CustomerIdLookupDetails } from '../../src/pages/CustomerIdPage.js';

Given(
  'The user opens the Bandhan Bank Customer ID form {string}',
  async ({ customerIdPage, data }, pathKey: string) => {
    await customerIdPage.openCustomerIdForm(getByKey<string>(data, pathKey));
  },
);

When('The user selects Continue for Customer ID retrieval', async ({ customerIdPage }) => {
  await customerIdPage.submitLookupDetails();
});

Then('The user sees Customer ID required messages together', async ({ customerIdVerify }) => {
  await customerIdVerify.showsRequiredMessagesTogether();
});

When(
  'The user enters the mobile sample from {string}',
  async ({ customerIdPage, data }, dataKey: string) => {
    await customerIdPage.enterMobileSample(getByKey<string>(data, dataKey));
  },
);

Then(
  'The user sees the Customer ID mobile value from {string}',
  async ({ customerIdVerify, data }, dataKey: string) => {
    await customerIdVerify.showsMobileValue(getByKey<string>(data, dataKey));
  },
);

When(
  'The user types an additional Customer ID mobile character from {string}',
  async ({ customerIdPage, data }, dataKey: string) => {
    await customerIdPage.typeAdditionalMobileCharacter(getByKey<string>(data, dataKey));
  },
);

When(
  'The user enters Customer ID lookup details from {string}',
  async ({ customerIdPage, data }, dataKey: string) => {
    await customerIdPage.enterLookupDetails(getByKey<CustomerIdLookupDetails>(data, dataKey));
  },
);

When('The user enters registered Customer ID lookup details', async ({ customerIdPage, data }) => {
  await customerIdPage.enterLookupDetails({
    mobile: getByKey<string>(data, 'credentials.registeredUser.mobile'),
    dateOfBirth: getByKey<string>(data, 'credentials.registeredUser.dateOfBirth'),
  });
});

Then(
  'The user sees the Customer ID Error modal {string}',
  async ({ customerIdVerify }, messageKey: string) => {
    await customerIdVerify.showsErrorModal(messageKey);
  },
);

Then('The user sees Customer ID OTP verification', async ({ customerIdVerify }) => {
  test.setTimeout(90_000);
  await customerIdVerify.showsOtpVerification();
});

Then(
  'The user sees the Customer ID retrieval success confirmation {string} {string} {string}',
  async (
    { customerIdVerify },
    headingKey: string,
    messageKey: string,
    buttonKey: string,
  ) => {
    test.setTimeout(90_000);
    await customerIdVerify.showsRetrievalSuccess(headingKey, messageKey, buttonKey);
  },
);