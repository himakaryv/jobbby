import express from "express";
import bodyParser from "body-parser";
import puppeteer from "puppeteer";

const app = express();
app.use(bodyParser.json());

app.post("/submitApplication", async (req, res) => {
  const { jobUrl, fullName, email, phone, coverLetter, resumePath } = req.body;
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(jobUrl, { waitUntil: "networkidle2" });

    // Example selectors; adjust to match the actual job form
    await page.type('input[name="firstName"]', fullName.split(" ")[0]);
    await page.type('input[name="lastName"]', fullName.split(" ")[1] || "");
    await page.type('input[name="email"]', email);
    await page.type('input[name="phone"]', phone);
    await page.type('textarea[name="coverLetter"]', coverLetter);
    // Uncomment below if you want to handle a file upload:
    // const [fileChooser] = await Promise.all([
    //   page.waitForFileChooser(),
    //   page.click('input[type="file"]')
    // ]);
    // await fileChooser.accept([resumePath]);
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: "networkidle0" });
    await browser.close();
    res.json({
      status: "success",
      message: "Application submitted successfully!",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
