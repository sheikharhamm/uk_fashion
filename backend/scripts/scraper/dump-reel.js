const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false,
    defaultViewport: { width: 1280, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const testReel = 'https://www.instagram.com/kj_.collection/reel/Dby6xnFoREL/';
  console.log('Visiting reel:', testReel);

  await page.goto(testReel, { waitUntil: 'networkidle2', timeout: 30000 }).catch(e => console.log(e.message));
  await new Promise(r => setTimeout(r, 5000));

  const html = await page.content();
  fs.writeFileSync(path.join(__dirname, 'reel_dump.html'), html);
  console.log('Saved reel_dump.html, length:', html.length);

  // Search for progressive MP4s in HTML
  const mp4Matches = html.match(/https:\/\/[^"'\s\\]+?\.mp4[^"'\s\\]*/g) || [];
  console.log('MP4 matches in HTML:', mp4Matches.length);
  mp4Matches.slice(0, 5).forEach((m, i) => console.log(`[${i}]`, m.slice(0, 100)));

  // Search for high-res images in HTML
  const imgMatches = html.match(/https:\/\/[^"'\s\\]+?\.jpg[^"'\s\\]*/g) || [];
  console.log('JPG matches in HTML:', imgMatches.length);
  imgMatches.slice(0, 5).forEach((m, i) => console.log(`[img ${i}]`, m.slice(0, 100)));

  await browser.close();
})();