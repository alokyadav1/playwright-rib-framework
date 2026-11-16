import type { Locator, Page } from "@playwright/test";
import { getLabel } from "../core/label-key.js";
import type { Labels } from "../core/runtime.js";
import otpEntryLocators from "../locators/otpEntry.json" with { type: "json" };

export class OtpEntry {
  readonly input: Locator;
  readonly submitButton: Locator;

  constructor(page: Page, labels: Labels) {
    this.input = page.locator(otpEntryLocators.otpInput);
    this.submitButton = page.getByRole("button", {
      name: getLabel(labels, "loginOtpSubmitButton"),
      exact: true,
    });
  }

  async enter(otp: string): Promise<void> {
    await this.input.fill(otp);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}
