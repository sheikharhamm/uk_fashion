const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false,
    defaultViewport: { width: 1440, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  console.log('Navigating to http://localhost:5000 ...');
  await page.goto('http://localhost:5000', { waitUntil: 'networkidle2', timeout: 15000 }).catch(e => console.log(e.message));
  await new Promise(r => setTimeout(r, 2000));

  const screenshotPath = path.join(__dirname, 'header_preview.png');
  await page.screenshot({ path: screenshotPath, clip: { x: 0, y: 0, width: 1440, height: 280 } });
  console.log('Screenshot saved to:', screenshotPath);

  await browser.close();
  process.exit(0);
})();