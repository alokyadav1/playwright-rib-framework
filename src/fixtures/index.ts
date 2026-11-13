import { test as base, createBdd } from "playwright-bdd";
import {
  readBankData,
  readBankLabels,
  type Labels,
  type BankData,
} from "../core/runtime.js";
import { LoginPage } from "../pages/LoginPage.js";
import { LoginVerifications } from "../verifications/LoginVerifications.js";

type Fixtures = {
  labels: Labels;
  data: BankData;
  loginPage: LoginPage;
  loginVerify: LoginVerifications;
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
});
export const { Given, When, Then } = createBdd(test);
