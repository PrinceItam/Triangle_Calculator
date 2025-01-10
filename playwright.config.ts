import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 5000,
    fullyParallel: true,
    reporter: [['line'], ['allure-playwright']],
});
