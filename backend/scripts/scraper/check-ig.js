const fs = require('fs');
const content = fs.readFileSync('ig_test.html', 'utf8');
console.log('File size:', content.length);

// Look for image/video or JSON
const cdnRegex = /https:\/\/[^"'\\<>\s]+cdninstagram\.com[^"'\\<>\s]+/g;
const matches = content.match(cdnRegex) || [];
console.log('Matches:', matches.length);

const cleaned = matches.map(m => m.replace(/\\u0026/g, '&').replace(/&amp;/g, '&'));
const unique = Array.from(new Set(cleaned));
console.log('Unique URLs:', unique.length);
unique.forEach((u, i) => {
  if (i < 15) {
    console.log(`[${i}] ${u}`);
  }
});

// Check if there are video URLs (mp4) or scontent images
const mp4s = cleaned.filter(u => u.includes('.mp4'));
console.log('MP4 matches:', mp4s.length);
mp4s.slice(0, 5).forEach(m => console.log('MP4:', m));

// Look for any scripts containing graphql or items
const scriptTags = content.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
console.log('Script tags count:', scriptTags.length);
let foundJsonCount = 0;
scriptTags.forEach((s, idx) => {
  if (s.includes('xdt_api') || s.includes('items') || s.includes('edge_owner_to_timeline_media') || s.includes('display_url')) {
    foundJsonCount++;
    console.log(`Script ${idx} has potential media data! Length: ${s.length}`);
  }
});
console.log('Found media scripts:', foundJsonCount);