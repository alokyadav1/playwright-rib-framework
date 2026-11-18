import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";
import { getRuntimeContext, readEnvConfig } from "./src/core/runtime.js";

const { browserLocale } = getRuntimeContext();
const { baseURL } = readEnvConfig();

const testDir = defineBddConfig({
  features: "tests/features/**/*.feature",
  // the fixtures file must be listed so playwright-bdd can detect the custom `test` instance
  steps: ["tests/steps/**/*.ts", "src/fixtures/index.ts"],
});

export default defineConfig({
  testDir,
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 2,
  timeout: 60_000,
  reporter: [["html", { open: "never" }]],
  use: {
    baseURL,
    storageState: process.env.AUTH_STATE || undefined,
    timezoneId: "Asia/Kolkata",
    locale: browserLocale, // same LOCALE value that picks the label file
    trace: "on-first-retry",
    screenshot: "off",
    video: "on-first-retry",
    permissions: ["geolocation"],
  },
  projects: [
    {
      name: "automated",
      grepInvert: /@manual-otp/,
      teardown: "manual-otp",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "manual-otp",
      grep: /@manual-otp/,
      workers: 1,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
