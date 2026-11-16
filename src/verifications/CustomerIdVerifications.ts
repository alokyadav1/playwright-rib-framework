import { expect } from '@playwright/test';
import { getLabel } from '../core/label-key.js';
import type { Labels } from '../core/runtime.js';
import { CustomerIdPage } from '../pages/CustomerIdPage.js';

export class CustomerIdVerifications {
  constructor(
    private readonly customerId: CustomerIdPage,
    private readonly labels: Labels,
  ) {}

  async showsRequiredMessagesTogether(): Promise<void> {
    await Promise.all([
      expect(
        this.customerId.mobileRequiredContainer.getByText(
          getLabel(this.labels, 'kcidRequiredMobileMessage'),
          { exact: true },
        ),
      ).toHaveText(getLabel(this.labels, 'kcidRequiredMobileMessage')),
      expect(
        this.customerId.dateOfBirthRequiredContainer.getByText(
          getLabel(this.labels, 'kcidRequiredDateOfBirthMessage'),
          { exact: true },
        ),
      ).toHaveText(getLabel(this.labels, 'kcidRequiredDateOfBirthMessage')),
    ]);
  }

  async showsMobileValue(value: string): Promise<void> {
    await expect(this.customerId.mobileInput).toHaveValue(value);
  }

  async showsErrorModal(messageKey: string): Promise<void> {
    const message = getLabel(this.labels, messageKey);
    const modal = this.customerId.resultAlert.filter({ hasText: message });
    await expect(modal).toHaveCount(1);
    await expect(modal).toBeVisible({ timeout: 60_000 });
    await expect(
      modal.getByRole('heading', {
        name: getLabel(this.labels, 'loginErrorModalTitle'),
        exact: true,
      }),
    ).toBeVisible();
    await expect(modal.getByText(message, { exact: true })).toBeVisible();
    await expect(
      modal.getByRole('button', {
        name: getLabel(this.labels, 'loginOkayButton'),
        exact: true,
      }),
    ).toBeVisible();
    await expect(this.customerId.modalIcon(modal)).toBeVisible();
  }

  async showsOtpVerification(): Promise<void> {
    await Promise.all([
      expect(this.customerId.otpInput).toBeVisible({ timeout: 60_000 }),
      expect(this.customerId.otpSubmitButton).toBeVisible({ timeout: 60_000 }),
    ]);
  }

  async showsRetrievalSuccess(
    headingKey: string,
    messageKey: string,
    buttonKey: string,
  ): Promise<void> {
    const heading = getLabel(this.labels, headingKey);
    const modal = this.customerId.resultAlert.filter({ hasText: heading });
    await Promise.all([
      expect(modal).toHaveCount(1),
      expect(modal).toBeVisible({ timeout: 60_000 }),
      expect(
        modal.getByRole('heading', {
          name: heading,
          exact: true,
        }),
      ).toBeVisible({ timeout: 60_000 }),
      expect(
        modal.getByText(getLabel(this.labels, messageKey), {
          exact: true,
        }),
      ).toBeVisible({ timeout: 60_000 }),
      expect(
        modal.getByRole('button', {
          name: getLabel(this.labels, buttonKey),
          exact: true,
        }),
      ).toBeVisible({ timeout: 60_000 }),
      expect(this.customerId.modalIcon(modal)).toBeVisible({ timeout: 60_000 }),
    ]);
  }
}