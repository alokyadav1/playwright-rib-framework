import { randomInt } from "node:crypto";
import { getByKey } from "../../src/core/data-key.js";
import { Given, Then, When, test } from "../../src/fixtures/index.js";
import type { UnlockAccessDetails } from "../../src/pages/UnlockAccessPage.js";

Given(
  "The user opens the Bandhan Bank unlock access form {string}",
  async ({ unlockAccessPage, data }, pathKey: string) => {
    await unlockAccessPage.openUnlockAccess(getByKey<string>(data, pathKey));
  },
);

When(
  "The user enters personal details from {string}",
  async ({ unlockAccessPage, data }, dataKey: string) => {
    await unlockAccessPage.enterPersonalDetails(
      getByKey<UnlockAccessDetails>(data, dataKey),
    );
  },
);

When(
  "The user selects Continue for unlock access",
  async ({ unlockAccessPage }) => {
    await unlockAccessPage.submitPersonalDetails();
  },
);

Then(
  "The user sees invalid PAN feedback {string} below PAN",
  async ({ unlockAccessVerify }, messageKey: string) => {
    await unlockAccessVerify.showsInvalidPanFeedback(messageKey);
  },
);

Then(
  "The user sees unlock OTP verification",
  async ({ unlockAccessVerify }) => {
    test.setTimeout(90_000);
    await unlockAccessVerify.showsOtpVerification();
  },
);

When(
  "The user enters the received unlock OTP",
  async ({ unlockAccessVerify }) => {
    test.setTimeout(90_000);
    await unlockAccessVerify.otpHasBeenEntered();
  },
);

When(
  "The script submits the received unlock OTP",
  async ({ unlockAccessPage }) => {
    await unlockAccessPage.submitOtp();
  },
);

When(
  "The user enters a generated six-digit unlock OTP",
  async ({ unlockAccessPage }) => {
    await unlockAccessPage.enterOtp(randomInt(100_000, 1_000_000).toString());
  },
);

When(
  "The user submits the generated unlock OTP",
  async ({ unlockAccessPage }) => {
    await unlockAccessPage.submitOtp();
  },
);

Then(
  "The user sees unlock fetch Error modal {string}",
  async ({ unlockAccessVerify }, messageKey: string) => {
    await unlockAccessVerify.showsFetchErrorModal(messageKey);
  },
);

Then(
  "The user sees the already-unlocked information modal {string}",
  async ({ unlockAccessVerify }, messageKey: string) => {
    await unlockAccessVerify.showsAlreadyUnlockedModal(messageKey);
  },
);
