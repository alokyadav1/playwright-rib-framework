import { expect, type Locator } from '@playwright/test';
import { getLabel } from '../core/label-key.js';
import type { Labels } from '../core/runtime.js';
import type { LoginPage } from '../pages/LoginPage.js';

export class LoginVerifications {
  constructor(
    private readonly loginPage: LoginPage,
    private readonly labels: Labels,
  ) {}

  async termsCheckboxIsUnchecked(): Promise<void> {
    await expect(this.loginPage.termsCheckbox).not.toBeChecked();
  }

  async proceedIsEnabled(): Promise<void> {
    await expect(this.loginPage.proceedButton).toBeEnabled();
  }

  async showsTermsErrorModal(titleKey: string, messageKey: string): Promise<void> {
    const modal = this.loginPage.termsErrorModal;
    await expect(modal).toBeVisible();
    await expect(
      modal.getByRole('heading', { name: getLabel(this.labels, titleKey), exact: true }),
    ).toBeVisible();
    await expect(modal.getByText(getLabel(this.labels, messageKey), { exact: true })).toBeVisible();
  }

  async showsTermsErrorIcon(): Promise<void> {
    await expect(this.loginPage.termsErrorIcon).toBeVisible();
  }

  async termsErrorModalShowsOkayButton(labelKey: string): Promise<void> {
    await expect(
      this.loginPage.termsErrorModal.getByRole('button', {
        name: getLabel(this.labels, labelKey),
        exact: true,
      }),
    ).toBeVisible();
  }

  async termsErrorModalRemainsOpen(): Promise<void> {
    await expect(this.loginPage.termsErrorModal).toBeVisible();
  }

  async loginPageIsVisibleAfterTermsError(): Promise<void> {
    await expect(this.loginPage.userIdInput).toBeVisible();
    await expect(this.loginPage.termsErrorModal).toBeHidden();
  }

  async retainsUserId(userId: string): Promise<void> {
    await this.inputRetainsValue(this.loginPage.userIdInput, userId);
  }

  async passwordIsMasked(): Promise<void> {
    const input = this.loginPage.passwordInput;
    await expect(input).toHaveAttribute('type', 'password');
    await expect
      .poll(() =>
        input.evaluate(
          (element) => element instanceof HTMLInputElement && element.value.length > 0,
        ),
      )
      .toBe(true);
  }

  async passwordIsCleared(): Promise<void> {
    await expect(this.loginPage.passwordInput).toHaveValue('');
  }

  private async inputRetainsValue(input: Locator, expectedValue: string): Promise<void> {
    await expect
      .poll(() =>
        input.evaluate(
          (element, value) => element instanceof HTMLInputElement && element.value === value,
          expectedValue,
        ),
      )
      .toBe(true);
  }
}
