import puppeteer from 'puppeteer';
import { getZillowUrl } from './getZillowUrl';
import { zillowScraper } from './zillowScraper';

async function scrapeGoogle(searchQuery: string): Promise<string> {
  // Launch Puppeteer browser
  const browser = await puppeteer.launch({ headless: false });

  // Create a new page
  const page = await browser.newPage();
  
  try {
    // Navigate to Google
    await page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });

    // Wait for 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Enter search query
    await page.type('textarea.gLFyf', searchQuery);

    // Press Enter to submit the search
    await page.keyboard.press('Enter');

    // Wait for the search results to load
    await page.waitForSelector('.tF2Cxc');

    // Extract search results
    // Find and click on the investopedia.com link in search results
    //investopedia.com give - The 7 Best Real Estate Websites of 2024
    const investopediaLink = await page.evaluate(() => {
      const results: string[] = [];
      document.querySelectorAll('.tF2Cxc a').forEach((result) => {
        if (result.textContent?.includes('investopedia')) {
          results.push(result.getAttribute('href') || '');
        }
      });
      return results[0];
    });

    const zillowLink = await getZillowUrl(investopediaLink);

    await zillowScraper(zillowLink);
    return zillowLink;

  } finally {
    // Close the browser
    await browser.close();
  }
}

export { scrapeGoogle };
