import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const BASE_URL = "https://demo.playwright.dev/";
/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: "./tests/",
  testMatch: "**/*.spec.ts",
  /* Maximum time one test can run for - 180 seconds = 3 min. */
  timeout: 1 * 180 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in await expect(locator).toHaveText();
     */
    timeout: 10000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["list", { printSteps: true }],
    [
      "html",
      {
        open: "never",
        outputFolder: "test_results/html-report",
      },
    ],
    [
      "junit",
      {
        outputFile: "test_results/junit.xml",
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    viewport: { width: 1050, height: 600 },
    /* Maximum time each action such as click() can take. Defaults to 0 (no limit). */
    actionTimeout: 15000,
    /* Base URL to use in actions like await page.goto('/'). */
    baseURL: process.env.BASE_URL || BASE_URL,
    headless: true,
    screenshot: "only-on-failure",

    video: process.env.CI ? "retain-on-failure" : "off",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: process.env.CI ? "retain-on-failure" : "off",
    // launchOptions: {
    //     slowMo: 500,
    // },
    contextOptions: {
      permissions: ["clipboard-read", "clipboard-write"],
    },
  },

  projects: [
    {
      name: "web_chromium",
      use: {
        ...devices["Desktop Chrome"],
        channel: process.env.CI ? undefined : "chrome",
        launchOptions: {
          args: ["--disable-web-security"],
          //   executablePath: process.env.CI
          //     ? "/usr/bin/chromium-browser"
          //     : undefined,
        },
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "./test_results",
  // webServer: {
  // command: "npm run start",
  //   url: BASE_URL,
  //   reuseExistingServer: !process.env.CI,
  //   stdout: "pipe",
  // },
};

/* eslint-disable import/no-default-export */
export default config;