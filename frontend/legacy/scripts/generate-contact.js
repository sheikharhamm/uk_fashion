const fs = require('fs');
const path = require('path');
const { getHeader, getFooter } = require('./layout.js');

const contactHtml = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact & Bridal Inquiries | UK Fashion Couture</title>
  <meta name="description" content="Inquire about bespoke Balochi bridal orders, customized Doch colors, worldwide delivery, and direct consultation with UK Fashion.">
  
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

  ${getHeader('contact')}

  <!-- BANNER -->
  <section class="bg-brandDark text-white py-16 border-b border-brandGold/30 text-center relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <span class="text-xs uppercase tracking-[0.3em] text-brandGold font-bold">Personalized Bridal Concierge</span>
      <h1 class="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-white mt-2">
        Custom Consultation & Inquiries
      </h1>
      <p class="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mt-3 leading-relaxed">
        Let us craft the Balochi bridal ensemble of your dreams. Reach out directly on WhatsApp or Instagram.
      </p>
    </div>
  </section>

  <!-- CONTACT CONTAINER -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
      
      <!-- DIRECT CHANNELS (5 cols) -->
      <div class="lg:col-span-5 space-y-6">
        <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-serif-luxury text-lg font-bold text-gray-900 mb-4">Direct Contact Channels</h3>
          
          <div class="space-y-4 text-xs">
            
            <a href="#" class="brand-wa-link p-4 rounded-lg bg-emerald-50 border border-emerald-200 hover:border-emerald-400 flex items-center gap-4 transition block">
              <div class="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                <i data-lucide="message-circle" class="w-5 h-5"></i>
              </div>
              <div>
                <span class="font-bold text-emerald-900 block text-sm">WhatsApp Consultation</span>
                <span class="text-emerald-700">Quickest response for fabric choices & custom quotes</span>
              </div>
            </a>

            <a href="https://www.instagram.com/kj_.collection/" target="_blank" class="p-4 rounded-lg bg-purple-50 border border-purple-200 hover:border-purple-400 flex items-center gap-4 transition block">
              <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white flex items-center justify-center flex-shrink-0">
                <i data-lucide="instagram" class="w-5 h-5"></i>
              </div>
              <div>
                <span class="font-bold text-purple-900 block text-sm">Instagram Direct Message</span>
                <span class="text-purple-700">Follow @kj_.collection & send reference posts</span>
              </div>
            </a>

            <a href="https://www.tiktok.com/@uk_fashion92?_r=1&_t=ZS-9BJd87YfHgP" target="_blank" class="p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-400 flex items-center gap-4 transition block">
              <div class="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                <i data-lucide="video" class="w-5 h-5"></i>
              </div>
              <div>
                <span class="font-bold text-gray-900 block text-sm">TikTok Video Showcase</span>
                <span class="text-gray-600">Watch Doch embroidery close-ups and bridal fitting reels</span>
              </div>
            </a>

          </div>
        </div>

        <div class="bg-brandDark text-white p-6 rounded-lg border border-brandGold/30">
          <h4 class="font-serif-luxury font-bold text-base text-brandGold mb-2">Bespoke Bridal Guarantee</h4>
          <p class="text-xs text-gray-300 leading-relaxed">
            Every stitch is 100% handcrafted by certified master artisans in Balochistan. We provide international tracked shipping directly to your doorstep.
          </p>
        </div>
      </div>

      <!-- INQUIRY FORM (7 cols) -->
      <div class="lg:col-span-7 bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <h3 class="font-serif-luxury text-xl font-bold text-gray-900 mb-2">Send Custom Bridal Inquiry</h3>
        <p class="text-xs text-gray-500 mb-6">Fill in your wedding details and this will pre-fill a personalized consultation on WhatsApp.</p>

        <form id="contact-form" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">Full Name *</label>
              <input type="text" id="c-name" required placeholder="e.g. Ayesha Baloch" class="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:border-brandGold focus:outline-none">
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">City & Country *</label>
              <input type="text" id="c-city" required placeholder="e.g. London, UK / Quetta" class="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:border-brandGold focus:outline-none">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">Wedding / Event Date</label>
              <input type="date" id="c-date" class="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:border-brandGold focus:outline-none">
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">Occasion Type</label>
              <select id="c-occasion" class="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:border-brandGold focus:outline-none bg-white">
                <option value="Barat Bridal">Barat Bridal (Heavy Red/Maroon)</option>
                <option value="Walima">Walima (Soft Ivory / Pastel)</option>
                <option value="Mehndi">Mehndi / Mayun (Haft-Rang / Mirrors)</option>
                <option value="Custom Bespoke">Other Custom Couture</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">Your Requirements & Preferred Doch Details</label>
            <textarea id="c-message" rows="4" placeholder="Mention fabric preferences, neck styles, pocket details, or references from @kj_.collection..." class="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:border-brandGold focus:outline-none"></textarea>
          </div>

          <button type="submit" class="w-full py-3.5 bg-brandDark text-brandGoldLight hover:bg-brandGold hover:text-white font-bold text-xs uppercase tracking-widest rounded-lg transition flex items-center justify-center gap-2 shadow-md">
            <i data-lucide="message-circle" class="w-4 h-4 text-emerald-400"></i>
            <span>Send Direct Consultation on WhatsApp</span>
          </button>
        </form>
      </div>

    </div>
  </div>

  ${getFooter()}

  <script src="assets/js/products.js"></script>
  <script src="assets/js/main.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      lucide.createIcons();

      const form = document.getElementById("contact-form");
      if (form) {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const name = document.getElementById("c-name").value;
          const city = document.getElementById("c-city").value;
          const date = document.getElementById("c-date").value;
          const occasion = document.getElementById("c-occasion").value;
          const message = document.getElementById("c-message").value;

          const waMsg = "*General Bridal Consultation - UK Fashion*\\n" +
            "• *Client Name:* " + name + "\\n" +
            "• *Location:* " + city + "\\n" +
            "• *Event Date:* " + (date || "To be decided") + "\\n" +
            "• *Occasion:* " + occasion + "\\n" +
            "• *Details:* " + (message || "Please discuss available designs and pricing.") + "\\n\\n" +
            "Salam! Looking forward to tailoring details.";

          const url = "https://wa.me/" + UK_CONFIG.whatsappNumber + "?text=" + encodeURIComponent(waMsg);
          window.open(url, "_blank");
        });
      }
    });
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, '..', 'contact.html'), contactHtml, 'utf8');
console.log('contact.html written successfully');