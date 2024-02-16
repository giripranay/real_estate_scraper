const express = require('express');
const { scrapeGoogle } = require('./scrapeGoogle.js');


const app = express();
const port = 3000;

app.use(express.json());

app.post('/scrape', async (req, res) => {
  const { searchQuery } = req.body;
  if (!searchQuery) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    const results = await scrapeGoogle(searchQuery);
    return res.json({ results });
  } catch (error) {
    console.error('Error scraping Google:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
