import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 2000,
    fullyParallel: true
    
});

