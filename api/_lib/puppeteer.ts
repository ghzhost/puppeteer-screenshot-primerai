import { launch, Page } from "puppeteer-core";
const chromium = require('@sparticuz/chromium')
let _page: Page | null;

async function getPage() {
  if (_page) return _page;
  const options = {
    args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  };
  const browser = await launch(options);
  _page = await browser.newPage();
  return _page;
}

export async function getScreenshot(url, width, height) {
  const page = await getPage();
  await page.setViewport({ width: Number(width) || 1280, height: Number(height) || 720, deviceScaleFactor: 2 });
  await page.goto(url, {
    waitUntil: 'domcontentloaded',
  });
  const file = await page.screenshot();
  return file;
}


