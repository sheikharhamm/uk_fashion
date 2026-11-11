const fs = require('fs');
const path = require('path');
const { getHeader, getFooter } = require('./layout.js');

const scriptBlock = '<script>\n' +
'  document.addEventListener("DOMContentLoaded", () => {\n' +
'    lucide.createIcons();\n' +
'    const grid = document.getElementById("catalog-grid");\n' +
'    const totalCountEl = document.getElementById("catalog-count");\n' +
'    const searchInput = document.getElementById("filter-search");\n' +
'    const categoryFilter = document.getElementById("filter-category");\n' +
'    const occasionFilter = document.getElementById("filter-occasion");\n' +
'    const resetBtn = document.getElementById("filter-reset");\n' +
'    \n' +
'    // Check URL parameters\n' +
'    const urlParams = new URLSearchParams(window.location.search);\n' +
'    const initialCat = urlParams.get("category");\n' +
'    if (initialCat && categoryFilter) {\n' +
'      categoryFilter.value = initialCat;\n' +
'    }\n' +
'    \n' +
'    function renderProducts() {\n' +
'      let filtered = [...UK_PRODUCTS];\n' +
'      const q = (searchInput ? searchInput.value : "").trim().toLowerCase();\n' +
'      const cat = categoryFilter ? categoryFilter.value : "all";\n' +
'      const occ = occasionFilter ? occasionFilter.value : "all";\n' +
'      \n' +
'      if (q) {\n' +
'        filtered = filtered.filter(p => \n' +
'          p.title.toLowerCase().includes(q) || \n' +
'          p.shortDesc.toLowerCase().includes(q) ||\n' +
'          p.dochType.toLowerCase().includes(q) ||\n' +
'          p.fabric.toLowerCase().includes(q)\n' +
'        );\n' +
'      }\n' +
'      \n' +
'      if (cat !== "all") {\n' +
'        filtered = filtered.filter(p => p.category.toLowerCase() === cat.toLowerCase());\n' +
'      }\n' +
'      \n' +
'      if (occ !== "all") {\n' +
'        filtered = filtered.filter(p => p.occasion.toLowerCase().includes(occ.toLowerCase()));\n' +
'      }\n' +
'      \n' +
'      if (totalCountEl) totalCountEl.textContent = filtered.length;\n' +
'      \n' +
'      if (filtered.length === 0) {\n' +
'        grid.innerHTML = \'<div class="col-span-full py-16 text-center text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">\' +\n' +
'          \'<i data-lucide="sparkles" class="w-10 h-10 mx-auto text-brandGold mb-3"></i>\' +\n' +
'          \'<p class="font-serif-luxury text-lg font-bold text-gray-700">No matching bridal designs found</p>\' +\n' +
'          \'<p class="text-xs text-gray-500 mt-1">Try resetting filters or contact us on WhatsApp for bespoke custom orders.</p>\' +\n' +
'        \'</div>\';\n' +
'        lucide.createIcons();\n' +
'        return;\n' +
'      }\n' +
'      \n' +
'      grid.innerHTML = filtered.map(p => (\n' +
'        \'<div class="product-card bg-white rounded-lg overflow-hidden border border-gray-200/80 shadow-sm flex flex-col justify-between group">\' +\n' +
'          \'<div>\' +\n' +
'            \'<div class="image-zoom-container aspect-[3/4] bg-gray-100 relative">\' +\n' +
'              \'<img src="\' + p.images[0] + \'" alt="\' + p.title + \'" class="w-full h-full object-cover">\' +\n' +
'              \'<span class="absolute top-3 left-3 bg-brandDark/90 text-brandGoldLight text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">\' +\n' +
'                (p.badge || p.category) +\n' +
'              \'</span>\' +\n' +
'              \'<span class="absolute top-3 right-3 bg-white/90 backdrop-blur text-brandDark text-[10px] font-semibold px-2 py-0.5 rounded shadow">\' +\n' +
'                p.occasion.split("/")[0] +\n' +
'              \'</span>\' +\n' +
'              \'<a href="product-detail.html?id=\' + p.id + \'" class="absolute inset-0 z-10" aria-label="\' + p.title + \'"></a>\' +\n' +
'            \'</div>\' +\n' +
'            \'<div class="p-5">\' +\n' +
'              \'<span class="text-[11px] text-brandGold font-bold uppercase tracking-wider block">\' + p.dochType + \'</span>\' +\n' +
'              \'<h3 class="font-serif-luxury font-bold text-base text-gray-900 mt-1 group-hover:text-brandGold transition-colors">\' +\n' +
'                \'<a href="product-detail.html?id=\' + p.id + \'">\' + p.title + \'</a>\' +\n' +
'              \'</h3>\' +\n' +
'              \'<p class="text-xs text-gray-500 mt-1.5 line-clamp-2">\' + p.shortDesc + \'</p>\' +\n' +
'              \'<div class="mt-3 flex items-center gap-2 text-[11px] text-gray-600">\' +\n' +
'                \'<span class="inline-block w-2 h-2 rounded-full bg-brandGold"></span>\' +\n' +
'                \'<span>Fabric: \' + p.fabric + \'</span>\' +\n' +
'              \'</div>\' +\n' +
'            \'</div>\' +\n' +
'          \'</div>\' +\n' +
'          \'<div class="p-5 pt-0 border-t border-gray-100 flex items-center justify-between gap-2 mt-2">\' +\n' +
'            \'<a href="product-detail.html?id=\' + p.id + \'" class="flex-1 py-2 text-center text-xs font-bold uppercase tracking-wider text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition">\' +\n' +
'              \'View Details\' +\n' +
'            \'</a>\' +\n' +
'            \'<button onclick="openInquiryModal(\\\\\'\' + p.id + \'\\\\\')" class="py-2 px-3 bg-brandDark text-brandGoldLight hover:bg-brandGold hover:text-white rounded transition flex items-center justify-center gap-1 text-xs font-bold tracking-wider" title="Inquire on WhatsApp">\' +\n' +
'              \'<i data-lucide="message-circle" class="w-3.5 h-3.5 text-emerald-400"></i> Inquire\' +\n' +
'            \'</button>\' +\n' +
'          \'</div>\' +\n' +
'        \'</div>\'\n' +
'      )).join("");\n' +
'      lucide.createIcons();\n' +
'    }\n' +
'    \n' +
'    if (searchInput) searchInput.addEventListener("input", renderProducts);\n' +
'    if (categoryFilter) categoryFilter.addEventListener("change", renderProducts);\n' +
'    if (occasionFilter) occasionFilter.addEventListener("change", renderProducts);\n' +
'    if (resetBtn) resetBtn.addEventListener("click", () => {\n' +
'      if (searchInput) searchInput.value = "";\n' +
'      if (categoryFilter) categoryFilter.value = "all";\n' +
'      if (occasionFilter) occasionFilter.value = "all";\n' +
'      renderProducts();\n' +
'    });\n' +
'    \n' +
'    renderProducts();\n' +
'  });\n' +
'</script>';

