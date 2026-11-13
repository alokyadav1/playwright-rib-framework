import type { Locator, Page } from "@playwright/test";
import otpEntryLocators from "../locators/otpEntry.json" with { type: "json" };

export class OtpEntry {
  readonly input: Locator;

  constructor(page: Page) {
    this.input = page.locator(otpEntryLocators.otpInput);
  }
}
