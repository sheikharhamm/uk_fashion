const fs = require('fs');
const path = require('path');

const rawPath = path.join(__dirname, '..', 'data', 'raw', 'scraped_products_raw.json');
const mediaDir = path.join(__dirname, '..', 'public', 'media');
const outPath = path.join(__dirname, '..', 'data', 'products.json');

const raw = JSON.parse(fs.readFileSync(rawPath, 'utf8'));

const titlesAndMeta = [
  {
    title: "Shahi Red Royal Doch Bridal Jora",
    category: "Bridal",
    occasion: "Barat / Wedding Day",
    dochType: "Shahi Doch (Handmade Pocket & Neck)",
    fabric: "Pure Katan Silk & Shafoon Dupatta",
    work: "Pure Gold Zari, Resham Tanka, Mirror Work & Handcrafted Kantok",
    color: "Deep Crimson Red & Antique Gold",
    badge: "Masterpiece Bridal"
  },
  {
    title: "Sania Royal Emerald Green Doch",
    category: "Bridal",
    occasion: "Barat / Walima Night",
    dochType: "Traditional Balochi Doch & Jalar",
    fabric: "Pure Shafoon Silk with Embellished Borders",
    work: "Multi-color Resham Thread, Sitara & Gold Tilla",
    color: "Emerald Royal Green & Ruby Accents",
    badge: "Trending Bridal Reel"
  },
  {
    title: "Gul-i-Bahar Shafoon Bridal Suit",
    category: "Bridal",
    occasion: "Barat / Reception",
    dochType: "Intricate Makrani Doch & Pandol Pocket",
    fabric: "High Grade Shafoon Chiffon & Silk",
    work: "Dabka, Naqshi, Tilla & Fine Needlepoint",
    color: "Regal Maroon & Shimmering Gold",
    badge: "Most Loved Reel"
  },
  {
    title: "Quetta Shahi Haft-Rang Festive Jora",
    category: "Festive",
    occasion: "Mehndi / Mayun / Sangeet",
    dochType: "Haft Rang (Seven Colors Needlework)",
    fabric: "Pure Georgette & Raw Silk",
    work: "Authentic Mirror Work (Aina Doch) & Resham",
    color: "Sunset Rust, Mustard & Emerald",
    badge: "Viral Festive"
  },
  {
    title: "Gulf Royal Blue Balochi Doch",
    category: "Couture",
    occasion: "Reception / Gala / Nikah",
    dochType: "Saryabi Needlework & Kantok",
    fabric: "Premium Shamoz Silk",
    work: "Fine Silver-Gold Metallic Threading",
    color: "Sapphire Royal Blue",
    badge: "Gulf Edition"
  },
  {
    title: "Oman Royal Purple Velvet Doch",
    category: "Bridal",
    occasion: "Winter Wedding / Barat",
    dochType: "Chikan & Heavy Kantok Jalar",
    fabric: "Micro Velvet 9000 & Net Dupatta",
    work: "Zari, Tilla, Pearl Studding & Balochi Doch",
    color: "Royal Plum & Antique Bronze",
    badge: "Luxury Velvet"
  },
  {
    title: "Ivory Pearl & Blush Pink Walima Ensemble",
    category: "Walima",
    occasion: "Walima / Reception",
    dochType: "Nal Doch & Fine Resham Tanka",
    fabric: "Pure Organza & Soft Silk Crepe",
    work: "Cutdana, Pearls, Resham & Delicate Doch",
    color: "Soft Ivory & Whisper Rose",
    badge: "Contemporary Walima"
  },
  {
    title: "Midnight Black & Antique Golden Doch",
    category: "Couture",
    occasion: "Reception / Qawwali Night",
    dochType: "Shahi Kantok & Heavy Zari Tanka",
    fabric: "Pure Raw Silk 80g & Tissue Chiffon",
    work: "Pure Gold Mukaish, Metallic Tilla & Resham",
    color: "Jet Midnight Black & Antique Gold",
    badge: "Exclusive Couture"
  },
  {
    title: "Turquoise Blue Saryab Cultural Jora",
    category: "Festive",
    occasion: "Engagement / Festive Day",
    dochType: "Saryabi Traditional Doch",
    fabric: "Crinkle Chiffon & Silk",
    work: "Silk Threading & Hand Beaded Trim",
    color: "Turquoise Blue & Amber Yellow",
    badge: "Cultural Gem"
  },
  {
    title: "Karachi Atelier Bespoke Doch Masterpiece",
    category: "Bridal",
    occasion: "Barat / Wedding",
    dochType: "Full Front Pandol & Asteen Doch",
    fabric: "Pure Shafoon Silk Fabric",
    work: "Generational Balochi Handcrafting & Mirror Finish",
    color: "Deep Scarlet & Gold Tilla",
    badge: "Designer Signature"
  }
];

const enriched = raw.map((item, idx) => {
  const meta = titlesAndMeta[idx] || titlesAndMeta[0];
  const videoFile = item.video ? path.join(mediaDir, path.basename(item.video)) : null;
  const hasValidVideo = Boolean(videoFile && fs.existsSync(videoFile) && fs.statSync(videoFile).size > 50000);

  return {
    id: item.id,
    title: meta.title,
    slug: meta.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    category: meta.category,
    occasion: meta.occasion,
    dochType: meta.dochType,
    fabric: meta.fabric,
    work: meta.work,
    color: meta.color,
    badge: meta.badge,
    featured: idx < 6,
    trending: hasValidVideo,
    instagramUrl: item.instagramUrl,
    rawCaption: item.rawCaption,
    image: item.image,
    images: [
      item.image,
      item.image // For gallery thumbnail testing
    ],
    video: hasValidVideo ? item.video : null,
    shortDesc: item.rawCaption.replace(/\s+/g, ' ').slice(0, 150) + '...',
    fullDesc: item.rawCaption,
    details: [
      `Original authentic Doch handcraft from @kj_.collection`,
      `Fabric base: ${meta.fabric}`,
      `Hand embroidery technique: ${meta.dochType}`,
      `Embellishments: ${meta.work}`,
      `Worldwide delivery & COD across Pakistan available`,
      `Custom bridal consultation on WhatsApp / Instagram`
    ]
  };
});

fs.writeFileSync(outPath, JSON.stringify(enriched, null, 2));
console.log(`Generated ${path.relative(path.join(__dirname, '..', '..'), outPath)} with ${enriched.length} items`);