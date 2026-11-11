const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const mediaDir = path.join(__dirname, '..', '..', 'public', 'media');
const rawOutPath = path.join(__dirname, '..', '..', 'data', 'raw', 'scraped_products_raw.json');
if (!fs.existsSync(mediaDir)) fs.mkdirSync(mediaDir, { recursive: true });

function downloadWithRedirect(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        return downloadWithRedirect(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(dest);
      });
    });
    req.on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

(async () => {
  console.log('Starting full scraper for kj_.collection...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false,
    defaultViewport: { width: 1280, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // 1. Visit main profile and collect post/reel links
  console.log('Opening https://www.instagram.com/kj_.collection/ ...');
  await page.goto('https://www.instagram.com/kj_.collection/', { waitUntil: 'networkidle2', timeout: 35000 }).catch(e => console.log('Profile nav err:', e.message));
  await new Promise(r => setTimeout(r, 6000));

  // Extract all links
  const links = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a[href*="/reel/"], a[href*="/p/"]'));
    return Array.from(new Set(anchors.map(a => a.href)));
  });

  console.log('Found post links:', links.length);
  links.forEach((l, i) => console.log(`[${i}] ${l}`));

  const allProducts = [];
  const targetLinks = links.slice(0, 10); // Take top 10 reels/posts

  for (let i = 0; i < targetLinks.length; i++) {
    const link = targetLinks[i];
    console.log(`\nProcessing (${i + 1}/${targetLinks.length}): ${link}`);
    
    try {
      await page.goto(link, { waitUntil: 'networkidle2', timeout: 25000 });
      await new Promise(r => setTimeout(r, 5000));

      const pageData = await page.evaluate(() => {
        const title = document.title;
        // Meta tags
        const ogImage = document.querySelector('meta[property="og:image"]')?.content || '';
        const ogDesc = document.querySelector('meta[property="og:description"]')?.content || document.querySelector('meta[name="description"]')?.content || '';
        
        // Find visible text
        const textElements = Array.from(document.querySelectorAll('h1, article span, article div')).map(el => el.innerText).filter(t => t && t.length > 20);
        const bestText = textElements[0] || ogDesc;

        return { title, ogImage, ogDesc, bestText };
      });

      // Get page HTML to extract progressive MP4
      const html = await page.content();
      const fbcdn = html.match(/https:\\\/\\\/[^"'\s]+?fbcdn\.net[^"'\s]+/g) || [];
      let progressiveMp4 = null;
      for (const m of fbcdn) {
        const clean = m.replace(/\\u0026/g, '&').replace(/\\\//g, '/').replace(/&amp;/g, '&');
        if (clean.includes('xpv_progressive') || clean.includes('dash_baseline_1_v1') || (clean.includes('/m86/') && clean.includes('.mp4'))) {
          progressiveMp4 = clean;
          break;
        }
      }

      // High-res Image
      let bestImage = pageData.ogImage;
      if (!bestImage) {
        const scontent = html.match(/https:\\\/\\\/scontent[^"'\s]+?\.jpg[^"'\s]*/g) || [];
        if (scontent.length > 0) {
          bestImage = scontent[0].replace(/\\u0026/g, '&').replace(/\\\//g, '/').replace(/&amp;/g, '&');
        }
      }

      const prodId = `kj-suit-${String(i + 1).padStart(2, '0')}`;
      let localImgPath = null;
      let localVidPath = null;

      // Download image
      if (bestImage) {
        const imgName = `${prodId}.jpg`;
        const dest = path.join(mediaDir, imgName);
        try {
          await downloadWithRedirect(bestImage, dest);
          const sz = fs.statSync(dest).size;
          if (sz > 1000) {
            localImgPath = `/media/${imgName}`;
            console.log(`  Downloaded image: ${imgName} (${sz} bytes)`);
          }
        } catch (e) {
          console.log('  Image download err:', e.message);
        }
      }

      // Download video if available
      if (progressiveMp4) {
        const vidName = `${prodId}_reel.mp4`;
        const dest = path.join(mediaDir, vidName);
        try {
          await downloadWithRedirect(progressiveMp4, dest);
          const sz = fs.statSync(dest).size;
          if (sz > 50000) {
            localVidPath = `/media/${vidName}`;
            console.log(`  Downloaded video: ${vidName} (${sz} bytes)`);
          }
        } catch (e) {
          console.log('  Video download err:', e.message);
        }
      }

      allProducts.push({
        id: prodId,
        instagramUrl: link,
        rawCaption: pageData.bestText || pageData.ogDesc,
        image: localImgPath,
        video: localVidPath,
        title: pageData.title
      });

    } catch (err) {
      console.log(`Err on ${link}:`, err.message);
    }
  }

  fs.mkdirSync(path.dirname(rawOutPath), { recursive: true });
  fs.writeFileSync(rawOutPath, JSON.stringify(allProducts, null, 2));
  console.log(`\nCompleted! Scraped ${allProducts.length} items to ${rawOutPath}`);
  await browser.close();
})();