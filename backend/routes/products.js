const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'products.json');
const bundledProducts = require('../data/products.json');

function getProducts() {
  if (fs.existsSync(dataPath)) {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  }
  return Array.isArray(bundledProducts) ? bundledProducts : [];
}

// GET all products with optional filtering
router.get('/', (req, res) => {
  const { category, occasion, search } = req.query;
  let products = getProducts();

  if (category && category !== 'all') {
    products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (occasion && occasion !== 'all') {
    products = products.filter(p => p.occasion.toLowerCase().includes(occasion.toLowerCase()));
  }

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.dochType.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    count: products.length,
    data: products
  });
});

// GET single product by id or slug
router.get('/:id', (req, res) => {
  const products = getProducts();
  const product = products.find(p => p.id === req.params.id || p.slug === req.params.id);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Design not found' });
  }

  // Find related products
  const related = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.occasion === product.occasion))
    .slice(0, 4);

  res.json({
    success: true,
    data: product,
    related: related.length > 0 ? related : products.filter(p => p.id !== product.id).slice(0, 4)
  });
});

module.exports = router;