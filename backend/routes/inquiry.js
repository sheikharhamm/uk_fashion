const express = require('express');
const router = express.Router();
const fs = require('fs');
const os = require('os');
const path = require('path');

const isVercel = Boolean(process.env.VERCEL);
const leadsPath = isVercel
  ? path.join(os.tmpdir(), 'uk_fashion_inquiries.json')
  : path.join(__dirname, '..', 'data', 'inquiries.json');

router.post('/', (req, res) => {
  const { name, city, weddingDate, productId, productTitle, notes } = req.body || {};

  if (!name || !city) {
    return res.status(400).json({ success: false, message: 'Name and city are required' });
  }

  const newInquiry = {
    id: `inq-${Date.now()}`,
    name,
    city,
    weddingDate: weddingDate || 'Not specified',
    productId: productId || 'custom-order',
    productTitle: productTitle || 'Custom Balochi Bridal Jora',
    notes: notes || '',
    createdAt: new Date().toISOString()
  };

  try {
    let list = [];
    if (fs.existsSync(leadsPath)) {
      const parsed = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
      if (Array.isArray(parsed)) list = parsed;
    }
    list.unshift(newInquiry);
    fs.mkdirSync(path.dirname(leadsPath), { recursive: true });
    fs.writeFileSync(leadsPath, JSON.stringify(list, null, 2));
  } catch (err) {
    console.warn('Skipping disk inquiry persistence:', err.message);
  }

  // Generate formatted WhatsApp message
  const waPhone = '923226324881'; // From kj_.collection
  const waText = 
    `*Bridal Inquiry - UK Fashion (Balochi Couture)*\n` +
    `• *Client Name:* ${name}\n` +
    `• *Location:* ${city}\n` +
    `• *Event Date:* ${weddingDate || 'TBD'}\n` +
    `• *Selected Design:* ${productTitle || 'Custom Bridal'}\n` +
    `• *Customization Notes:* ${notes || 'None'}\n\n` +
    `Salam! Please share details regarding tailoring timelines and fabric consultation.`;

  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;

  res.json({
    success: true,
    message: 'Inquiry registered successfully',
    data: newInquiry,
    whatsappUrl: waUrl
  });
});

module.exports = router;