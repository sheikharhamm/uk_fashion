import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, RotateCcw, Info, Sparkles } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

export default function Collection() {
  const { products, loading, error, refetch, brand } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState('');
  const categoryFilter = searchParams.get('category') || 'all';
  const occasionFilter = searchParams.get('occasion') || 'all';

  const handleCategoryChange = (val) => {
    const params = new URLSearchParams(searchParams);
    if (val === 'all') params.delete('category');
    else params.set('category', val);
    setSearchParams(params);
  };

  const handleOccasionChange = (val) => {
    const params = new URLSearchParams(searchParams);
    if (val === 'all') params.delete('occasion');
    else params.set('occasion', val);
    setSearchParams(params);
  };

  const handleReset = () => {
    setSearch('');
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !search.trim() ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.shortDesc.toLowerCase().includes(search.toLowerCase()) ||
        p.dochType.toLowerCase().includes(search.toLowerCase()) ||
        p.fabric.toLowerCase().includes(search.toLowerCase());

      const matchesCat =
        categoryFilter === 'all' ||
        p.category.toLowerCase() === categoryFilter.toLowerCase();

      const matchesOcc =
        occasionFilter === 'all' ||
        p.occasion.toLowerCase().includes(occasionFilter.toLowerCase());

      return matchesSearch && matchesCat && matchesOcc;
    });
  }, [products, search, categoryFilter, occasionFilter]);

  return (
    <div>
      {/* BANNER */}
      <section className="bg-[#111111] text-white py-12 border-b border-[#c5a059]/30 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url('/media/kj-suit-07.jpg')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/30 text-[#e4ce9e] text-xs uppercase tracking-widest mb-3">
            <span>Handcrafted Balochi Artistry</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-white tracking-wider">
            Balochi Bridal & Cultural Couture
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto mt-2 leading-relaxed">
            Browse our exclusive archival designs curated from{' '}
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#c5a059] underline font-semibold"
            >
              {brand.instagramHandle}
            </a>
            . Custom-tailored to order.
          </p>
        </div>
      </section>

      {/* CATALOG WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* FILTER BAR */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200/80 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search Doch styles, fabrics, colors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-xs focus:border-[#c5a059] focus:outline-none"
              />
            </div>

            {/* Filter Selects */}
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <select
                  value={categoryFilter}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded text-xs focus:border-[#c5a059] focus:outline-none bg-white text-gray-700"
                >
                  <option value="all">All Categories</option>
                  <option value="Bridal">Barat Bridal Suits</option>
                  <option value="Walima">Walima & Reception</option>
                  <option value="Festive">Mehndi & Festive</option>
                  <option value="Couture">Exclusive Couture</option>
                </select>
              </div>

              <div>
                <select
                  value={occasionFilter}
                  onChange={(e) => handleOccasionChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded text-xs focus:border-[#c5a059] focus:outline-none bg-white text-gray-700"
                >
                  <option value="all">All Occasions</option>
                  <option value="Barat">Barat / Wedding</option>
                  <option value="Walima">Walima</option>
                  <option value="Mehndi">Mehndi / Mayun</option>
                  <option value="Reception">Reception / Night</option>
                </select>
              </div>

              <button
                onClick={handleReset}
                className="px-3 py-2 text-xs font-semibold text-gray-600 hover:text-[#c5a059] border border-gray-300 hover:border-[#c5a059] rounded transition flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

          </div>

          {/* Info bar */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <div>
              Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> handcrafted masterpiece designs
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>No public prices • Direct WhatsApp consultation for bespoke sizing</span>
            </div>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-gray-500 mt-3 uppercase tracking-wider">Loading designs...</p>
          </div>
        ) : error && products.length === 0 ? (
          <div className="py-20 text-center text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
            <Sparkles className="w-10 h-10 mx-auto text-[#c5a059] mb-3" />
            <p className="font-serif-luxury text-lg font-bold text-gray-700">Unable to load catalog</p>
            <p className="text-xs text-gray-500 mt-1">{error}</p>
            <button
              onClick={refetch}
              className="mt-4 px-5 py-2 bg-[#111111] text-[#e4ce9e] hover:bg-[#c5a059] hover:text-white rounded text-xs uppercase font-bold tracking-wider transition"
            >
              Retry
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
            <Sparkles className="w-10 h-10 mx-auto text-[#c5a059] mb-3" />
            <p className="font-serif-luxury text-lg font-bold text-gray-700">No matching bridal designs found</p>
            <p className="text-xs text-gray-500 mt-1">Try resetting filters or contact us on WhatsApp for bespoke custom orders.</p>
            <button
              onClick={handleReset}
              className="mt-4 px-4 py-2 bg-[#111111] text-[#e4ce9e] rounded text-xs uppercase font-bold tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}