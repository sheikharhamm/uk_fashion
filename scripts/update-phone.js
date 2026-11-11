const fs = require('fs');
const path = require('path');

const targetDisplay = "+92 322 6324881";
const targetDigits = "923226324881";
const targetLocal = "03226324881";

const root = path.join(__dirname, '..');

// 1. frontend/src/context/ProductContext.jsx
const ctxPath = path.join(root, 'frontend', 'src', 'context', 'ProductContext.jsx');
if (fs.existsSync(ctxPath)) {
  let content = fs.readFileSync(ctxPath, 'utf8');
  content = content.replace(/whatsappNumber:\s*["'][^"']+["']/, `whatsappNumber: "${targetDigits}"`);
  content = content.replace(/whatsappDisplay:\s*["'][^"']+["']/, `whatsappDisplay: "${targetDisplay}"`);
  fs.writeFileSync(ctxPath, content, 'utf8');
  console.log('Updated frontend/src/context/ProductContext.jsx');
}

// 2. backend/routes/inquiry.js
const inqPath = path.join(root, 'backend', 'routes', 'inquiry.js');
if (fs.existsSync(inqPath)) {
  let content = fs.readFileSync(inqPath, 'utf8');
  content = content.replace(/const waPhone\s*=\s*['"][^'"]+['"]/, `const waPhone = '${targetDigits}'`);
  fs.writeFileSync(inqPath, content, 'utf8');
  console.log('Updated backend/routes/inquiry.js');
}

// 3. frontend/legacy/assets/js/products.js
const assetProdPath = path.join(root, 'frontend', 'legacy', 'assets', 'js', 'products.js');
if (fs.existsSync(assetProdPath)) {
  let content = fs.readFileSync(assetProdPath, 'utf8');
  content = content.replace(/whatsappNumber:\s*["'][^"']+["']/, `whatsappNumber: "${targetDigits}"`);
  content = content.replace(/whatsappDisplay:\s*["'][^"']+["']/, `whatsappDisplay: "${targetDisplay}"`);
  fs.writeFileSync(assetProdPath, content, 'utf8');
  console.log('Updated frontend/legacy/assets/js/products.js');
}

// 4. backend/data/products.json
const dataPath = path.join(root, 'backend', 'data', 'products.json');
if (fs.existsSync(dataPath)) {
  let content = fs.readFileSync(dataPath, 'utf8');
  content = content.replace(/03082241557/g, targetLocal);
  content = content.replace(/923082241557/g, targetDigits);
  content = content.replace(/923001234567/g, targetDigits);
  content = content.replace(/\+92 308 2241557/g, targetDisplay);
  content = content.replace(/\+92 300 1234567/g, targetDisplay);
  fs.writeFileSync(dataPath, content, 'utf8');
  console.log('Updated backend/data/products.json');
}

// 5. Legacy & backend scripts
[
  path.join(root, 'frontend', 'legacy', 'scripts', 'layout.js'),
  path.join(root, 'frontend', 'legacy', 'scripts', 'generate-contact.js'),
  path.join(root, 'backend', 'scripts', 'build-products-json.js')
].forEach(p => {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/923082241557/g, targetDigits);
    content = content.replace(/923001234567/g, targetDigits);
    content = content.replace(/\+92 300 1234567/g, targetDisplay);
    content = content.replace(/\+92 308 2241557/g, targetDisplay);
    fs.writeFileSync(p, content, 'utf8');
    console.log('Updated', path.relative(root, p));
  }
});

console.log('All phone numbers updated to:', targetDisplay);
