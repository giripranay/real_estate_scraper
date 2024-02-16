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
exports.zillowScraper = void 0;
const puppeteer_1 = require("puppeteer");
function zillowScraper(url) {
    return __awaiter(this, void 0, void 0, function* () {
        // Launch Puppeteer browser
        const browser = yield puppeteer_1.default.launch({ headless: false });
        // Create a new page
        const page = yield browser.newPage();
        try {
            // Navigate to zillow
            yield page.goto(url, { waitUntil: 'domcontentloaded' });
            return "sdasd";
        }
        finally {
            // Close the browser
            yield browser.close();
        }
    });
}
exports.zillowScraper = zillowScraper;
