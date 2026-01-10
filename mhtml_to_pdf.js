const puppeteer = require("puppeteer");
const path = require("path");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  const input = process.argv[2];
  const output = process.argv[3] || "output.pdf";

  if (!input) {
    console.log("Usage: node mhtml_to_pdf.js input.mhtml output.pdf");
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage"
    ]
  });

  const page = await browser.newPage();
  page.setDefaultTimeout(0);

  console.log("Loading MHTML...");
  await page.goto("file://" + path.resolve(input), {
    waitUntil: "domcontentloaded",
    timeout: 0
  });

  await sleep(4000);

  const frames = page.frames();
  console.log(`Found ${frames.length} frames`);

  // Find the frame with the largest HTML content (usually the manual body)
  let mainFrame = null;
  let maxSize = 0;

  for (let i = 0; i < frames.length; i++) {
    try {
      const html = await frames[i].content();
      const size = html.length;
      console.log(`Frame ${i}: ${size} bytes`);
      if (size > maxSize) {
        maxSize = size;
        mainFrame = frames[i];
      }
    } catch (e) {
      console.log(`Frame ${i}: unable to read`);
    }
  }

  if (!mainFrame) {
    console.error("Could not find a suitable content frame.");
    await browser.close();
    process.exit(1);
  }

  console.log("Using largest frame as main manual content...");

  const content = await mainFrame.content();

  console.log("Rendering full manual...");
  await page.setContent(content, {
    waitUntil: "domcontentloaded",
    timeout: 0
  });

  await sleep(6000);

  console.log("Generating PDF...");
  await page.pdf({
    path: output,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    scale: 1
  });

  await browser.close();
  console.log("PDF created successfully:", output);
})();
