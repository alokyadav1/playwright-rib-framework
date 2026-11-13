import type { Locator, Page } from '@playwright/test';
import loginLocators from '../locators/login.json' with { type: 'json' };
import { getLabel } from '../core/label-key.js';
import type { Labels } from '../core/runtime.js';
import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  readonly userIdInput: Locator;
  readonly passwordInput: Locator;
  readonly termsCheckbox: Locator;
  readonly proceedBtn: Locator;
  readonly loginErrorAlert: Locator;
  readonly termsErrorImg: Locator;

  constructor(page: Page, private readonly labels: Labels) {
    super(page, loginLocators);
    this.userIdInput = page.getByRole('textbox', {
      name: getLabel(labels, 'loginUserIdField'),
      exact: true,
    });
    this.passwordInput = page.getByRole('textbox', {
      name: getLabel(labels, 'loginPasswordField'),
      exact: true,
    });
    this.termsCheckbox = page.getByRole('checkbox', {
      name: getLabel(labels, 'loginTermsAcceptance'),
      exact: true,
    });
    this.proceedBtn = page.getByRole('button', {
      name: getLabel(labels, 'loginProceedButton'),
      exact: true,
    });
    this.loginErrorAlert = page.getByRole('alert');
    this.termsErrorImg = this.element('termsErrorImg');
  }

  async openLoginPage(): Promise<void> {
    await this.page.goto('/');
  }

  async submitLogin(): Promise<void> {
    await this.proceedBtn.click();
  }

  async enterUserId(userId: string): Promise<void> {
    await this.userIdInput.fill(userId);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async acceptTerms(): Promise<void> {
    await this.termsCheckbox.check();
  }

  async focusPassword(): Promise<void> {
    await this.passwordInput.click();
  }

  userIdFormatMessage(labelKey: string): Locator {
    return this.page.getByText(getLabel(this.labels, labelKey), { exact: true });
  }
}
