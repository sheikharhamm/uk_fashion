const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const https = require('https');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const mediaDir = path.join(__dirname, '..', '..', 'public', 'media');
if (!fs.existsSync(mediaDir)) fs.mkdirSync(mediaDir, { recursive: true });

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => file.close(() => resolve(dest)));
    });
    req.on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

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

  let capturedVideoUrl = null;
  let capturedImgUrl = null;

  page.on('response', async (res) => {
    const url = res.url();
    const ct = res.headers()['content-type'] || '';
    if ((ct.includes('video') || url.includes('.mp4')) && !capturedVideoUrl && (url.includes('fbcdn.net') || url.includes('cdninstagram.com'))) {
      console.log('Found video network url:', url.slice(0, 100));
      capturedVideoUrl = url;
    }
    if ((ct.includes('image') || url.includes('.jpg')) && url.includes('scontent') && !capturedImgUrl && !url.includes('150x150')) {
      capturedImgUrl = url;
    }
  });

  await page.goto(testReel, { waitUntil: 'networkidle2', timeout: 30000 }).catch(e => console.log(e.message));
  await new Promise(r => setTimeout(r, 6000));

  console.log('Video url:', capturedVideoUrl ? capturedVideoUrl.slice(0, 100) : 'none');
  console.log('Image url:', capturedImgUrl ? capturedImgUrl.slice(0, 100) : 'none');

  if (capturedVideoUrl) {
    console.log('Downloading video...');
    await downloadFile(capturedVideoUrl, path.join(mediaDir, 'reel_1.mp4'));
    console.log('Downloaded reel_1.mp4, size:', fs.statSync(path.join(mediaDir, 'reel_1.mp4')).size);
  }

  if (capturedImgUrl) {
    console.log('Downloading image...');
    await downloadFile(capturedImgUrl, path.join(mediaDir, 'img_1.jpg'));
    console.log('Downloaded img_1.jpg, size:', fs.statSync(path.join(mediaDir, 'img_1.jpg')).size);
  }

  await browser.close();
})();