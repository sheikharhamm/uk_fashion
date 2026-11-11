const fs = require('fs');
const content = fs.readFileSync('picuki_test.html', 'utf8');

console.log('Title/Content checks:');
const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
console.log('Title:', titleMatch ? titleMatch[1] : 'No title');

// Look for post items in picuki
const postMatches = content.match(/<li[^>]+class="[^"]*box-photo[^"]*"[^>]*>([\s\S]*?)<\/li>/gi) || [];
console.log('Post boxes found:', postMatches.length);

if (postMatches.length === 0) {
  // Let's search for any image urls or post containers
  const imgRegex = /<img[^>]+src="([^">]+)"/gi;
  let match;
  let count = 0;
  while ((match = imgRegex.exec(content)) !== null) {
    count++;
    if (count <= 10) console.log('Img src:', match[1]);
  }
  console.log('Total img tags:', count);
} else {
  postMatches.slice(0, 5).forEach((p, i) => {
    console.log(`--- Post ${i} ---`);
    const img = p.match(/src="([^"]+)"/);
    const text = p.match(/class="photo-description"[^>]*>([\s\S]*?)<\/div>/);
    const link = p.match(/href="([^"]+)"/);
    console.log('Img:', img ? img[1] : null);
    console.log('Link:', link ? link[1] : null);
    console.log('Text:', text ? text[1].replace(/<[^>]+>/g, '').trim().slice(0, 100) : null);
  });
}