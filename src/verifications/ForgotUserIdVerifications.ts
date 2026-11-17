import { expect, type Locator } from "@playwright/test";
import { getLabel } from "../core/label-key.js";
import type { Labels } from "../core/runtime.js";
import { ForgotUserIdPage } from "../pages/ForgotUserIdPage.js";

export class ForgotUserIdVerifications {
  constructor(
    private readonly forgotUserId: ForgotUserIdPage,
    private readonly labels: Labels,
  ) {}

  async showsRequiredMessagesTogether(): Promise<void> {
    await Promise.all([
      this.expectRequiredMessage(
        this.forgotUserId.customerIdMessageContainer,
        "fuidRequiredCustomerIdMessage",
      ),
      this.expectRequiredMessage(
        this.forgotUserId.cardNumberMessageContainer,
        "fuidRequiredCardNumberMessage",
      ),
      this.expectRequiredMessage(
        this.forgotUserId.expiryMonthMessageContainer,
        "fuidRequiredExpiryMonthMessage",
      ),
      this.expectRequiredMessage(
        this.forgotUserId.atmPinMessageContainer,
        "fuidRequiredAtmPinMessage",
      ),
    ]);
  }

  async showsCardNumber(value: string): Promise<void> {
    const expected = value.length > 16 ? value.slice(0, 16) : value;
    await expect(this.forgotUserId.cardNumberInput).toHaveValue(expected);
  }

  async showsInvalidAtmPinLengthMessage(messageKey: string): Promise<void> {
    const message = getLabel(this.labels, messageKey);
    await expect(
      this.forgotUserId.atmPinMessageContainer.getByText(message, {
        exact: true,
      }),
    ).toHaveText(message);
  }

  async showsOtpVerification(): Promise<void> {
    await Promise.all([
      expect(this.forgotUserId.otpInput).toBeVisible({ timeout: 60_000 }),
      expect(this.forgotUserId.otpSubmitButton).toBeVisible({ timeout: 60_000 }),
    ]);
  }

  async showsIncorrectDebitCardModal(messageKey: string): Promise<void> {
    const message = getLabel(this.labels, messageKey);
    const modal = this.forgotUserId.resultAlert.filter({ hasText: message });
    await expect(modal).toHaveCount(1, { timeout: 60_000 });
    await expect(modal).toBeVisible();
    await expect(modal.getByRole("heading", {
      name: getLabel(this.labels, "loginErrorModalTitle"),
      exact: true,
    })).toBeVisible();
    await expect(modal.getByText(message, { exact: true })).toHaveText(message);
    await expect(modal.getByRole("button", {
      name: getLabel(this.labels, "loginOkayButton"),
      exact: true,
    })).toBeVisible();
    await expect(this.forgotUserId.modalIcon(modal)).toBeVisible();
  }

  async showsNoExpiredYearOptions(): Promise<void> {
    const currentYear = this.currentYearInIndia();
    await expect
      .poll(async () => {
        const years = await this.forgotUserId.expiryOptions.allTextContents();
        return years.some((year) => Number(year.trim()) < currentYear);
      })
      .toBe(false);
  }

  async showsNoExpiredMonthOptions(): Promise<void> {
    const currentMonth = this.currentMonthInIndia();
    await expect
      .poll(async () => {
        const months = await this.forgotUserId.expiryOptions.allTextContents();
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
