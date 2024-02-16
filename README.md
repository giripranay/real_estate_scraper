# real_estate_scraper
A web scraper project that crawls zillow house listings website and returns json data for the given city.


Clone Repo:
git clone https://github.com/giripranay/real_estate_scraper.git

#Navigate to the project directory:
cd .\real_estate_scraper  

#Install dependencies:
npm install


#Navigate to the dist directory:
cd .\src\dist\

#Run the server:
node index.js

#Open Postman and make a POST request to http://localhost:3000/scrape with JSON data containing the search text:
{
  "searchQuery": "top home listing websites"
}


#The real estate listing websites enforce robust security measures to prevent unauthorized activities and ensure the integrity of their platforms. As a result, there are limitations on the amount of activity that can be conducted on these sites to avoid being blocked or restricted.

In consideration of these limitations and to prevent potential disruptions, I have limited the number of records scraped during my testing to avoid triggering any security measures that could block my IP address. This cautious approach allows me to gather sufficient data for testing purposes without risking access issues or interruptions to the service.



