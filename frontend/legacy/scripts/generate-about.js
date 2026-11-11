const fs = require('fs');
const path = require('path');
const { getHeader, getFooter } = require('./layout.js');

const aboutHtml = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Heritage Story & Artisans | UK Fashion Balochi Haute Couture</title>
  <meta name="description" content="Discover the centuries-old history of Balochi Doch hand embroidery, the master craftswomen behind UK Fashion, and our connection with @kj_.collection.">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link rel="stylesheet" href="assets/css/style.css">
  
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brandGold: '#c5a059',
            brandGoldLight: '#e4ce9e',
            brandGoldDark: '#8a6829',
            brandMaroon: '#540f1a',
            brandDark: '#111111',
            brandCream: '#faf7f2',
          }
        }
      }
    }
  </script>
</head>
<body class="bg-brandCream text-gray-800 antialiased selection:bg-brandGold selection:text-white">

  ${getHeader('about')}

  <!-- BANNER -->
  <section class="bg-brandDark text-white py-16 border-b border-brandGold/30 relative overflow-hidden">
    <div class="absolute inset-0 opacity-25 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1600&auto=format&fit=crop');"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <span class="text-xs uppercase tracking-[0.3em] text-brandGold font-bold">The Royal Craft of Balochistan</span>
      <h1 class="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-white mt-2">
        Centuries of Balochi Doch Heritage
      </h1>
      <p class="text-sm text-gray-300 max-w-2xl mx-auto mt-4 leading-relaxed font-light">
        Where every needlepoint thread preserves the ancestral geometry, nobility, and soul of Baluchi women artisans.
      </p>
    </div>
  </section>

  <!-- STORY CONTENT -->
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
    
    <!-- Section 1 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div>
        <span class="text-xs font-bold text-brandGold uppercase tracking-widest">Our Vision</span>
        <h2 class="font-serif-luxury text-2xl sm:text-3xl font-bold text-gray-900 mt-1 mb-4">
          Reviving Royal Couture for Modern Brides
        </h2>
        <p class="text-sm text-gray-600 leading-relaxed mb-4">
          <strong>UK Fashion</strong> was founded on a singular passion: to elevate authentic <strong>Balochi Doch (Needlework)</strong> from a regional cultural secret onto the global high-fashion stage. 
        </p>
        <p class="text-sm text-gray-600 leading-relaxed">
          Inspired by the bespoke curation of <strong>@kj_.collection</strong>, we bring brides in the UK, North America, the Gulf, and Pakistan heirloom suits that will be treasured for generations.
        </p>
      </div>
      <div class="rounded-lg overflow-hidden shadow-lg border-2 border-brandGold/20 aspect-[4/3]">
        <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop" alt="Balochi Doch needlework" class="w-full h-full object-cover">
      </div>
    </div>

    <!-- Section 2: Anatomy of Balochi Doch -->
    <div class="bg-white p-8 sm:p-10 rounded-lg border border-gray-200 shadow-sm">
      <div class="text-center max-w-xl mx-auto mb-10">
        <span class="text-xs font-bold text-brandGold uppercase tracking-widest">Artisanal Elements</span>
        <h3 class="font-serif-luxury text-2xl font-bold text-gray-900 mt-1">The Anatomy of Authentic Doch</h3>
        <p class="text-xs text-gray-500 mt-1">Every suit incorporates distinctive historical signatures.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="p-5 bg-brandCream rounded border border-brandGold/20">
          <h4 class="font-serif-luxury font-bold text-base text-gray-900 mb-2 text-brandGoldDark">1. Ji & Gardan (Chest Plate)</h4>
          <p class="text-xs text-gray-600 leading-relaxed">
            The heart of the dress, featuring thousands of miniature geometric stitches crafted in perfect mathematical harmony.
          </p>
        </div>

        <div class="p-5 bg-brandCream rounded border border-brandGold/20">
          <h4 class="font-serif-luxury font-bold text-base text-gray-900 mb-2 text-brandGoldDark">2. Pandol (Royal Pocket)</h4>
          <p class="text-xs text-gray-600 leading-relaxed">
            The iconic downward triangular pocket extending below the waistline, traditionally symbolizing abundance and grace.
          </p>
        </div>

        <div class="p-5 bg-brandCream rounded border border-brandGold/20">
          <h4 class="font-serif-luxury font-bold text-base text-gray-900 mb-2 text-brandGoldDark">3. Asteen & Pauncha (Cuffs)</h4>
          <p class="text-xs text-gray-600 leading-relaxed">
            Heavy matching sleeve bands and trouser cuffs bordered with hand-beaded trims and mirror reflections.
          </p>
        </div>
      </div>
    </div>

    <!-- Section 3: Social & Consultation CTA -->
    <div class="bg-brandDark rounded-xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
      <div class="relative z-10 max-w-2xl mx-auto">
        <h3 class="font-serif-luxury text-2xl sm:text-3xl font-bold mb-3">Begin Your Custom Bridal Journey</h3>
        <p class="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
          Because true Doch takes several months of dedicated stitching, we recommend booking your bridal consultation 4 to 6 months prior to your wedding day.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="#" class="brand-wa-link px-6 py-3 bg-brandGold hover:bg-brandGoldDark text-white font-bold text-xs uppercase tracking-widest rounded transition flex items-center gap-2">
            <i data-lucide="message-circle" class="w-4 h-4 text-emerald-300"></i>
            WhatsApp Consultation
          </a>
          <a href="https://www.instagram.com/kj_.collection/" target="_blank" class="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest rounded transition flex items-center gap-2">
            <i data-lucide="instagram" class="w-4 h-4 text-brandGold"></i>
            Follow @kj_.collection
          </a>
        </div>
      </div>
    </div>

  </div>

  ${getFooter()}

  <script src="assets/js/products.js"></script>
  <script src="assets/js/main.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      lucide.createIcons();
    });
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, '..', 'about.html'), aboutHtml, 'utf8');
console.log('about.html written successfully');