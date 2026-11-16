import { expect, type Locator } from "@playwright/test";
import { getLabel } from "../core/label-key.js";
import type { Labels } from "../core/runtime.js";
import { ForgotPasswordPage } from "../pages/ForgotPasswordPage.js";

export class ForgotPasswordVerifications {
  constructor(
    private readonly forgotPassword: ForgotPasswordPage,
    private readonly labels: Labels,
  ) {}

  async showsRequiredMessagesTogether(): Promise<void> {
    await Promise.all([
      this.expectRequiredMessage(
        this.forgotPassword.customerIdMessageContainer,
        "fpwdRequiredCustomerIdMessage",
      ),
      this.expectRequiredMessage(
        this.forgotPassword.cardNumberMessageContainer,
        "fpwdRequiredCardNumberMessage",
      ),
      this.expectRequiredMessage(
        this.forgotPassword.atmPinMessageContainer,
        "fpwdRequiredAtmPinMessage",
      ),
    ]);
  }

  async showsNoExpiryValidationFeedback(): Promise<void> {
    await Promise.all([
      expect(this.forgotPassword.expiryMonthMessageContainer).toHaveText(""),
      expect(this.forgotPassword.expiryYearMessageContainer).toHaveText(""),
    ]);
  }

  async showsCardNumber(value: string): Promise<void> {
    await expect(this.forgotPassword.cardNumberInput).toHaveValue(value);
  }

  async showsInvalidAtmPinLengthMessage(messageKey: string): Promise<void> {
    const message = getLabel(this.labels, messageKey);
    await expect(
      this.forgotPassword.atmPinMessageContainer.getByText(message, {
        exact: true,
      }),
    ).toHaveText(message);
  }

  async showsNoExpiredYearOptions(): Promise<void> {
    const currentYear = this.currentYearInIndia();
    await expect
      .poll(async () => {
        const years = await this.forgotPassword.expiryOptions.allTextContents();
        return years.some((year) => Number(year.trim()) < currentYear);
      })
      .toBe(false);
  }

  async showsNoExpiredMonthOptions(): Promise<void> {
    const currentMonth = this.currentMonthInIndia();
    await expect
      .poll(async () => {
        const months = await this.forgotPassword.expiryOptions.allTextContents();
        return months.some((month) => Number(month.trim()) < currentMonth);
      })
      .toBe(false);
  }

  private async expectRequiredMessage(
    container: Locator,
    labelKey: string,
  ): Promise<void> {
    const message = getLabel(this.labels, labelKey);
    await expect(container.getByText(message, { exact: true })).toHaveText(
      message,
    );
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
