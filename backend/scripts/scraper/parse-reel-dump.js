const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'reel_dump.html'), 'utf8');

// Find all matches for fbcdn or video
const fbcdn = html.match(/https:\\\/\\\/[^"'\s]+?fbcdn\.net[^"'\s]+/g) || [];
console.log('FBCDN matches:', fbcdn.length);
fbcdn.forEach((m, i) => {
  const clean = m.replace(/\\u0026/g, '&').replace(/\\\//g, '/');
  if (clean.includes('/v/') || clean.includes('/m367/') || clean.includes('.mp4')) {
    console.log(`Video candidate ${i}:`, clean);
  }
});

// Also check meta tags
const metaVideo = html.match(/<meta[^>]+property="og:video"[^>]+content="([^"]+)"/i) || html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:video"/i);
console.log('Meta og:video:', metaVideo ? metaVideo[1] : 'None');

const metaImage = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i) || html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:image"/i);
console.log('Meta og:image:', metaImage ? metaImage[1] : 'None');

const metaDesc = html.match(/<meta[^>]+property="og:description"[^>]+content="([^"]+)"/i) || html.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i);
console.log('Meta description:', metaDesc ? metaDesc[1] : 'None');