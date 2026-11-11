const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const mediaDir = path.join(__dirname, '..', '..', 'public', 'media');

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
  await new Promise(r => setTimeout(r, 6000));

  const blobUrl = await page.evaluate(() => {
    const video = document.querySelector('video');
    return video ? video.src : null;
  });

  console.log('Blob URL:', blobUrl);

  if (blobUrl && blobUrl.startsWith('blob:')) {
    console.log('Fetching blob data inside browser...');
    const dataUrl = await page.evaluate(async (bUrl) => {
      try {
        const res = await fetch(bUrl);
        const b = await res.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(b);
        });
      } catch (e) {
        return { error: e.message };
      }
    }, blobUrl);

    if (dataUrl && typeof dataUrl === 'string' && dataUrl.startsWith('data:')) {
      const base64Data = dataUrl.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      const outPath = path.join(mediaDir, 'full_reel_video.mp4');
      fs.writeFileSync(outPath, buffer);
      console.log('SUCCESS! Downloaded full_reel_video.mp4, size:', buffer.length);
    } else {
      console.log('Failed to fetch blob:', dataUrl);
    }
  }

  await browser.close();
})();