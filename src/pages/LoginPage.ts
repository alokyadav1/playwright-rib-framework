import type { Locator, Page } from '@playwright/test';
import { OtpEntry } from '../components/OtpEntry.js';
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
  readonly errorModalImg: Locator;
  readonly otpHeading: Locator;
  readonly challengeMessage: Locator;
  readonly otpInput: Locator;
  readonly otpSubmitBtn: Locator;
  readonly accountCardContainer: Locator;
  private readonly otpEntry: OtpEntry;

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
    this.errorModalImg = this.element('errorModalImg');
    this.otpHeading = page.getByRole('heading', {
      name: getLabel(labels, 'loginOtpHeading'),
      exact: true,
    });
    this.challengeMessage = page.getByText(
      getLabel(labels, 'loginChallengeMessage'),
      { exact: true },
    );
    this.otpEntry = new OtpEntry(page, labels);
    this.otpInput = this.otpEntry.input;
    this.otpSubmitBtn = this.otpEntry.submitButton;
    this.accountCardContainer = this.element('accountCardContainer');
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
    await this.passwordInput.pressSequentially(password);
  }

  async acceptTerms(): Promise<void> {
    await this.termsCheckbox.check();
  }

  async focusPassword(): Promise<void> {
    await this.passwordInput.click();
  }

  async enterOtp(otp: string): Promise<void> {
    await this.otpEntry.enter(otp);
  }

  async submitOtp(): Promise<void> {
    await this.otpEntry.submit();
  }

  userIdFormatMessage(labelKey: string): Locator {
    return this.page.getByText(getLabel(this.labels, labelKey), { exact: true });
  }
}
