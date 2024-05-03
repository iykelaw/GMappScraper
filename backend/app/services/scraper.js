// 
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fillDataFromPage = require('./pageData');
const scrollPage = require('./pageAutoScroll');
const delay = require('../utils/delay');

puppeteer.use(StealthPlugin());

const GetLocalCompanies = async (requestParams) => {
  // Check is request params is available
  if (!requestParams.query) return [];

  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"], });
  const page = await browser.newPage();

  // Navigate the page to a URL
  const URL = `${requestParams.baseURL}/maps/search/${requestParams.query}/${requestParams.coordinates}?hl=${requestParams.hl}`;

  await page.setDefaultNavigationTimeout(60000);
  await page.goto(URL);

  await page.waitForNavigation();

  // Set screen size
  await page.setViewport({ width: 1200, height: 1024 });

  // Get scroll container
  const scrollContainer = ".m6QErb[aria-label]";

  const localCompanies = [];
  
  // parse the page to get list of companies
  await delay(3000)
  await scrollPage(page, scrollContainer);

  localCompanies.push(...(await fillDataFromPage(page)));

  await delay(2000)
  await browser.close();
  return localCompanies;
};

module.exports = GetLocalCompanies