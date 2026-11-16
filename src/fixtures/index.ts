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
import { OtpEntry } from "../components/OtpEntry.js";
import { OtpVerifications } from "../verifications/OtpVerifications.js";
import { ForgotUserIdPage } from "../pages/ForgotUserIdPage.js";
import { ForgotUserIdVerifications } from "../verifications/ForgotUserIdVerifications.js";

type Fixtures = {
  labels: Labels;
  data: BankData;
  loginPage: LoginPage;
  loginVerify: LoginVerifications;
  unlockAccessPage: UnlockAccessPage;
  unlockAccessVerify: UnlockAccessVerifications;
  customerIdPage: CustomerIdPage;
  customerIdVerify: CustomerIdVerifications;
  otpEntry: OtpEntry;
  otpVerify: OtpVerifications;
  forgotUserIdPage: ForgotUserIdPage;
  forgotUserIdVerify: ForgotUserIdVerifications;
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
  otpEntry: async ({ page, labels }, use) => {
    await use(new OtpEntry(page, labels));
  },
  otpVerify: async ({ otpEntry }, use) => {
    await use(new OtpVerifications(otpEntry));
  },
  forgotUserIdPage: async ({ page, labels }, use) => {
    await use(new ForgotUserIdPage(page, labels));
  },
  forgotUserIdVerify: async ({ forgotUserIdPage, labels }, use) => {
    await use(new ForgotUserIdVerifications(forgotUserIdPage, labels));
  },
});
export const { Given, When, Then } = createBdd(test);
