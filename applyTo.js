// applyTo.js

const puppeteer = require("puppeteer");

async function submitApplication(input) {
  const {
    jobUrl,
    fullName = "John Doe",
    email = "john@example.com",
    phone = "1234567890",
    coverLetter = "Dear Hiring Manager...",
  } = input;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto(jobUrl, { waitUntil: "networkidle2" });
    // ... fill form, etc ...
    await page.waitForNavigation({ waitUntil: "networkidle0" });
    await browser.close();
    return "Application submitted!";
  } catch (error) {
    await browser.close();
    return `Failed: ${error.message}`;
  }
}

module.exports = { submitApplication };
