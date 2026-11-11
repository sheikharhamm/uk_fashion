const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  console.log('Launching Chrome from:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false, // Let's try non-headless or headless new
    defaultViewport: { width: 1280, height: 900 },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-notifications',
      '--window-size=1280,900'
    ]
  });

  const page = await browser.newPage();
  
  const capturedMedia = {
    images: new Set(),
    videos: new Set(),
    posts: new Set(),
    graphql: []
  };

  page.on('response', async (response) => {
    try {
      const url = response.url();
      const ct = response.headers()['content-type'] || '';
      
      if (url.includes('cdninstagram.com') || url.includes('fbcdn.net')) {
        if (ct.includes('image') || url.match(/\.(jpg|jpeg|webp|png)/i)) {
          capturedMedia.images.add(url);
        }
        if (ct.includes('video') || url.match(/\.mp4/i)) {
          capturedMedia.videos.add(url);
        }
      }

      if (url.includes('graphql') || url.includes('/api/v1/')) {
        try {
          const text = await response.text();
          if (text.includes('display_url') || text.includes('video_url') || text.includes('edge_owner_to_timeline_media')) {
            capturedMedia.graphql.push(text);
          }
        } catch (e) {}
      }
    } catch (e) {}
  });

  console.log('Navigating to Instagram page...');
  try {
    await page.goto('https://www.instagram.com/kj_.collection/', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
  } catch (err) {
    console.log('Navigation warning:', err.message);
  }

  // Wait a bit for images to load
  await new Promise(r => setTimeout(r, 6000));

  // Extract from DOM
  const domData = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img')).map(img => img.src).filter(Boolean);
    const vids = Array.from(document.querySelectorAll('video')).map(v => v.src || (v.querySelector('source') ? v.querySelector('source').src : '')).filter(Boolean);
    const postLinks = Array.from(document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]')).map(a => a.href);
    const title = document.title;
    const bodyText = document.body ? document.body.innerText.slice(0, 1000) : '';
    return { imgs, vids, postLinks, title, bodyText };
  });

  console.log('DOM Title:', domData.title);
  console.log('DOM Images count:', domData.imgs.length);
  console.log('DOM Videos count:', domData.vids.length);
  console.log('DOM Post links count:', domData.postLinks.length);
  console.log('Captured network images count:', capturedMedia.images.size);
  console.log('Captured network videos count:', capturedMedia.videos.size);
  console.log('Body text preview:', domData.bodyText.replace(/\n/g, ' ').slice(0, 300));

  // Save report
  const result = {
    title: domData.title,
    postLinks: Array.from(new Set([...domData.postLinks, ...capturedMedia.posts])),
    images: Array.from(new Set([...domData.imgs, ...capturedMedia.images])),
    videos: Array.from(new Set([...domData.vids, ...capturedMedia.videos])),
    graphqlCount: capturedMedia.graphql.length
  };

  const outPath = path.join(__dirname, '..', '..', 'data', 'raw', 'instagram_scraped_data.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
  console.log('Saved data to', outPath);

  await browser.close();
})();