const https = require('https');
const http = require('http');

const urls = [
  'https://www.pixwox.com/profile/kj_.collection/',
  'https://iganony.net/profile/kj_.collection',
  'https://greatfon.io/v/kj_.collection',
  'https://anonyig.com/en/profile/kj_.collection',
  'https://instanavigation.com/user-profile/kj_.collection'
];

async function check(url) {
  return new Promise((resolve) => {
    try {
      const u = new URL(url);
      const req = https.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        timeout: 8000
      }, (res) => {
        let data = '';
        res.on('data', chunk => { if (data.length < 500000) data += chunk; });
        res.on('end', () => {
          console.log(`[${res.statusCode}] ${url} (length: ${data.length})`);
          if (data.includes('kj_.collection') || data.includes('item_') || data.includes('post')) {
            console.log(`  -> Match found in ${url}! Sample:`, data.slice(0, 200).replace(/\s+/g, ' '));
          }
          resolve({ url, status: res.statusCode, length: data.length, sample: data.slice(0, 1000) });
        });
      });
      req.on('error', (e) => {
        console.log(`Err ${url}: ${e.message}`);
        resolve({ url, error: e.message });
      });
      req.on('timeout', () => {
        req.destroy();
        console.log(`Timeout ${url}`);
        resolve({ url, timeout: true });
      });
    } catch (e) {
      resolve({ url, error: e.message });
    }
  });
}

(async () => {
  for (const u of urls) {
    await check(u);
  }
})();