import { test as base, createBdd } from "playwright-bdd";
import {
  readBankData,
  readBankLabels,
  type Labels,
  type BankData,
} from "../core/runtime.js";
import { LoginPage } from "../pages/LoginPage.js";
import { LoginVerifications } from "../verifications/LoginVerifications.js";
import { UnlockAccessPage } from "../pages/UnlockAccessPage.js";
import { UnlockAccessVerifications } from "../verifications/UnlockAccessVerifications.js";
import { CustomerIdPage } from "../pages/CustomerIdPage.js";
import { CustomerIdVerifications } from "../verifications/CustomerIdVerifications.js";

type Fixtures = {
  labels: Labels;
  data: BankData;
  loginPage: LoginPage;
  loginVerify: LoginVerifications;
  unlockAccessPage: UnlockAccessPage;
  unlockAccessVerify: UnlockAccessVerifications;
  customerIdPage: CustomerIdPage;
  customerIdVerify: CustomerIdVerifications;
};
export const test = base.extend<Fixtures>({
  labels: ({}, use) => use(readBankLabels()),
  data: ({}, use) => use(readBankData({ decrypt: false })),
  loginPage: async ({ page, labels }, use) => {
    await use(new LoginPage(page, labels));
  },
  loginVerify: async ({ loginPage, labels }, use) => {
    await use(new LoginVerifications(loginPage, labels));
  },
  unlockAccessPage: async ({ page, labels }, use) => {
    await use(new UnlockAccessPage(page, labels));
  },
  unlockAccessVerify: async ({ unlockAccessPage, labels }, use) => {
    await use(new UnlockAccessVerifications(unlockAccessPage, labels));
  },
  customerIdPage: async ({ page, labels }, use) => {
    await use(new CustomerIdPage(page, labels));
  },
  customerIdVerify: async ({ customerIdPage, labels }, use) => {
    await use(new CustomerIdVerifications(customerIdPage, labels));
  },
});
export const { Given, When, Then } = createBdd(test);
