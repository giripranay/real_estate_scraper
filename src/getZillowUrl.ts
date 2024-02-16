import puppeteer from 'puppeteer';

async function getZillowUrl(url: string): Promise<string> {
  // Launch Puppeteer browser
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  try {

    // Navigate to investopedia
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Choose Zillow link out of top 7 websites on investopedia.
    const link = await page.evaluate(() => {
      const hrefs: any[] = [];
      document.querySelectorAll('ul.summary-list__content li a').forEach(link => {
        if (link.textContent?.includes('Zillow')) {
          hrefs.push(link.getAttribute('href') || "");
        }
      });
      return hrefs[0];
    });

    return link
  } finally {
    // Close the browser
    await browser.close();
  }
}

export { getZillowUrl };
