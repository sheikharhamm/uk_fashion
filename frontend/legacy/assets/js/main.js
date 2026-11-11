// Main UI Scripts for UK Fashion
document.addEventListener("DOMContentLoaded", () => {
  renderBrandElements();
  initMobileMenu();
  initInquiryModal();
});

function renderBrandElements() {
  // Update brand text dynamically
  document.querySelectorAll(".brand-name-text").forEach(el => el.textContent = UK_CONFIG.brandName);
  document.querySelectorAll(".brand-ig-handle").forEach(el => el.textContent = UK_CONFIG.instagramHandle);
  document.querySelectorAll(".brand-ig-link").forEach(el => el.href = UK_CONFIG.instagramUrl);
  document.querySelectorAll(".brand-tt-link").forEach(el => el.href = UK_CONFIG.tiktokUrl);
  document.querySelectorAll(".brand-wa-link").forEach(el => {
    el.href = `https://wa.me/${UK_CONFIG.whatsappNumber}?text=${encodeURIComponent("Salam UK Fashion! I would like to inquire about your Balochi Bridal & Cultural collection.")}`;
  });
}

function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const closeBtn = document.getElementById("mobile-menu-close");

  if (toggleBtn && menu) {
    toggleBtn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }
  if (closeBtn && menu) {
    closeBtn.addEventListener("click", () => {
      menu.classList.add("hidden");
    });
  }
}

// Global modal for quick WhatsApp inquiry
let activeProductForInquiry = null;

function openInquiryModal(productId) {
  const product = UK_PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  activeProductForInquiry = product;

  const modal = document.getElementById("inquiry-modal");
  if (!modal) return;

  const titleEl = document.getElementById("modal-product-title");
  const imgEl = document.getElementById("modal-product-img");
  const dochEl = document.getElementById("modal-product-doch");

  if (titleEl) titleEl.textContent = product.title;
  if (imgEl) imgEl.src = product.images[0];
  if (dochEl) dochEl.textContent = `${product.dochType} • ${product.fabric}`;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeInquiryModal() {
  const modal = document.getElementById("inquiry-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function initInquiryModal() {
  const form = document.getElementById("inquiry-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("inq-name").value;
      const city = document.getElementById("inq-city").value;
      const date = document.getElementById("inq-date").value;
      const notes = document.getElementById("inq-notes").value;

      const prodName = activeProductForInquiry ? activeProductForInquiry.title : "Custom Balochi Bridal Suit";
      const message = `*Bridal Inquiry - UK Fashion*\n` +
        `• *Dress:* ${prodName}\n` +
        `• *Client Name:* ${name}\n` +
        `• *City / Country:* ${city}\n` +
        `• *Event Date:* ${date || "Not specified"}\n` +
        `• *Special Requests:* ${notes || "None"}\n\n` +
        `Salam! Please share details regarding the timeline & tailoring consultation for this design.`;

      const waUrl = `https://wa.me/${UK_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank");
      closeInquiryModal();
    });
  }
}
