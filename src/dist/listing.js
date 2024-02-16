const axios = require('axios');
const cheerio = require('cheerio');

async function getArticles(url) {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    // url: 'https://www.zillow.com/dallas-tx/?searchQueryState={"isMapVisible":false,"mapBounds":{"north":33.016646,"south":32.618763,"east":-96.555516,"west":-96.999347},"usersSearchTerm":"Dallas, TX","filterState":{"sort":{"value":"globalrelevanceex"}},"isListVisible":true,"regionSelection":[{"regionId":38128,"regionType":6}],"pagination":{}}',
    url:url,
    headers:{
      'User-Agent': 'Node/12.14.1'
    }
  };

  try {
    const response = await axios.request(config);
    const articles = extractArticles(response.data);
    return articles;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function extractArticles(html) {
  const $ = cheerio.load(html);
  const articles = [];

  $('article[data-test="property-card"]').each((index, element) => {
    const address = $(element).find('address[data-test="property-card-addr"]').text().trim();
    const price = $(element).find('[data-test="property-card-price"]').text().trim();
    const bedrooms = $(element).find('ul.StyledPropertyCardHomeDetailsList-c11n-8-84-3__sc-1xvdaej-0.eYPFID li:nth-child(1)').text().trim();
    const bathrooms = $(element).find('ul.StyledPropertyCardHomeDetailsList-c11n-8-84-3__sc-1xvdaej-0.eYPFID li:nth-child(2)').text().trim();
    const sqft = $(element).find('ul.StyledPropertyCardHomeDetailsList-c11n-8-84-3__sc-1xvdaej-0.eYPFID li:nth-child(3)').text().trim();
    const type = $(element).find('div.StyledPropertyCardDataArea-c11n-8-84-3__sc-yipmu-0.dbDWjx').text().trim();

    const article = {
      address,
      price,
      bedrooms,
      bathrooms,
      sqft,
      type
    };

    articles.push(article);
  });

  return articles;
}

// Usage
// getArticles().then(articles => {
//   console.log(articles);
// }).catch(error => {
//   console.error(error);
// });

async function zillowScraper() {

let count = 0;

let city = "Dallas, TX";

// URL template with placeholders for dynamic values
let url = `https://www.zillow.com/dallas-tx/?searchQueryState={"isMapVisible":false,"mapBounds":{"north":33.016646,"south":32.618763,"east":-96.555516,"west":-96.999347},"usersSearchTerm":${city},"filterState":{"sort":{"value":"globalrelevanceex"}},"isListVisible":true,"regionSelection":[{"regionId":38128,"regionType":6}],"pagination":{"currentPage":${count}}}`;

const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: url,
    headers:{
      'User-Agent': 'Node/12.14.1'
    }
  };

  try {
    const response = await axios.request(config);
    // Load HTML content using Cheerio
    const $ = cheerio.load(response.data);

    // Extract text from the span element
    const countText = $('span.result-count').text();

    // Remove non-numeric characters using regular expression
    const countValue = parseInt(countText.replace(/\D/g, ''), 10);
    listing = [];
    while(count<=countValue){
        // getArticles(url).then(articles => {
        //     listing.concat(articles);
        //   }).catch(error => {
        //     console.error(error);
        //   });
        count = count+1;
        url = `https://www.zillow.com/dallas-tx/?searchQueryState={"isMapVisible":false,"mapBounds":{"north":33.016646,"south":32.618763,"east":-96.555516,"west":-96.999347},"usersSearchTerm":${city},"filterState":{"sort":{"value":"globalrelevanceex"}},"isListVisible":true,"regionSelection":[{"regionId":38128,"regionType":6}],"pagination":{"currentPage":${count}}}`;
        console.log(url);
    }
    console.log(listing);
  } catch (error) {
    console.error(error);
    return [];
  }

}

zillowScraper();