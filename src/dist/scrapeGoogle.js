"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeGoogle = void 0;
const puppeteer_1 = require("puppeteer");
const getZillowUrl_1 = require("./getZillowUrl");
const zillowScraper_1 = require("./zillowScraper");
function scrapeGoogle(searchQuery) {
    return __awaiter(this, void 0, void 0, function* () {
        // Launch Puppeteer browser
        const browser = yield puppeteer_1.default.launch({ headless: false });
        // Create a new page
        const page = yield browser.newPage();
        try {
            // Navigate to Google
            yield page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });
            // Wait for 1 second
            yield new Promise(resolve => setTimeout(resolve, 1000));
            // Enter search query
            yield page.type('textarea.gLFyf', searchQuery);
            // Press Enter to submit the search
            yield page.keyboard.press('Enter');
            // Wait for the search results to load
            yield page.waitForSelector('.tF2Cxc');
            // Extract search results
            // Find and click on the investopedia.com link in search results
            //investopedia.com give - The 7 Best Real Estate Websites of 2024
            const investopediaLink = yield page.evaluate(() => {
                const results = [];
                document.querySelectorAll('.tF2Cxc a').forEach((result) => {
                    var _a;
                    if ((_a = result.textContent) === null || _a === void 0 ? void 0 : _a.includes('investopedia')) {
                        results.push(result.getAttribute('href') || '');
                    }
                });
                return results[0];
            });
            const zillowLink = yield (0, getZillowUrl_1.getZillowUrl)(investopediaLink);
            yield (0, zillowScraper_1.zillowScraper)(zillowLink);
            return zillowLink;
        }
        finally {
            // Close the browser
            yield browser.close();
        }
    });
}
exports.scrapeGoogle = scrapeGoogle;
