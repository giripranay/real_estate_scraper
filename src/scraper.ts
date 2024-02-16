import puppeteer from 'puppeteer';

async function scrapeGoogle(searchQuery: string): Promise<string[]> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`);

  const searchResults = await page.evaluate(() => {
    const results: string[] = [];
    document.querySelectorAll('.tF2Cxc').forEach((result) => {
      results.push(result.textContent || '');
    });
    return results;
  });

  await browser.close();
  return searchResults;
}

export { scrapeGoogle };
