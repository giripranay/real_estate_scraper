const axios = require('axios');
const cheerio = require('cheerio');
const { getChildPageContent } = require('./childPage.js');
 
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
    const photoUrls = [];
    $(element).find('.StyledPropertyCardPhoto-c11n-8-84-3__sc-ormo34-0.dGCVxQ img').each((i, img) => {
      photoUrls.push($(img).attr('src'));
    });
    const propertyUrl = $(element).find('a[data-test="property-card-link"]').attr('href');
    // const childContent = await getChildPageContent(propertyUrl);
    const article = {
      address,
      price,
      bedrooms,
      bathrooms,
      sqft,
      type,
      photoUrls,
      propertyUrl
      // childContent
    };

    articles.push(article);
  });

  return articles;
}
async function zillowScrapper(){

  let count = 1;

let city = "Dallas, TX";

// URL template with placeholders for dynamic values
let url = `https://www.zillow.com/dallas-tx/?searchQueryState={"isMapVisible":false,"mapBounds":{"north":33.016646,"south":32.618763,"east":-96.555516,"west":-96.999347},"usersSearchTerm":${city},"filterState":{"sort":{"value":"globalrelevanceex"}},"isListVisible":true,"regionSelection":[{"regionId":38128,"regionType":6}],"pagination":{"currentPage":${count}}}`;
  try{
    var new_article = await getArticles(url);
    return new_article;
  }
  catch (error) {
    console.error(error);
    return [];
  }
}

async function zillowListings(){
  let data = await zillowScrapper();
  console.log(data);
  return data
}

//zillowListings();
exports.zillowListings = zillowListings;