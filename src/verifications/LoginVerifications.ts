import { expect } from '@playwright/test';
import { getLabel } from '../core/label-key.js';
import type { Labels } from '../core/runtime.js';
import { LoginPage } from '../pages/LoginPage.js';

type MessageVisibility = 'visible' | 'hidden';

export class LoginVerifications {
  constructor(
    private readonly login: LoginPage,
    private readonly labels: Labels,
  ) {}

  async proceedIsEnabled(): Promise<void> {
    await expect(this.login.proceedBtn).toBeEnabled();
  }

  async showsTermsError(messageKey: string): Promise<void> {
    await expect(this.login.loginErrorAlert).toHaveCount(1);
    await expect(this.login.loginErrorAlert).toBeVisible();
    await expect(
      this.login.loginErrorAlert.getByRole('heading', {
        name: getLabel(this.labels, 'loginErrorModalTitle'),
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      this.login.loginErrorAlert.getByText(getLabel(this.labels, messageKey), {
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      this.login.loginErrorAlert.getByRole('button', {
        name: getLabel(this.labels, 'loginOkayButton'),
        exact: true,
      }),
    ).toBeVisible();
  }

  async showsTermsErrorIcon(): Promise<void> {
    await expect(this.login.termsErrorImg).toBeVisible();
  }

  async showsInvalidCredentialsModal(
    headingKey: string,
    messageKey: string,
  ): Promise<void> {
    await expect(this.login.loginErrorAlert).toHaveCount(1);
    await expect(this.login.loginErrorAlert).toBeVisible();
    await expect(
      this.login.loginErrorAlert.getByRole('heading', {
        name: getLabel(this.labels, headingKey),
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      this.login.loginErrorAlert.getByText(getLabel(this.labels, messageKey), {
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      this.login.loginErrorAlert.getByRole('button', {
        name: getLabel(this.labels, 'loginTryAgainButton'),
        exact: true,
      }),
    ).toBeVisible();
  }

  async remainsOnLoginPage(): Promise<void> {
    await expect(this.login.userIdInput).toBeVisible();
  }

  async userIdFormatMessageState(
    labelKey: string,
    visibility: MessageVisibility,
  ): Promise<void> {
    const message = this.login.userIdFormatMessage(labelKey);
    if (visibility === 'visible') {
      await expect(message).toBeVisible();
    } else {
      await expect(message).toBeHidden();
    }
  }
}
