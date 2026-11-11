const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const ctx = fs.readFileSync(path.join(root, 'frontend', 'src', 'context', 'ProductContext.jsx'), 'utf8');
console.log('ProductContext whatsappNumber:', ctx.match(/whatsappNumber:\s*["']([^"']+)["']/)[1]);
console.log('ProductContext whatsappDisplay:', ctx.match(/whatsappDisplay:\s*["']([^"']+)["']/)[1]);

const inq = fs.readFileSync(path.join(root, 'backend', 'routes', 'inquiry.js'), 'utf8');
console.log('inquiry.js waPhone:', inq.match(/const waPhone\s*=\s*['"]([^'"]+)['"]/)[1]);

const legacyProd = fs.readFileSync(path.join(root, 'frontend', 'legacy', 'assets', 'js', 'products.js'), 'utf8');
console.log('legacy products.js whatsappNumber:', legacyProd.match(/whatsappNumber:\s*["']([^"']+)["']/)[1]);
console.log('legacy products.js whatsappDisplay:', legacyProd.match(/whatsappDisplay:\s*["']([^"']+)["']/)[1]);
