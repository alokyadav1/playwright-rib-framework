import type { Locator, Page } from "@playwright/test";
import { OtpEntry } from "../components/OtpEntry.js";
import { getLabel } from "../core/label-key.js";
import type { Labels } from "../core/runtime.js";
import unlockAccessLocators from "../locators/unlockAccess.json" with { type: "json" };
import { BasePage } from "./BasePage.js";

export type UnlockAccessDetails = {
  customerId: string;
  dateOfBirth: string;
  pan: string;
  mothersMaidenName: string;
};

export class UnlockAccessPage extends BasePage {
  private readonly customerIdInput: Locator;
  private readonly dateOfBirthInput: Locator;
  private readonly panInput: Locator;
  private readonly mothersMaidenNameInput: Locator;
  private readonly continueButton: Locator;
  readonly otpInput: Locator;
  readonly otpSubmitButton: Locator;
  readonly resultAlert: Locator;

  constructor(page: Page, private readonly labels: Labels) {
    super(page, unlockAccessLocators);
    this.customerIdInput = page.getByRole("textbox", {
      name: getLabel(labels, "unlockCustomerIdField"),
      exact: true,
    });
    this.dateOfBirthInput = this.element("dateOfBirthInput");
    this.panInput = page.getByRole("textbox", {
      name: getLabel(labels, "unlockPanField"),
      exact: true,
    });
    this.mothersMaidenNameInput = page.getByRole("textbox", {
      name: getLabel(labels, "unlockMothersMaidenNameField"),
      exact: true,
    });
    this.continueButton = page.getByRole("button", {
      name: getLabel(labels, "unlockContinueButton"),
      exact: true,
    });
    this.otpInput = new OtpEntry(page).input;
    this.otpSubmitButton = page.getByRole("button", {
      name: getLabel(labels, "loginOtpSubmitButton"),
      exact: true,
    });
    this.resultAlert = page.getByRole("alert");
  }

  async openUnlockAccess(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async enterPersonalDetails(details: UnlockAccessDetails): Promise<void> {
    await this.customerIdInput.fill(details.customerId);
    await this.dateOfBirthInput.fill(details.dateOfBirth);
    await this.panInput.fill(details.pan);
    await this.mothersMaidenNameInput.fill(details.mothersMaidenName);
  }

  async submitPersonalDetails(): Promise<void> {
    await this.continueButton.click();
  }

  panValidationMessage(messageKey: string): Locator {
    return this.element("panValidationMsg").getByText(
      getLabel(this.labels, messageKey),
      { exact: true },
    );
  }

  async submitOtp(): Promise<void> {
    await this.otpSubmitButton.click();
  }

  async enterOtp(otp: string): Promise<void> {
    await this.otpInput.fill(otp);
  }
}
