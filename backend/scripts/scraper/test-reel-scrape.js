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
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => file.close(() => resolve(dest)));
    }).on('error', (err) => {
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
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-notifications']
  });

  const page = await browser.newPage();
  
  // Test navigating to one of the reels
  const testReel = 'https://www.instagram.com/kj_.collection/reel/Dby6xnFoREL/';
  console.log('Visiting reel:', testReel);

  let capturedVideo = null;
  let capturedImg = null;

  page.on('response', async (res) => {
    const url = res.url();
    const ct = res.headers()['content-type'] || '';
    if ((ct.includes('video') || url.includes('.mp4')) && !capturedVideo) {
      console.log('Found video stream:', url.slice(0, 100));
      capturedVideo = url;
    }
    if ((ct.includes('image') || url.includes('.jpg')) && url.includes('scontent') && !capturedImg) {
      capturedImg = url;
    }
  });

  await page.goto(testReel, { waitUntil: 'networkidle2', timeout: 30000 }).catch(e => console.log(e.message));
  await new Promise(r => setTimeout(r, 6000));

  const pageInfo = await page.evaluate(() => {
    const videoEl = document.querySelector('video');
    const videoSrc = videoEl ? (videoEl.src || (videoEl.querySelector('source') ? videoEl.querySelector('source').src : '')) : '';
    const imgEl = document.querySelector('article img, [role="main"] img, img');
    const imgSrc = imgEl ? imgEl.src : '';
    const title = document.title;
    const descEl = document.querySelector('h1, article span, article div');
    const desc = descEl ? descEl.innerText : '';
    return { videoSrc, imgSrc, title, desc };
  });

  console.log('Page title:', pageInfo.title);
  console.log('Video found in DOM:', pageInfo.videoSrc);
  console.log('Captured network video:', capturedVideo ? capturedVideo.slice(0, 100) : 'none');
  console.log('Image found in DOM:', pageInfo.imgSrc ? pageInfo.imgSrc.slice(0, 100) : 'none');

  const finalVideo = pageInfo.videoSrc || capturedVideo;
  if (finalVideo) {
    console.log('Downloading video...');
    await downloadFile(finalVideo, path.join(mediaDir, 'reel_test.mp4'));
    console.log('Downloaded reel_test.mp4, size:', fs.statSync(path.join(mediaDir, 'reel_test.mp4')).size);
  }

  const finalImg = pageInfo.imgSrc || capturedImg;
  if (finalImg) {
    console.log('Downloading image...');
    await downloadFile(finalImg, path.join(mediaDir, 'img_test.jpg'));
    console.log('Downloaded img_test.jpg, size:', fs.statSync(path.join(mediaDir, 'img_test.jpg')).size);
  }

  await browser.close();
})();