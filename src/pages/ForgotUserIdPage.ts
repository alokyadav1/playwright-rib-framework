import type { Locator, Page } from "@playwright/test";
import { OtpEntry } from "../components/OtpEntry.js";
import { getLabel } from "../core/label-key.js";
import type { Labels } from "../core/runtime.js";
import forgotUserIdLocators from "../locators/forgotUserId.json" with { type: "json" };
import { BasePage } from "./BasePage.js";

export type UnassociatedCardProfile = {
  customerId: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  atmPin: string;
};

export class ForgotUserIdPage extends BasePage {
  readonly customerIdInput: Locator;
  readonly cardNumberInput: Locator;
  readonly atmPinInput: Locator;
  readonly expiryMonthSelect: Locator;
  readonly expiryYearSelect: Locator;
  readonly continueButton: Locator;
  readonly customerIdMessageContainer: Locator;
  readonly cardNumberMessageContainer: Locator;
  readonly expiryMonthMessageContainer: Locator;
  readonly atmPinMessageContainer: Locator;
  readonly expiryOptions: Locator;
  readonly otpInput: Locator;
  readonly otpSubmitButton: Locator;
  readonly resultAlert: Locator;

  constructor(page: Page, labels: Labels) {
    super(page, forgotUserIdLocators);
    this.customerIdInput = page.getByRole("textbox", {
      name: getLabel(labels, "fuidCustomerIdField"),
      exact: true,
    });
    this.cardNumberInput = page.getByRole("textbox", {
      name: getLabel(labels, "fuidCardNumberField"),
      exact: true,
    });
    this.atmPinInput = page.getByRole("textbox", {
      name: getLabel(labels, "fuidAtmPinField"),
      exact: true,
    });
    const expiryWidgets = this.element("expirySelectWidget");
    this.expiryMonthSelect = expiryWidgets.filter({ hasText: "MM" });
    this.expiryYearSelect = expiryWidgets.filter({
      hasText: this.currentYearInIndia().toString(),
    });
    this.continueButton = page.getByRole("button", {
      name: getLabel(labels, "fuidContinueButton"),
      exact: true,
    });
    const textWidgets = this.element("textInputWidget");
    const pinWidget = this.element("pinInputWidget").filter({
      has: this.atmPinInput,
    });
    this.customerIdMessageContainer = this.element(
      "inlineMessageContainer",
      textWidgets.filter({ has: this.customerIdInput }),
    );
    this.cardNumberMessageContainer = this.element(
      "inlineMessageContainer",
      textWidgets.filter({ has: this.cardNumberInput }),
    );
    this.expiryMonthMessageContainer = this.element(
      "inlineMessageContainer",
      expiryWidgets.filter({ hasText: "MM" }),
    );
    this.atmPinMessageContainer = this.element(
      "inlineMessageContainer",
      pinWidget,
    );
    this.expiryOptions = page.getByRole("option");
    const otpEntry = new OtpEntry(page, labels);
    this.otpInput = otpEntry.input;
    this.otpSubmitButton = otpEntry.submitButton;
    this.resultAlert = page.getByRole("alert");
  }

  async openForm(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async submit(): Promise<void> {
    await this.continueButton.click();
  }

  async enterCardSample(value: string): Promise<void> {
    await this.cardNumberInput.fill("");
    await this.cardNumberInput.pressSequentially(value);
  }

  async enterCustomerId(customerId: string): Promise<void> {
    await this.customerIdInput.fill(customerId);
  }

  async enterAtmPin(pin: string): Promise<void> {
    await this.atmPinInput.fill(pin);
  }

  async selectExpiry({ expiryMonth, expiryYear }: UnassociatedCardProfile): Promise<void> {
    await this.expiryYearSelect.click();
    await this.page.getByRole("option", { name: expiryYear, exact: true }).click();
    await this.expiryMonthSelect.click();
    await this.page.getByRole("option", { name: expiryMonth, exact: true }).click();
  }

  modalIcon(modal: Locator): Locator {
    return this.element("modalIcon", modal);
  }

  async selectEarliestAvailableExpiryMonth(): Promise<void> {
    await this.expiryMonthSelect.click();
    const currentMonth = this.currentMonthInIndia();
    const availableMonths = (await this.expiryOptions.allTextContents())
      .map((label) => ({ label: label.trim(), month: Number(label.trim()) }))
      .filter(({ month }) => Number.isInteger(month) && month >= currentMonth)
      .sort((left, right) => left.month - right.month);
    const selectedMonth = availableMonths[0];
    if (!selectedMonth) {
      throw new Error("No non-expired expiry month is available");
    }
    await this.page
      .getByRole("option", {
        name: selectedMonth.label,
        exact: true,
      })
      .click();
  }

  async openExpiryYearOptions(): Promise<void> {
    await this.expiryYearSelect.click();
  }

  async openExpiryMonthOptions(): Promise<void> {
    await this.expiryMonthSelect.click();
  }

  async selectCurrentExpiryYearFromOpenOptions(): Promise<void> {
    await this.page
      .getByRole("option", {
        name: this.currentYearInIndia().toString(),
        exact: true,
      })
      .click();
  }

  async selectEarliestFutureExpiryYearFromOpenOptions(): Promise<void> {
    await this.page
      .getByRole("option", {
        name: (this.currentYearInIndia() + 1).toString(),
        exact: true,
      })
      .click();
  }

  private currentYearInIndia(): number {
    return Number(
      new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
      }).format(new Date()),
    );
  }

  private currentMonthInIndia(): number {
    return Number(
      new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        month: "numeric",
      }).format(new Date()),
    );
  }
}
