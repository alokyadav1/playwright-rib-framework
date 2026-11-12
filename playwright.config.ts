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
  workers: 1,
  reporter: [["html", { open: "never" }]],
  use: {
    baseURL,
    storageState: process.env.AUTH_STATE || undefined,
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
    },
    timezoneId: "Asia/Kolkata",
    locale: browserLocale, // same LOCALE value that picks the label file
    trace: "off",
    screenshot: "off",
    video: "off",
    permissions: ["geolocation"],
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
