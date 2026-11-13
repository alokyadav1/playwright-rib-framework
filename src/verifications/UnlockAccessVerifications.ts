import { expect } from "@playwright/test";
import { getLabel } from "../core/label-key.js";
import type { Labels } from "../core/runtime.js";
import { UnlockAccessPage } from "../pages/UnlockAccessPage.js";

export class UnlockAccessVerifications {
  constructor(
    private readonly unlockAccess: UnlockAccessPage,
    private readonly labels: Labels,
  ) {}

  async showsInvalidPanFeedback(messageKey: string): Promise<void> {
    const message = this.unlockAccess.panValidationMessage(messageKey);
    await expect(message).toBeVisible();
    await expect(message).toHaveText(getLabel(this.labels, messageKey));
  }

  async showsOtpVerification(): Promise<void> {
    await Promise.all([
      expect(this.unlockAccess.otpInput).toBeVisible({ timeout: 60_000 }),
      expect(this.unlockAccess.otpSubmitButton).toBeVisible({
        timeout: 60_000,
      }),
    ]);
  }

  async otpHasBeenEntered(): Promise<void> {
    await expect(this.unlockAccess.otpInput).toHaveValue(/^.{6}$/, {
      timeout: 60_000,
    });
  }

  async showsFetchErrorModal(messageKey: string): Promise<void> {
    await expect(this.unlockAccess.resultAlert).toBeVisible({
      timeout: 60_000,
    });
    await expect(
      this.unlockAccess.resultAlert.getByRole("heading", {
        name: getLabel(this.labels, "loginErrorModalTitle"),
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      this.unlockAccess.resultAlert.getByText(
        getLabel(this.labels, messageKey),
        {
          exact: true,
        },
      ),
    ).toBeVisible();
    await expect(
      this.unlockAccess.resultAlert.getByRole("button", {
        name: getLabel(this.labels, "loginOkayButton"),
        exact: true,
      }),
    ).toBeVisible();
  }

  async showsAlreadyUnlockedModal(messageKey: string): Promise<void> {
    await expect(this.unlockAccess.resultAlert).toBeVisible({
      timeout: 60_000,
    });
    await expect(
      this.unlockAccess.resultAlert.getByText(
        getLabel(this.labels, messageKey),
        {
          exact: true,
        },
      ),
    ).toBeVisible();
    await expect(
      this.unlockAccess.resultAlert.getByRole("button", {
        name: getLabel(this.labels, "unlockContinueToLoginButton"),
        exact: true,
      }),
    ).toBeVisible();
  }
}
