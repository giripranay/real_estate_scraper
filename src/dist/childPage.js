const axios = require('axios');
const { DOMParser } = require('xmldom');

async function getChildPageContent(url) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
        headers: {
            'User-Agent': 'Node/12.14.3'
        }
    };

    try {
        const response = await axios.request(config);
        const html = response.data;
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const divElements = doc.getElementsByTagName('div');
        let text = "";
        for (let i = 0; i < divElements.length; i++) {
            const divText = divElements[i].textContent.trim();
            text += divText; // Fixed concatenation
        }
        return text;
    } catch (error) {
        console.log(error);
        return null; // Return null or handle the error as appropriate
    }
}

async function childPageMain() {
    return await getChildPageContent('https://www.zillow.com/homedetails/1514-N-Washington-Ave-Dallas-TX-75204/339983480_zpid/');
}

// Call async function within another async function or use .then() to handle promise resolution
async function run(url) {
    // const content = await childPageMain();
    const content = await getChildPageContent(url);
    return content
}

// run(); // Call the async function to start execution

exports.getChildPageContent = run;
