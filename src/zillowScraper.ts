import puppeteer from 'puppeteer';

async function zillowScraper(url: string): Promise<string> {
  // Launch Puppeteer browser
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();
  try {
    // Navigate to zillow
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    return "sdasd";
  } finally {
    // Close the browser
    await browser.close();
  }
}

export { zillowScraper };
