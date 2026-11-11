const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, '..', 'src');

function fixFile(relPath, isComponent) {
  const filePath = path.join(base, relPath);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace import
  content = content.replace(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"];/, (match, p1) => {
    const list = p1.split(',').map(s => s.trim()).filter(s => s !== 'Instagram');
    const iconsPath = isComponent ? './Icons' : '../components/Icons';
    return `import { ${list.join(', ')} } from 'lucide-react';\nimport { InstagramIcon } from '${iconsPath}';`;
  });

  // Replace tags
  content = content.replace(/<Instagram\b/g, '<InstagramIcon');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed', relPath);
}

fixFile('components/Navbar.jsx', true);
fixFile('components/Footer.jsx', true);
fixFile('components/VideoReelPlayer.jsx', true);
fixFile('pages/Home.jsx', false);
fixFile('pages/ProductDetail.jsx', false);
fixFile('pages/About.jsx', false);
fixFile('pages/Contact.jsx', false);