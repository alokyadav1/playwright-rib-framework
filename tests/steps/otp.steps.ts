import { randomInt } from "node:crypto";
import { When, test } from "../../src/fixtures/index.js";

When("The user enters the received OTP", async ({ otpVerify }) => {
  test.setTimeout(90_000);
  await otpVerify.hasBeenEntered();
});

When("The user enters a generated incorrect OTP", async ({ otpEntry }) => {
  await otpEntry.enter(randomInt(100_000, 1_000_000).toString());
});

When("The user submits the OTP", async ({ otpEntry }) => {
  test.setTimeout(90_000);
  await otpEntry.submit();
});