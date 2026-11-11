const fs = require('fs');
const path = require('path');
const { getHeader, getFooter } = require('./layout.js');

const scriptBlock = '<script>\n' +
'  document.addEventListener("DOMContentLoaded", () => {\n' +
'    lucide.createIcons();\n' +
'    \n' +
'    const params = new URLSearchParams(window.location.search);\n' +
'    const id = params.get("id") || "uk-bridal-01";\n' +
'    const product = UK_PRODUCTS.find(p => p.id === id) || UK_PRODUCTS[0];\n' +
'    \n' +
'    // Set title and breadcrumbs\n' +
'    document.title = product.title + " | UK Fashion Balochi Bridal";\n' +
'    document.getElementById("breadcrumb-category").textContent = product.category;\n' +
'    document.getElementById("breadcrumb-category").href = "collection.html?category=" + encodeURIComponent(product.category);\n' +
'    document.getElementById("breadcrumb-title").textContent = product.title;\n' +
'    \n' +
'    document.getElementById("prod-title").textContent = product.title;\n' +
'    document.getElementById("prod-doch").textContent = product.dochType;\n' +
'    document.getElementById("prod-badge").textContent = product.badge || product.category;\n' +
'    document.getElementById("prod-shortdesc").textContent = product.shortDesc;\n' +
'    document.getElementById("prod-fulldesc").textContent = product.fullDesc;\n' +
'    \n' +
'    document.getElementById("spec-doch").textContent = product.dochType;\n' +
'    document.getElementById("spec-fabric").textContent = product.fabric;\n' +
'    document.getElementById("spec-work").textContent = product.work;\n' +
'    document.getElementById("spec-color").textContent = product.color;\n' +
'    document.getElementById("spec-occasion").textContent = product.occasion;\n' +
'    \n' +
'    // Specs list\n' +
'    const listEl = document.getElementById("prod-details-list");\n' +
'    if (listEl && product.details) {\n' +
'      listEl.innerHTML = product.details.map(d => \'<li>\' + d + \'</li>\').join("");\n' +
'    }\n' +
'    \n' +
'    // Gallery & Thumbnails\n' +
'    const mainImg = document.getElementById("main-product-img");\n' +
'    const thumbContainer = document.getElementById("product-thumbnails");\n' +
'    mainImg.src = product.images[0];\n' +
'    \n' +
'    if (thumbContainer) {\n' +
'      thumbContainer.innerHTML = product.images.map((img, idx) => (\n' +
'        \'<button onclick="setMainImage(\\\\\'\' + img + \'\\\\\')" class="w-20 h-24 rounded border-2 \' + (idx === 0 ? \'border-brandGold\' : \'border-transparent\') + \' overflow-hidden focus:outline-none hover:border-brandGold transition thumb-btn">\' +\n' +
'          \'<img src="\' + img + \'" alt="Thumbnail" class="w-full h-full object-cover">\' +\n' +
'        \'</button>\'\n' +
'      )).join("");\n' +
'    }\n' +
'    \n' +
'    // Direct WhatsApp Buttons\n' +
'    const waMessage = encodeURIComponent(\n' +
'      "Salam UK Fashion! I am interested in inquiring about this Balochi Bridal suit:\\n" +\n' +
'      "• Dress: " + product.title + "\\n" +\n' +
'      "• Doch Type: " + product.dochType + "\\n" +\n' +
'      "• Occasion: " + product.occasion + "\\n\\n" +\n' +
'      "Please let me know about the crafting timeline and customization options."\n' +
'    );\n' +
'    const waLink = "https://wa.me/" + UK_CONFIG.whatsappNumber + "?text=" + waMessage;\n' +
'    \n' +
'    document.getElementById("btn-inquire-wa").href = waLink;\n' +
'    document.getElementById("btn-inquire-modal").addEventListener("click", () => {\n' +
'      openInquiryModal(product.id);\n' +
'    });\n' +
'    \n' +
'    // Related Products (exclude current)\n' +
'    const relatedGrid = document.getElementById("related-products-grid");\n' +
'    if (relatedGrid) {\n' +
'      const related = UK_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);\n' +
'      relatedGrid.innerHTML = related.map(p => (\n' +
'        \'<div class="product-card bg-white rounded-lg overflow-hidden border border-gray-200/80 shadow-sm flex flex-col justify-between group">\' +\n' +
'          \'<div>\' +\n' +
'            \'<div class="image-zoom-container aspect-[3/4] bg-gray-100 relative">\' +\n' +
'              \'<img src="\' + p.images[0] + \'" alt="\' + p.title + \'" class="w-full h-full object-cover">\' +\n' +
'              \'<span class="absolute top-3 left-3 bg-brandDark/90 text-brandGoldLight text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">\' +\n' +
'                (p.badge || p.category) +\n' +
'              \'</span>\' +\n' +
'              \'<a href="product-detail.html?id=\' + p.id + \'" class="absolute inset-0 z-10" aria-label="\' + p.title + \'"></a>\' +\n' +
'            \'</div>\' +\n' +
'            \'<div class="p-4">\' +\n' +
'              \'<span class="text-[10px] text-brandGold font-bold uppercase tracking-wider block">\' + p.dochType + \'</span>\' +\n' +
'              \'<h4 class="font-serif-luxury font-bold text-sm text-gray-900 mt-1 group-hover:text-brandGold transition-colors">\' +\n' +
'                \'<a href="product-detail.html?id=\' + p.id + \'">\' + p.title + \'</a>\' +\n' +
'              \'</h4>\' +\n' +
'            \'</div>\' +\n' +
'          \'</div>\' +\n' +
'          \'<div class="p-4 pt-0">\' +\n' +
'            \'<a href="product-detail.html?id=\' + p.id + \'" class="block py-1.5 text-center text-xs font-bold uppercase tracking-wider text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition">\' +\n' +
'              \'View Design\' +\n' +
'            \'</a>\' +\n' +
'          \'</div>\' +\n' +
'        \'</div>\'\n' +
'      )).join("");\n' +
'      lucide.createIcons();\n' +
'    }\n' +
'  });\n' +
'  \n' +
'  function setMainImage(imgUrl) {\n' +
'    const main = document.getElementById("main-product-img");\n' +
'    if (main) main.src = imgUrl;\n' +
'    document.querySelectorAll(".thumb-btn").forEach(btn => {\n' +
'      if (btn.querySelector("img").src === imgUrl) {\n' +
'        btn.classList.add("border-brandGold");\n' +
'        btn.classList.remove("border-transparent");\n' +
'      } else {\n' +
'        btn.classList.remove("border-brandGold");\n' +
'        btn.classList.add("border-transparent");\n' +
'      }\n' +
'    });\n' +
'  }\n' +
'</script>';

