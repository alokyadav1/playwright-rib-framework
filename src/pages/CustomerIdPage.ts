import type { Locator, Page } from '@playwright/test';
import { OtpEntry } from '../components/OtpEntry.js';
import { getLabel } from '../core/label-key.js';
import type { Labels } from '../core/runtime.js';
import customerIdLocators from '../locators/customerId.json' with { type: 'json' };
import { BasePage } from './BasePage.js';

export type CustomerIdLookupDetails = {
  mobile: string;
  dateOfBirth: string;
};

export class CustomerIdPage extends BasePage {
  readonly mobileInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly continueButton: Locator;
  readonly mobileRequiredContainer: Locator;
  readonly dateOfBirthRequiredContainer: Locator;
  readonly otpInput: Locator;
  readonly otpSubmitButton: Locator;
  readonly resultAlert: Locator;
  private readonly otpEntry: OtpEntry;

  constructor(page: Page, private readonly labels: Labels) {
    super(page, customerIdLocators);
    this.mobileInput = page.getByRole('textbox', {
      name: getLabel(labels, 'kcidMobileField'),
      exact: true,
    });
    this.dateOfBirthInput = page.getByRole('combobox', {
      name: getLabel(labels, 'kcidDateOfBirthField'),
      exact: true,
    });
    this.continueButton = page.getByRole('button', {
      name: getLabel(labels, 'kcidContinueButton'),
      exact: true,
    });
    this.mobileRequiredContainer = this.element('mobileRequiredContainer');
    this.dateOfBirthRequiredContainer = this.element('dateOfBirthRequiredContainer');
    this.otpEntry = new OtpEntry(page, labels);
    this.otpInput = this.otpEntry.input;
    this.otpSubmitButton = this.otpEntry.submitButton;
    this.resultAlert = page.getByRole('alert');
  }

  async openCustomerIdForm(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async enterLookupDetails(details: CustomerIdLookupDetails): Promise<void> {
    await this.mobileInput.fill(details.mobile);
    await this.dateOfBirthInput.fill(details.dateOfBirth);
  }

  async submitLookupDetails(): Promise<void> {
    await this.continueButton.click();
  }

  async enterMobileSample(value: string): Promise<void> {
    await this.mobileInput.fill(value);
  }

  async typeAdditionalMobileCharacter(character: string): Promise<void> {
    await this.mobileInput.pressSequentially(character);
  }

  modalIcon(modal: Locator): Locator {
    return this.element('modalIcon', modal);
  }
}