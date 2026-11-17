import type { Locator, Page } from "@playwright/test";
import { getLabel } from "../core/label-key.js";
import type { Labels } from "../core/runtime.js";
import forgotPasswordLocators from "../locators/forgotPassword.json" with { type: "json" };
import { BasePage } from "./BasePage.js";

export class ForgotPasswordPage extends BasePage {
  readonly customerIdInput: Locator;
  readonly cardNumberInput: Locator;
  readonly atmPinInput: Locator;
  readonly expiryMonthSelect: Locator;
  readonly expiryYearSelect: Locator;
  readonly continueButton: Locator;
  readonly customerIdMessageContainer: Locator;
  readonly cardNumberMessageContainer: Locator;
  readonly atmPinMessageContainer: Locator;
  readonly expiryMonthMessageContainer: Locator;
  readonly expiryYearMessageContainer: Locator;
  readonly expiryOptions: Locator;

  constructor(page: Page, labels: Labels) {
    super(page, forgotPasswordLocators);
    this.customerIdInput = page.getByRole("textbox", {
      name: getLabel(labels, "fpwdCustomerIdField"),
      exact: true,
    });
    this.cardNumberInput = page.getByRole("textbox", {
      name: getLabel(labels, "fpwdCardNumberField"),
      exact: true,
    });
    this.atmPinInput = page.getByRole("textbox", {
      name: getLabel(labels, "fpwdAtmPinField"),
      exact: true,
    });
    const expiryWidgets = this.element("expirySelectWidget");
    const monthWidget = expiryWidgets.filter({ hasText: "MM" });
    const yearWidget = expiryWidgets.filter({
      hasText: this.currentYearInIndia().toString(),
    });
    this.expiryMonthSelect = page
      .getByRole("combobox", {
        name: getLabel(labels, "fpwdExpiryField"),
        exact: true,
      })
      .filter({ hasText: "MM" });
    this.expiryYearSelect = page
      .getByRole("combobox", {
        name: getLabel(labels, "fpwdExpiryField"),
        exact: true,
      })
      .filter({ hasText: this.currentYearInIndia().toString() });
    this.continueButton = page.getByRole("button", {
      name: getLabel(labels, "fpwdContinueButton"),
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
    this.atmPinMessageContainer = this.element(
      "inlineMessageContainer",
      pinWidget,
    );
    this.expiryMonthMessageContainer = this.element(
      "inlineMessageContainer",
      monthWidget,
    );
    this.expiryYearMessageContainer = this.element(
      "inlineMessageContainer",
      yearWidget,
    );
    this.expiryOptions = page.getByRole("option");
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

  async selectEarliestAvailableExpiryMonth(): Promise<void> {
    await this.expiryMonthSelect.click();
    const currentMonth = this.currentMonthInIndia();
    const availableMonths = (await this.expiryOptions.allTextContents())
      .map((label) => ({ label: label.trim(), month: Number(label.trim()) }))
      .filter(({ month }) => Number.isInteger(month) && month >= currentMonth)
      .sort((left, right) => left.month - right.month);
    const selectedMonth = availableMonths[0];
    if (!selectedMonth) {
      throw new Error("No non-expired Forgot Password expiry month is available");
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
