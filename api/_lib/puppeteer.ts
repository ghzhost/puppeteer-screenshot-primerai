import { launch, Page } from "puppeteer-core";
const chromium = require('@sparticuz/chromium')
let _page: Page | null;

async function getPage() {
  if (_page) return _page;
  const options = {
    args: [
      '--disable-web-security',
      '--disable-setuid-sandbox',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
  ],
        defaultViewport: null,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
  };
  const browser = await launch(options);
  _page = await browser.newPage();
  return _page;
}

export async function getScreenshot(url, width, height) {
  const page = await getPage();
  await page.goto(url);
  await page.setViewport({ width: Number(width) || 1280, height: Number(height) || 720, deviceScaleFactor: 2 });
  const file = await page.screenshot();
  return file;
}
