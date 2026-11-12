import { test as base, createBdd } from "playwright-bdd";
import {
  readBankData,
  readBankLabels,
  type Labels,
  type BankData,
} from "../core/runtime.js";

type Fixtures = {
  labels: Labels;
  data: BankData;
};
export const test = base.extend<Fixtures>({
  labels: ({}, use) => use(readBankLabels()),
  data: ({}, use) => use(readBankData({ decrypt: false })),
});
export const { Given, When, Then } = createBdd(test);
