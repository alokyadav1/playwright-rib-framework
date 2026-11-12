import type { Locator, Page } from "@playwright/test";
import { getLabel } from "../core/label-key.js";
import type { Labels } from "../core/runtime.js";
import loginLocators from "../locators/login.json" with { type: "json" };
import { BasePage } from "./BasePage.js";

export class LoginPage extends BasePage {
  constructor(
    page: Page,
    private readonly labels: Labels,
  ) {
    super(page, loginLocators);
  }

  get userIdInput(): Locator {
    return this.page.getByRole("textbox", {
      name: getLabel(this.labels, "loginUserIdField"),
      exact: true,
    });
  }

  get passwordInput(): Locator {
    return this.page.getByRole("textbox", {
      name: getLabel(this.labels, "loginPasswordField"),
      exact: true,
    });
  }

  get termsCheckbox(): Locator {
    return this.page.getByRole("checkbox", {
      name: getLabel(this.labels, "loginTermsAcceptance"),
      exact: true,
    });
  }

  get proceedButton(): Locator {
    return this.page.getByRole("button", {
      name: getLabel(this.labels, "loginProceedButton"),
      exact: true,
    });
  }

  get termsErrorModal(): Locator {
    return this.page.getByRole("alert");
  }

  get termsErrorIcon(): Locator {
    return this.element("termsErrorIconImg", this.termsErrorModal);
  }

  async open(): Promise<void> {
    await this.page.goto("/", {
      waitUntil: "domcontentloaded",
      timeout: 60_000,
    });
    await this.userIdInput.waitFor({ state: "visible", timeout: 60_000 });
  }

  async enterUserId(userId: string): Promise<void> {
    await this.userIdInput.fill(userId);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async focusUserIdField(): Promise<void> {
    await this.userIdInput.click();
  }

  async focusPasswordField(): Promise<void> {
    await this.passwordInput.click();
  }

  async selectProceed(): Promise<void> {
    await this.proceedButton.click();
  }

  async clickOutsideTermsErrorModal(): Promise<void> {
    await this.element("termsErrorModalViewport").click({
      position: { x: 10, y: 10 },
    });
  }

  async pressEscape(): Promise<void> {
    await this.page.keyboard.press("Escape");
  }

  async selectTermsErrorOkay(labelKey: string): Promise<void> {
    await this.termsErrorModal
      .getByRole("button", {
        name: getLabel(this.labels, labelKey),
        exact: true,
      })
      .click();
  }
}
