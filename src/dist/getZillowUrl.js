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
exports.getZillowUrl = void 0;
const puppeteer_1 = require("puppeteer");
function getZillowUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        // Launch Puppeteer browser
        const browser = yield puppeteer_1.default.launch({ headless: false });
        // Create a new page
        const page = yield browser.newPage();
        try {
            // Navigate to investopedia
            yield page.goto(url, { waitUntil: 'domcontentloaded' });
            // Choose Zillow link out of top 7 websites on investopedia.
            const link = yield page.evaluate(() => {
                const hrefs = [];
                document.querySelectorAll('ul.summary-list__content li a').forEach(link => {
                    var _a;
                    if ((_a = link.textContent) === null || _a === void 0 ? void 0 : _a.includes('Zillow')) {
                        hrefs.push(link.getAttribute('href') || "");
                    }
                });
                return hrefs[0];
            });
            return link;
        }
        finally {
            // Close the browser
            yield browser.close();
        }
    });
}
exports.getZillowUrl = getZillowUrl;
