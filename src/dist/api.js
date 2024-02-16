const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://www.zillow.com/dallas-tx/?searchQueryState={"isMapVisible":false,"mapBounds":{"north":33.016646,"south":32.618763,"east":-96.555516,"west":-96.999347},"usersSearchTerm":"Dallas, TX","filterState":{"sort":{"value":"globalrelevanceex"}},"isListVisible":true,"regionSelection":[{"regionId":38128,"regionType":6}],"pagination":{}}',
  headers:{
    'User-Agent': 'Node/12.14.3'
  }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
