# Paxento Playwright Test Automation

Minimalist test automation setup with Playwright

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run all tests
npx playwright test

# 3. Run specific test
npx playwright test example.spec.ts

Command Description
npx playwright test Run all tests
npx playwright test file.spec.ts Run specific test file
npx playwright test --ui Launch interactive UI
npx playwright test --project=chromium Run in Chromium only
npx playwright test --grep "@tag" Run tests with specific tag
npx playwright test --trace on Record execution traces

Requirements
Node.js 20+
npm