const detailHtml = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Balochi Bridal Suit Details | UK Fashion Couture</title>
  <meta name="description" content="View intricate details, hand-doch embroidery, katan silk fabrics, and custom bridal tailoring for this Balochi bridal masterpiece.">
  
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

  ${getHeader('bridal')}

  <!-- BREADCRUMB -->
  <div class="bg-white border-b border-gray-100 py-3">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-500 flex items-center space-x-2">
      <a href="index.html" class="hover:text-brandGold">Home</a>
      <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-gray-400"></i>
      <a href="collection.html" class="hover:text-brandGold">Collections</a>
      <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-gray-400"></i>
      <a id="breadcrumb-category" href="collection.html" class="hover:text-brandGold">Category</a>
      <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-gray-400"></i>
      <span id="breadcrumb-title" class="text-gray-900 font-semibold truncate max-w-xs">Product Details</span>
    </div>
  </div>

  <!-- PRODUCT MAIN DETAILS (Andaaz Fashion style layout) -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
      
      <!-- LEFT: GALLERY & THUMBNAILS (6 cols) -->
      <div class="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
        
        <!-- Thumbnails Column -->
        <div id="product-thumbnails" class="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
          <!-- Populated by JS -->
        </div>

        <!-- Main Image with Zoom container -->
        <div class="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm relative aspect-[3/4]">
          <img id="main-product-img" src="" alt="Balochi Bridal Dress" class="w-full h-full object-cover">
          <span id="prod-badge" class="absolute top-4 left-4 bg-brandDark/90 text-brandGoldLight text-xs font-bold uppercase tracking-widest px-3 py-1 rounded shadow">
            Masterpiece
          </span>
          <a href="https://www.instagram.com/kj_.collection/" target="_blank" class="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-xs font-semibold px-3 py-1 rounded-full shadow hover:bg-brandGold hover:text-white transition flex items-center gap-1.5">
            <i data-lucide="instagram" class="w-3.5 h-3.5"></i> @kj_.collection
          </a>
        </div>

      </div>

      <!-- RIGHT: PRODUCT SPECIFICATIONS & CONSULTATION (6 cols) -->
      <div class="lg:col-span-6 flex flex-col justify-between">
        
        <div>
          <!-- Title & Doch Subtitle -->
          <div class="border-b border-gray-200 pb-5">
            <span id="prod-doch" class="text-xs uppercase tracking-[0.2em] text-brandGold font-bold block mb-1">
              Shahi Doch Handwork
            </span>
            <h1 id="prod-title" class="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
              Balochi Bridal Ensemble
            </h1>
            <p id="prod-shortdesc" class="text-sm text-gray-600 mt-3 leading-relaxed">
              Description loading...
            </p>
          </div>

          <!-- BESPOKE NOTICE (NO PRICES / DIRECT BRIDAL BOOKING) -->
          <div class="my-5 p-4 bg-amber-50/80 border border-brandGold/40 rounded-lg">
            <div class="flex items-start gap-3">
              <i data-lucide="sparkles" class="w-5 h-5 text-brandGold flex-shrink-0 mt-0.5"></i>
              <div>
                <h4 class="font-bold text-xs uppercase tracking-wider text-brandGoldDark">Bespoke Couture Piece</h4>
                <p class="text-xs text-gray-600 mt-1">
                  Each suit is handmade by artisanal Balochi masters over 3 to 6 months. Public checkout is disabled; custom sizing, color tweaks, and orders are handled directly through consultation.
                </p>
              </div>
            </div>
          </div>

          <!-- SPECIFICATION TABLE (Andaaz Fashion style breakdown) -->
          <div class="mt-6">
            <h3 class="font-serif-luxury text-sm font-bold uppercase tracking-wider text-gray-900 mb-3">Garment Specifications</h3>
            <div class="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100 text-xs">
              <div class="grid grid-cols-3 p-3">
                <span class="text-gray-500 font-medium">Embroidery (Doch)</span>
                <span id="spec-doch" class="col-span-2 text-gray-900 font-semibold">-</span>
              </div>
              <div class="grid grid-cols-3 p-3">
                <span class="text-gray-500 font-medium">Fabric Base</span>
                <span id="spec-fabric" class="col-span-2 text-gray-900 font-semibold">-</span>
              </div>
              <div class="grid grid-cols-3 p-3">
                <span class="text-gray-500 font-medium">Embellishments</span>
                <span id="spec-work" class="col-span-2 text-gray-900 font-semibold">-</span>
              </div>
              <div class="grid grid-cols-3 p-3">
                <span class="text-gray-500 font-medium">Color Palette</span>
                <span id="spec-color" class="col-span-2 text-gray-900 font-semibold">-</span>
              </div>
              <div class="grid grid-cols-3 p-3">
                <span class="text-gray-500 font-medium">Ideal Occasion</span>
                <span id="spec-occasion" class="col-span-2 text-gray-900 font-semibold">-</span>
              </div>
            </div>
          </div>

          <!-- DETAILS LIST -->
          <div class="mt-6">
            <h3 class="font-serif-luxury text-sm font-bold uppercase tracking-wider text-gray-900 mb-2">Artisan Inclusions</h3>
            <ul id="prod-details-list" class="list-disc list-inside text-xs text-gray-600 space-y-1.5 leading-relaxed">
              <!-- JS -->
            </ul>
          </div>
        </div>

        <!-- ACTION BUTTONS -->
        <div class="mt-8 pt-6 border-t border-gray-200 space-y-3">
          <div class="flex flex-col sm:flex-row gap-3">
            <a id="btn-inquire-wa" href="#" target="_blank" class="flex-1 py-4 bg-brandDark text-brandGoldLight hover:bg-brandGold hover:text-white rounded-lg font-bold text-xs uppercase tracking-widest text-center transition flex items-center justify-center gap-2 shadow-lg">
              <i data-lucide="message-circle" class="w-4 h-4 text-emerald-400"></i>
              <span>Inquire & Order on WhatsApp</span>
            </a>
            <button id="btn-inquire-modal" class="py-4 px-6 bg-white border border-brandDark text-brandDark hover:bg-gray-50 rounded-lg font-bold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2">
              <i data-lucide="calendar" class="w-4 h-4 text-brandGold"></i>
              <span>Book Consultation</span>
            </button>
          </div>

          <div class="flex items-center justify-between text-xs text-gray-500 pt-2">
            <span class="flex items-center gap-1.5"><i data-lucide="shield-check" class="w-4 h-4 text-emerald-500"></i> 100% Hand-embroidered guarantee</span>
            <span class="flex items-center gap-1.5"><i data-lucide="truck" class="w-4 h-4 text-brandGold"></i> Worldwide Express Shipping</span>
          </div>
        </div>

      </div>

    </div>

    <!-- FULL STORY TAB / CRAFTSMANSHIP DETAILS -->
    <div class="mt-16 bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
      <h3 class="font-serif-luxury text-xl font-bold text-gray-900 mb-4">About This Handcrafted Ensemble</h3>
      <p id="prod-fulldesc" class="text-sm text-gray-600 leading-relaxed max-w-4xl">
        Loading craftsmanship notes...
      </p>
      
      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
        <div class="flex gap-3">
          <i data-lucide="clock" class="w-5 h-5 text-brandGold flex-shrink-0"></i>
          <div>
            <h4 class="font-bold text-xs uppercase text-gray-800">3 - 6 Months Crafting Time</h4>
            <p class="text-xs text-gray-500 mt-0.5">Please order well in advance of your wedding date to ensure flawless needlework.</p>
          </div>
        </div>
        <div class="flex gap-3">
          <i data-lucide="ruler" class="w-5 h-5 text-brandGold flex-shrink-0"></i>
          <div>
            <h4 class="font-bold text-xs uppercase text-gray-800">Custom Measurement Form</h4>
            <p class="text-xs text-gray-500 mt-0.5">We provide a video guide and measurement sheet upon consultation.</p>
          </div>
        </div>
        <div class="flex gap-3">
          <i data-lucide="camera" class="w-5 h-5 text-brandGold flex-shrink-0"></i>
          <div>
            <h4 class="font-bold text-xs uppercase text-gray-800">Progress Updates</h4>
            <p class="text-xs text-gray-500 mt-0.5">Receive high-res photos and videos from the artisan during the Doch creation.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- RELATED PRODUCTS -->
    <div class="mt-20">
      <div class="text-center max-w-xl mx-auto mb-10">
        <span class="text-brandGold uppercase text-xs font-bold tracking-[0.25em]">Curated Recommendations</span>
        <h3 class="font-serif-luxury text-2xl font-bold text-gray-900 mt-1">You May Also Admire</h3>
      </div>
      <div id="related-products-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- JS -->
      </div>
    </div>

  </div>

  ${getFooter()}

  <script src="assets/js/products.js"></script>
  <script src="assets/js/main.js"></script>
  ${scriptBlock}
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, '..', 'product-detail.html'), detailHtml, 'utf8');
console.log('product-detail.html written successfully');