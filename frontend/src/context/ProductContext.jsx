import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ProductContext = createContext();

export const BRAND_CONFIG = {
  name: "UK FASHION",
  tagline: "Balochi Haute Couture",
  designer: "Khan Jee Collection (@kj_.collection)",
  instagramHandle: "@kj_.collection",
  instagramUrl: "https://www.instagram.com/kj_.collection/",
  tiktokUrl: "https://www.tiktok.com/@kj_.collection",
  whatsappNumber: "923226324881",
  whatsappDisplay: "+92 322 6324881",
  address: "Jama Cloth, M.A. Jinnah Road, Karachi, Pakistan",
  shipping: "Worldwide Delivery • C.O.D Across Pakistan"
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inquiryProduct, setInquiryProduct] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error(`Failed to fetch catalog (HTTP ${res.status})`);
      const json = await res.json();
      if (!json.success || !Array.isArray(json.data)) {
        throw new Error(json.message || 'Invalid catalog response from server');
      }
      setProducts(json.data);
    } catch (err) {
      setError(err.message || 'Unable to connect to catalog service');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const openInquiry = (product) => setInquiryProduct(product);
  const closeInquiry = () => setInquiryProduct(null);

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      error,
      refetch: fetchProducts,
      inquiryProduct,
      openInquiry,
      closeInquiry,
      brand: BRAND_CONFIG
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
