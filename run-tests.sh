#!/bin/bash

# Run Playwright tests
npm run test

# Generate and serve Allure report
allure serve allure-results
