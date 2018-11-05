const puppeteer = require('puppeteer');
const path = require('path');

const testURL = path.join(__dirname, '/../puppeteer/index.html');
let browser;
let page;

// Pupeteer/Chromium tests required to test computed styles &
// those relying on clientHeight etc. This is beyond Enyzme/JSDOM.

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: true
  });
  page = await browser.newPage();
  await page.goto(testURL);
});

afterEach(async () => {
  await browser.close();
});

it('renders correct textbox positions for arrow positions', async () => {
  const styleTop = await page
    .$eval('.test-arrow-top .rct-textbox-container', el => el.style.top);
  const styleCenter = await page
    .$eval('.test-arrow-center .rct-textbox-container', el => el.style.top);
  const styleBottom = await page
    .$eval('.test-arrow-bottom .rct-textbox-container', el => el.style.top);

  expect(styleTop).toEqual('calc(((50% - 0px) - 24px) + 0px)');
  expect(styleCenter).toEqual('calc(50% - 72px)');
  expect(styleBottom).toEqual('calc(((50% - 144px) - -24px) + 0px)');
});
