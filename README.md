# Triangle Calculator API Test Harness

## Overview

This project is a test harness for testing the Triangle Calculator REST API. The API is used to verify the type of a triangle given the lengths of its three sides. This test harness utilizes Playwright and TypeScript for automated testing.

## Prerequisites

- Node.js (v12 or later)
- npm (v6 or later) or yarn

## Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/triangle-calculator-tests.git
   cd triangle-calculator-tests

2. Install Dependencies
    ```sh
   npm install

4. Running Tests
    ```sh
   npm run test

5. Generating Allure report
   ```sh
   allure serve allure-results

6. Run test and generate report 
    ```sh
   ./run-tests.sh (MacOS)

   Double-click the run-tests.bat (Windows)


7. Running Tests with Allure Reporting 

This project uses Allure to generate detailed test reports. Follow the steps below to set up and view Allure reports. 


Install Allure Command-Line Tool

 1. **MacOS**: Install Allure using Homebrew: 
 ```bash 
 brew install allure 
 ``` 

 2. **Windows**: Download the Allure command-line tool from [Allure's GitHub releases](https://github.com/allure-framework/allure2/releases) and follow the installation instructions. 
 
 3. **Linux**: You can also use Homebrew on Linux, or download from [Allure's GitHub releases](https://github.com/allure-framework/allure2/releases) and follow the instructions.
