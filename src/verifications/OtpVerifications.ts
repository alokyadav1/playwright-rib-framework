import { expect } from "@playwright/test";
import { OtpEntry } from "../components/OtpEntry.js";

export class OtpVerifications {
  constructor(private readonly otpEntry: OtpEntry) {}

  async hasBeenEntered(): Promise<void> {
    await expect(this.otpEntry.input).toHaveValue(/^.{6}$/, {
      timeout: 60_000,
    });
  }
}