const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const srcMediaDir = path.join(rootDir, 'backend', 'public', 'media');
const distDir = path.join(rootDir, 'frontend', 'dist');
const distIndex = path.join(distDir, 'index.html');
const destMediaDir = path.join(distDir, 'media');

if (!fs.existsSync(distIndex)) {
  throw new Error(`Expected built frontend at ${distIndex}. Run frontend build first.`);
}

if (!fs.existsSync(srcMediaDir)) {
  throw new Error(`Expected catalog media directory at ${srcMediaDir}.`);
}

fs.rmSync(destMediaDir, { recursive: true, force: true });
fs.cpSync(srcMediaDir, destMediaDir, { recursive: true });

const copiedFiles = fs.readdirSync(destMediaDir);
console.log(`Copied ${copiedFiles.length} media files to ${path.relative(rootDir, destMediaDir)} for Vercel Static CDN.`);