const collectionHtml = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bridal & Festive Catalog | UK Fashion Couture</title>
  <meta name="description" content="Explore our authentic hand-embroidered Balochi bridal suits, Doch wear, velvet luxury, and traditional heirloom couture.">
  
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

  ${getHeader('collection')}

  <!-- HEADER BANNER (Andaaz Fashion inspired catalog header) -->
  <section class="bg-brandDark text-white py-12 border-b border-brandGold/30 relative overflow-hidden">
    <div class="absolute inset-0 opacity-20 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=1600&auto=format&fit=crop');"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandGold/20 border border-brandGold/30 text-brandGoldLight text-xs uppercase tracking-widest mb-3">
        <span>Handcrafted Balochi Artistry</span>
      </div>
      <h1 class="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-white tracking-wider">
        Balochi Bridal & Cultural Couture
      </h1>
      <p class="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto mt-2 leading-relaxed">
        Browse our exclusive archival designs inspired by <a href="https://www.instagram.com/kj_.collection/" target="_blank" class="text-brandGold underline font-semibold">@kj_.collection</a>. Custom-tailored to order.
      </p>
    </div>
  </section>

  <!-- CATALOG WRAPPER -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    
    <!-- FILTER BAR -->
    <div class="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200/80 mb-8">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        <!-- Search -->
        <div class="relative flex-1">
          <i data-lucide="search" class="w-4 h-4 absolute left-3 top-3 text-gray-400"></i>
          <input type="text" id="filter-search" placeholder="Search Doch styles, fabrics, colors..." class="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-xs focus:border-brandGold focus:outline-none">
        </div>

        <!-- Filter Selects -->
        <div class="flex flex-wrap items-center gap-3">
          <div>
            <select id="filter-category" class="px-3 py-2 border border-gray-300 rounded text-xs focus:border-brandGold focus:outline-none bg-white text-gray-700">
              <option value="all">All Categories</option>
              <option value="Bridal">Barat Bridal Suits</option>
              <option value="Walima">Walima & Reception</option>
              <option value="Festive">Mehndi & Festive</option>
              <option value="Couture">Exclusive Couture</option>
            </select>
          </div>

          <div>
            <select id="filter-occasion" class="px-3 py-2 border border-gray-300 rounded text-xs focus:border-brandGold focus:outline-none bg-white text-gray-700">
              <option value="all">All Occasions</option>
              <option value="Barat">Barat / Wedding</option>
              <option value="Walima">Walima</option>
              <option value="Mehndi">Mehndi / Mayun</option>
              <option value="Reception">Reception / Night</option>
            </select>
          </div>

          <button id="filter-reset" class="px-3 py-2 text-xs font-semibold text-gray-600 hover:text-brandGold border border-gray-300 hover:border-brandGold rounded transition flex items-center gap-1">
            <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i> Reset
          </button>
        </div>

      </div>

      <!-- Result Count Info -->
      <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <div>
          Showing <span id="catalog-count" class="font-bold text-gray-900">0</span> handcrafted masterpiece designs
        </div>
        <div class="hidden sm:flex items-center gap-2">
          <i data-lucide="info" class="w-3.5 h-3.5 text-brandGold"></i>
          <span>No public prices • Direct WhatsApp consultation for bespoke sizing</span>
        </div>
      </div>
    </div>

    <!-- CATALOG GRID -->
    <div id="catalog-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Injected via JavaScript -->
    </div>

  </div>

  ${getFooter()}

  <script src="assets/js/products.js"></script>
  <script src="assets/js/main.js"></script>
  ${scriptBlock}
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, '..', 'collection.html'), collectionHtml, 'utf8');
console.log('collection.html written successfully');